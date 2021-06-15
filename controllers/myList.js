const { user, mylist, play, playlist } = require("../models")

module.exports = {
  
    addMyList: async(req, res) => {
        console.log(req.body)
        const { userId, title } = req.body     
        const find = await mylist.findOne({
            where: { userId: userId },
            attributes: ['id', 'listTitle']
        });      

        if(find === null) {
            res.status(404).send({ success: false })
        
        } else {
            mylist.create({
                listTitle: title, userId: userId
            }).then(make => {
                res.status(200).send({ success: true }) 
            }).catch(err => res.send(err))
        }
    },
  
  
    getMyList: async (req, res) => {

        const find = await mylist.findAll({
            where: { userId: req.body.userId },
            attributes: ['id', 'listTitle', 'createdAt'],
            include: [{
                model: play,
                attributes: ['thumbnail'],
                through: { attributes: ['mylistId'] }
            }]
        });

        if(find.length === 0) {
            res.status(404).send({ success: false })

        } else {
            let data = [];
            find.forEach(el => {
                let obj = el.dataValues;
                obj.thumbnails = el.dataValues.plays.slice(0, 4).map(el => el.thumbnail)
                delete obj.plays;
                data.push(obj);
            });
            res.status(200).send({ success: true, data: data })
        }
    }
}