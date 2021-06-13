// myList CRUD routing
const { user, mylist, play, playlist } = require("../models")

// module.exports = {

//   getMyList: async (req, res) => {
//     const find = await mylist.findAll({
//       where: { userId: req.body.userId },
//       attributes: ['id', 'listTitle', 'createdAt']
//     })
    
//     if(find.length === 0) {
//       res.status(404).send({ success: false })
//     } else {
//       let data = find.map(el => el.dataValues)
//       res.status(200).send({ success: true, data: data })
//     }
//   },

//   /*  Client에 userId 추가 요청  */
//   addMyList: async(req, res) => {
//     const { userId, title } = req.body
//     const find = await mylist.findOne({
//       where: { userId: userId },
//       attributes: ['id']
//     })
      
//     if(find === null) {
//       res.status(404).send({ success: false })
//     } else {
//       mylist.create({
//         listTitle: title, userId: userId
//       }).then(make => {
//         res.status(200).send({ success: true }) 
//       }).catch(err => res.send(err))
//     }
//   },

//   getMusicList: async(req, res) => {    
//     const find = await play.findAll({
//       attributes: ['musicid', 'title', 'thumbnail'],
//       include: [{ model: mylist, where: { id: req.body.myListId },
//         through: { where: { mylistId: req.body.myListId } }
//       }]
//     })

//     let data = find.map(el => {
//       delete el.dataValues.mylists
//       return el.dataValues;
//     })
//     res.status(200).send({ success: true, data: data })
//   },



// }
////////////////////////////////////// 테스트 완료 /////////////////////////////////////////////

    
//     
//   /*  Client에  mylistId 추가 요청  */
//   addMusic: async(req, res) => {
    let func = async() => {
      
    }
    func()
//     const { videoId, title, thumbnail, mylistId } = req.body;
//     let find = await play.findOne({
//       where: { musicid: videoId },
//       attributes: ['id']
//     })

//     if(find.length === 0) {
//       await play.create({
//         musicid: videoId,
//         title: title,
//         thumbnail: thumbnail
//       })
//     }
    
//     await playlist.findOne({
//       where: { playId: find.dataValues.id }
//     }).then(res => {
//       if(res.length === 0) {
//         playlist.create({
//           mylistId: mylistId,
//           playId: find.dataValues.id
//         })
//       }
//     })
    
//     .then(find => {
//       // 조건: play에 없는경우 => play와 playlist에 추가, play에는 있지만, playlist에는 없는 경우 => playlist에 추가/ 둘다 있는 경우 conflict
//       if(find.length === 0) {
//         play.create({
//           musicid: videoId,
//           title: title,
//           thumbnail: thumbnail
//         }).then(make => {
//           return playlist.create({
//             mylistId: mylistId,
//             playId: find.dataValues.id
//           })
//         }).then(make => res.status(200).send({ success: true }))  
//       } else {

//       }
//       playlist.findOne({
//         where: { playId: find.dataValues.id }
//       }).then(find => {
//         if(find.length === 0) {
//           playlist.create({

//           })
//         }
//       })
      
