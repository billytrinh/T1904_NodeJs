const express = require("express");
const app = express();

app.use(express.static("public"));

app.listen(1234,function (err) {
    console.log("server is running");
});

app.get("/",function (req,res) {
    res.send("Hom nay thu 7, van phong nghi lam");
});

app.get("/contact-us",function (req,res) {
    res.sendFile(__dirname+"/views/contact-us.html");
});