const express = require("express");
const path = require("path");

const { Post: PostModel, User: UserModel } = require(path.join(__dirname, "..", "models"));

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Post router.",
        creation: {
            method: "Post",
            path: "/post/create",
            body: ["body", "userId"]
        },
        getPost: {
            method: "Get",
            path: "/post/getOne/:id",
        },
        getAllPosts: {
            method: "Get",
            path: "/post/getAll",
        },
        update: {
            method: "Put",
            path: "/post/update/:id",
            body: ["body", "userId"]
        },
        delete: {
            method: "Delete",
            path: "/post/delete/:id"
        }
    })
})

router.post("/create", async (req, res) => {
    try {
        const {userId, body} = req.body;
        const user = await UserModel.findOne({where: {uuid: userId}})
        if (user) {
            const post = await PostModel.create({body, userId: user.id})
            return res.status(201).json(post)
        }
        return res.status(404).json({
            message: "User not found."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.get("/getAll", async (req, res) => {
    try {
        // const posts = await PostModel.findAll({include: [{model: UserModel, as: "user"}]});
        // const posts = await PostModel.findAll({include: ["user"]});
        const posts = await PostModel.findAll({include: "user"});
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.get("/getOne/:uuid", async (req, res) => {
    try {
        const uuid = req.params.uuid;
        const post = await PostModel.findOne({ where: {uuid}, include: "user" })
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.delete("/delete/:uuid", async(req, res) => {
    try {
        const uuid = req.params.uuid;
        await PostModel.destroy({ where: {uuid} })
        res.status(204).json({
            message: "Post deleted successfully."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }    
})

router.put("/update/:uuid", async(req, res) => {
    try {
        const uuid = req.params.uuid;
        const {body} = req.body;
        const post = await PostModel.findOne({where: {uuid}});
        post.body = body || post.body;
        await post.save();
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = router