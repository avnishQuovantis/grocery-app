const mongoose = require("mongoose")
const { db_link } = require("../secrets")
mongoose.connect(db_link).then(db => {
    console.log("connected");
}).catch(err => {
    console.log(err);
})

//schem
let userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
    }
})


let userModel = mongoose.model("usermodel", userSchema)
module.exports = userModel
// async function createData() {
//     let user = { name: "avnish", email: "avnish@gmail.com", password: "1234", confirmPassword: "1234" }
//     let result = await userModel.create(user)
//     console.log(result)
// }
// createData()