// myList CRUD routing
const { user, mylist, play, playlist } = require("../models")

const getUser = async () => {
  return await user.findAll();
}
let find = getUser()
find.then(res => console.log(res))
