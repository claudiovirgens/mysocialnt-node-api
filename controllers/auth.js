const User = require('../models/user');

exports.signup = async (req, res) => {
    const userExists = await User.findOne({email: req.body.email})

    if(userExists) 
    return res.status(403).json({
        error: "Email is taken !"
    });

    const user  = await new User(req.body);
    await user.save();
    res.status(200).json({message: "signup sucess ! "});
}; 


/* exports.signup = (req, res) => {
    const userExists = await User.findOne({email: req.body.email})

     if(userExists) 
    return res.status(403).json({
        error: "Email is taken !"
    }); 

    const user  =  new User(req.body);
    user.save((err,user)=> {
        if(err){
            console.log('SIGNUP ERROR',err)
            return res.status(400).json({
                err: 'User Already exist'
            });
        }

        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });

    });
    res.status(200).json({message: "signup sucess ! "});
}; */