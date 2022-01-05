const userModel = require("../database/userModel")

const data = require("../data")
function searchItem(req, res, next) {
    try {
        let { search } = req.body
        let items = data.filter(obj => {
            return obj["title"].toLowerCase().includes(search.toLowerCase())
        })
        console.log(items);
        res.status(200).json({ data: items })
    } catch (err) {
        res.status(500).json({ data: null, message: err.message })
    }

}

function catagoryItems(req, res) {
    try {
        let { id } = req.params

        let item = data.filter(obj => {
            return obj.type == id
        })
        // console.log("catagory", item);
        res.status(200).json({ data: item, message: "item is found" })
    } catch (err) {
        res.status(500).json({ data: null, message: err.message })
    }
}

function getItem(req, res, next) {
    try {
        let { id } = req.params
        console.log(id);
        let item = data.find(obj => {
            return id == obj.id
        })
        console.log(item);
        if (item) {
            res.status(200).json({ item, message: "item is found" })
        } else {
            res.status(404).json({ item: null, message: "item not found" })
        }
    } catch (err) {
        res.status(500).json({ item: null, message: err.message })
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
function homeItems(req, res) {
    let newData = data.filter(obj => {
        return obj.rating > 4 || obj.price < 14
    })
    res.json({ data: newData })
}
async function cartItem(req, res) {
    const { id, items } = req.body
    try {
        await userModel.findByIdAndUpdate(id, { cart: items })
        let cartItems = await userModel.findById(id)
        console.log("cart items after updater ", cartItems.cart);
        res.status(200).json({ cart: cartItems.cart })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message })

    }

}
module.exports = { searchItem, getItem, checkout, catagoryItems, homeItems, cartItem }