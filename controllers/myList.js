const { user, mylist, play, playlist } = require("../models")

module.exports = {
  /*  Client에 userId 추가 요청  */
  addMyList: async(req, res) => {
    const { userId, title } = req.body
    const find = await mylist.findOne({
      where: { userId: userId },
      attributes: ['id']
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
      attributes: ['id', 'listTitle', 'createdAt']
    });
      
    if(find.length === 0) {
      res.status(404).send({ success: false })
    } else {
      let data = find.map(el => el.dataValues)
      res.status(200).send({ success: true, data: data })
    }
  }


  

}
