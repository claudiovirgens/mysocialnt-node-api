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