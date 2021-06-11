// myList CRUD routing
const { user, mylist, index } = require("../models")

let find = user.findOne({ where: { id: 1 } });
console.log(find);