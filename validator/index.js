exports.createPostValidator = (req, res, next) => {
    // title validations
    req.check('title',"Write a Title").notEmpty()
    req.check('title','Title must be between 4 to 150 characters').isLength({
        min: 4,
        max: 150
    });

    req.check('body',"Please Write a body").notEmpty()
    req.check('body','body must be between 4 to 2000 characters').isLength({
        min: 4,
        max: 2000
    });

    const errors = req.validationErrors();

    // if error show the first one as they happen

    if(errors) {
        const firstError = errors.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError})
    }

    // using next middleware
    
    next();

};

exports.userSignupValidator = (req, res, next) => {

    // name is not null and between 4-10 characters
    req.check("name","Name is Required").notEmpty();
    req.check("name","Name must be bettwen 4 and 10 characters").isLength({
        min:4,
        max: 10
    })

    // email is not null, valid and normalized
    req.check("email","Email must be between 3 to 32 characters").matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min:4,
        max: 2000
    });

    // Check for password
    req.check("password", "Password is required").notEmpty();
    req.check("password")
    .isLength({
        min:6
    }).withMessage("Password must contain at lest 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");


    // check for errors

    const errors = req.validationErrors();

    // if error show the first one as they happen

    if(errors) {
        const firstError = errors.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError})
    }

    // using next middleware
    
    next();

}