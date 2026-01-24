// const sessionIdToUserMap = new Map()

// function setUser(id, user){
//     sessionIdToUserMap.set(id,user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

//Stateless Authentication 
const jwt = require("jsonwebtoken")
const secret = "rohan@8484jf"

function setUser(user){
  return jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role
  },
  secret)
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secret)
}

module.exports = {
    setUser,
    getUser
}