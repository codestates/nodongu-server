const { user, mylist, play, playlist } = require("../models")

module.exports = {
  
    addMyList: async(req, res) => {

        const { userId, title } = req.body     
        const find = await mylist.findAll({
            where: { userId: userId, listTitle: title },
            attributes: ['id', 'listTitle']
        });      

        if(find.length !== 0) {
            res.status(409).send({ success: false })
        
        } else {
            mylist.create({
                userId: userId, listTitle: title
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
