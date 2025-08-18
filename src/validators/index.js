import {body} from "express-validator"

const userRegistrationValidator = () => {
    return [
        body('email')
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is invalid"),

        body('username')
        .trim()
        .notEmpty().withMessage("Username is required")
        .isEmail().withMessage("Username is invalid")
        .isLength({min :3}).withMessage("username should be at least 3 char")
        .isLength({max: 15}).withMessage("username cannot exceed 13 char"),


    ]
}

const userLoginValidator = () => {
    return [
        body('email')
        .isEmail().withMessage("Email is not valid"),
        body('password')
        .notEmpty().withMessage('Password cannot be empty')
    ]
}

export { userLoginValidator, userRegistrationValidator}