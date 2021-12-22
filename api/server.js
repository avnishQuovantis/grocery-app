const express = require("express")
const app = express()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const { JWT_KEY } = require("./secrets")
const data = require("./data")
console.log(__dirname);
const userModel = require("./database/userModel")
app.use(express.static("/image"))
//
app.use(cors())
app.use(express.json())

// app.use(express.static("public"))

app.get("/", (req, res) => {
    res.json({ data })
})

app.post("/login", login)
app.post("/signup", signUp)
app.patch("/updateUser", updateUser)

app.get("/checkout", checkout)
app.get("/item/:id")
app.listen("9000", () => {
    console.log("9000 server is runnign");
})
async function updateUser(req, res, next) {
    try {
        console.log(req.body);
        await userModel.findOneAndUpdate({ email: req.body.email },
            { firstName: req.body.firstName, lastName: req.body.lastName, address: req.body.address }, { new: true })
        let user = await userModel.findOne({ email: req.body.email })
        console.log("user details", user);
        return res.status(200).json({ user, message: "updated successfully" })

    } catch (err) {
        return res.status(500).json({ user: null, message: err.message })
    }
}
function protectedRoute(req, res, next) {
    try {
        console.log("protectedfunction running");
        if (req.cookies.login) {
            let decryptedToken = jwt.verify(req.cookies.login, JWT_KEY)
            if (decryptedToken) {
                let usedId = decryptedToken.id
                req.userId = userId
                console.log("userid in req", req.userId);
                next()
            } else {
                res.json({ message: "operation not found again" })
            }
        } else {
            res.json({ message: "operation is not allowed" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
async function signUp(req, res) {
    try {

        let { email } = req.body
        let checkEmail = await userModel.findOne({ email: email })
        let user = null
        if (checkEmail == null) {
            user = await userModel.create(req.body)
            res.status(200).json({ user })
        } else {
            user = null
            res.json({ user })
        }
    } catch (err) {
        res.status(500).json({ user: null, message: err.message })
    }
}
async function login(req, res) {
    try {
        console.log("request body", req.body);

        let user = await userModel.findOne({ email: req.body.email })
        // console.log(user);
        if (user) {
            if (user.password == req.body.password) {
                console.log(user);
                let payload = user["_id"]
                let token = jwt.sign({ id: payload }, JWT_KEY)
                res.cookie("login", token, { httponly: true })
                return res.json({ user, message: "login successfull", request: req.user })
            }
            else {
                return res.json({ user: null, message: "login failed password is wrong" })
            }
        } else {
            return res.json({ user: null, message: "invalid email or password is wrong" })
        }
    } catch (err) {
        res.json({ message: "error while login" })
    }
}
function checkout(req, res, next) {
    try {
        if (req.user) {
            res.json({ message: "welcome to checkout" })
        } else {
            res.status(404).json({ userData: req.user, message: "please login first" })
        }

    } catch (err) {
        res.status(500).json({ message: "go to " })
    }
}
function protectedRoute(req, res, next) {
    try {
        let user = req.user
        console.log();
        if (user) {
            res.status(200).json({ user })
            next()
        } else {
            res.status(404).json({ userData: req.user, message: "please login first" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
// module.exports = mainRouter