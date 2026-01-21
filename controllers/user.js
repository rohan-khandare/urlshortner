const User = require('../models/user')

async function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    //validation --remaining 
    await User.create({
        name,
        email,
        password,
    })

    return res.render("home")
}

async function handleLoginUser(req,res){
   const {email,password} = req.body;
   const user =  await User.findOne({email,password});

    if(!user){
        return res.render("login",{error : "Invalid Username or Password"})
    }
    return res.render("home");
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