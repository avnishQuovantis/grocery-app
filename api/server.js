const express = require("express")
const app = express()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const { JWT_KEY } = require("./secrets")
const cookieParser = require("cookie-parser")
const { login, signUp, getUser, updateUser } = require("./functions/userFunctions")
const { getItem, searchItem, checkout, catagoryItems, homeItems, cartItem } = require("./functions/itemFunctions")
const data =
    app.use(express.static("/image"))
//
app.use(cors())
app.use(express.json())
app.use(cookieParser())
// app.use(express.static("public"))

app.get("/", homeItems)

app.post("/login", login)
app.post("/signup", signUp)
app.get("/item/:id", getItem)
app.patch("/updateUser", updateUser)
app.get("/checkout", checkout)
app.get("/catagory/:id", catagoryItems)
app.post("/search/:id", searchItem)
app.post("/user", getUser)
app.post("/editCart", cartItem)
// app.post("/addCart", editCart)
app.listen("9000", () => {
    console.log("9000 server is runnign");
})



// module.exports = mainRouter




