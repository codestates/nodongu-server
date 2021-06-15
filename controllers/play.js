const { user, mylist, play, playlist } = require("../models")

module.exports = {

    getMusicList: async(req, res) => {    
    
        const find = await play.findAll({
            attributes: ['musicid', 'title', 'thumbnail'],
            include: [{
                model: mylist, 
                where: { id: req.body.myListId },
                through: { where: { mylistId: req.body.myListId } }
            }]
        })

        let data = find.map(el => {
            delete el.dataValues.mylists
            return el.dataValues;
        });

        res.status(200).send({ success: true, data: data })
    },

  
    addMusic: async(req, res) => {

        const { videoId, title, thumbnail, myListId } = req.body
        const find = await play.findOne({
            where: { musicid: videoId },
            attributes: ['id'],
            include: [{
                model: mylist,
                attributes: ['id'],
                through: { where: { mylistId: myListId } }
            }]
        });
      
        if(find === null) {
            play.create({
                musicid: videoId,
                title: title,
                thumbnail: thumbnail
            }).then(make => {
                playlist.create({
                    mylistId: myListId,
                    playId: make.dataValues.id
                }).then(make => res.status(200).send({ success: true }))
            })

        } else {
            const playId = find.dataValues.id;
            const checkMyList = find.mylists[0];

            if(checkMyList === undefined) {
                playlist.create({
                    mylistId: myListId,
                    playId: playId
                }).then(make => res.status(200).send({ success: true }))

            } else {
                res.status(409).send({ success: false })
            } 
        }  
    }
}