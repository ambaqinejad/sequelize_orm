const express = require("express");
const path = require("path");

const { User: UserModel } = require(path.join(__dirname, "..", "models"));

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to the User router.",
        creation: {
            method: "Post",
            path: "/user/create",
            body: ["firstName", "lastName", "email", "role"]
        },
        getUser: {
            method: "Get",
            path: "/user/getOne/:id",
        },
        getAllUser: {
            method: "Get",
            path: "/user/getAll",
        },
        update: {
            method: "Put",
            path: "/user/update/:id",
            body: ["new firstName", "new lastName", "new email", "new role"]
        },
        delete: {
            method: "Delete",
            path: "/user/delete/:id"
        }
    })
})

router.post("/create", async (req, res) => {
    try {
        const { firstName, lastName, email, role } = req.body;
        const user = await UserModel.create({ firstName, lastName, email, role})
        res.status(201).json({
            message: "User created successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.get("/getAll", async (req, res) => {
    try {
        const users = await UserModel.findAll({include: "posts"});
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.get("/getOne/:uuid", async (req, res) => {
    try {
        const uuid = req.params.uuid;
        // const user = await UserModel.findOne({uuid});
        const user = await UserModel.findOne({where: {uuid}, include: 'posts'});
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router;