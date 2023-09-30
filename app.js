const express = require("express");
const http = require("http")
const dotenv = require("dotenv");
const path = require("path")

const {sequelize} = require(path.join(__dirname, "models"));
const userRouter = require(path.join(__dirname, "routes", "user"));
const postRouter = require(path.join(__dirname, "routes", "post"));

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.json({
        message: "Hello and welcome."
    })
})

app.use("/user", userRouter);
app.use("/post", postRouter);

async function main() {
    try {
        // await sequelize.sync({alter: true});
        await sequelize.authenticate();
        app.listen(PORT, () => {
            console.log(`Http server is running on port: ${PORT}`);
        })
        http.createServer(app)
    } catch (error) {
        console.log("The server could not connect to the database.");
    }
}

main()
