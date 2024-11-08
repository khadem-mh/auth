const { default: mongoose } = require("mongoose")

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        minLength: 3,
        maxLength: 40,
        required: true
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 40,
        required: true
    },
    userName: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: true
    },
    email: {
        type: String,
        match: /^[A-Za-z0-9+*_-]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}$/gm,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    role: {
        type: String,
        default: "USER"
    }

})

const model = mongoose.models.User || mongoose.model("User", userSchema)

export default model