// myList CRUD routing
const { user, mylist } = require("../models")

// module.exports = {
  // getMyList: async (req, res) => {
    const func = async() => {
      let find =  await mylist.findAll({
        where: {userId: 1},// req.body.userId
        // attributes: ['id', 'name', 'createdAt']
      })
      // let join = await play.findAll({
      //   include: 'link_mylist'
      // });
      return find;
    }
    let find = func()
    find.then(res => console.log(res))
    
//     if(!myList) {
//       res.status(404).send({ success: false });
//     } else {

//     }

//     module.exports = {
//       get: async (req, res) => {
//         let allFindurl = await url.findAll();
//         console.log(allFindurl.every(el => el instanceof url));
//         console.log("All url:", allFindurl);
//         res.status(200).send(allFindurl)
//       },
//       post: async (req, res) => {
//         utils.getUrlTitle(req.body.url, async (err, title) => {
//           console.log(req.body);
//           let result = await url.create({
//             url: req.body.url,
//             title: title
//           })
//           res.status(201).send(result)
//         })
//       },
//       redirect: async (req, res) => {
//         let oneFindurl = await url.findOne({ where: { id: req.params.id } });
//         url.increment('visits',{where: {id: req.params.id}})
//         res.status(302).redirect(oneFindurl.url)
//       }
//     };

//     if(req.body.email && req.body.password) {
//           res.status(200).send("Login successfully")
//       } else {
//           res.status(404).send("Step aside!")
//       } // routing 시험용 코드
     
//      // 이메일이 존재하지 않을 때, 비밀번호가 틀렸을 때 각각 다른 404 res 보내줄 것. 
//      await user.findOne({
//          where: {
//              email: req.body.email // e-mail 여부 확인
//          }
//      }).then(data => {
//           if(!data) {
//               res.status(404).send({loginSuccess: false, message: "존재하지 않는 이메일입니다"}) 
//           } else {
//               user.findOne({
//                   where: {
//                       password: req.body.password // password 일치여부 확인 
//                   }
//               }).then(data => {
//                   if(!data) {
//                       res.status(404).send({loginSuccess: false, message: "비밀번호가 일치하지 않습니다"}) 
//                   } else { // 이메일이 존재하고, password가 일치하는 경우 
                      
//                       const accessToken = makeAccessToken(data.dataValues); // 토큰은 다른 모듈에서 생성되서 전달될 예정. 
//                       const refreshToken = makeRefreshToken(data.dataValues);
                      
//                       resRefreshToken(res, refreshToken)  // refreshToken 쿠키에 넣어서 발송 
//                       res.send({loginSuccess: true, userId: data.dataValues.id, data: {accessToken}}); // accessToken res.body에 넣어서 발송.
//                   }
//               })    
//           }
//       }).catch(err => {
//           console.log(err);
//       }) 
      
//   },

//   signOut: async (req, res) => {
      
//       const accessTokenData = isAuthorized(req); // 토큰 유효성 검증

//       if (accessTokenData) {
//           res.status(200).send("Logged out successfully")
      
//       } else {    
//           res.status(400).send("you're currently not logined") 
//       }  
          
//           res.status(500).send("error"); // 서버에러 
//   },

// const getUser = async () => {
//   return await user.findAll();
// }
// let find = getUser()
// find.then(res => console.log(res))


// app.get("/getMyList", myListControllers.getMyList)
// app.post("/addMyList", myListControllers.addMyList)