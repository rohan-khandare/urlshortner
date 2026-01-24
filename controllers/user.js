const User = require('../models/user')
const {setUser} = require('../service/auth')


async function handleUserSignup(req,res){
    const {name,email,role,password} = req.body;
    //validation --remaining 
    await User.create({
        name,
        email,
        role,
        password,
    })

    return res.redirect("/")
}

async function handleLoginUser(req,res){
   const {email,password} = req.body;
   const user =  await User.findOne({email,password});

    if(!user){
        return res.render("login",{error : "Invalid Username or Password"})
    }

    //stateful
    //create sesssionid and send cookie
    // dynamic import for uuid
    // const { v4: uuidv4 } = await import("uuid");

    // const sessionId = uuidv4();
    // console.log(sessionId)
    // setUser(sessionId,user)

    // stateless we dont keep track of user and sesion id using map, here we directly send user a token encoded with paylod(user details)
    const token = setUser(user)
    res.cookie("token",token)

    return res.redirect("/");

}

async function handleGetUsers(req,res){
    const allusers = await User.find({});
    return res.send(allusers);
}

module.exports = {
    handleUserSignup,
    handleGetUsers,
    handleLoginUser,
}