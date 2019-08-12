const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Ket noi mongoDB
mongoose.connect("mongodb+srv://root:root123@cluster0-hfbob.azure.mongodb.net/t1904a",
    function (err) {
    if(err){
        console.log("error");
    }else{
        console.log("success");
    }
});

var Product  = mongoose.model("product",
    {product_name: String,price: Number,qty: Number});

var User = mongoose.model("user",{username: String,email:String,password:String});

app.use(express.static("public"));

app.listen(1234,function (err) {
    console.log("server is running");
});

app.get("/tao-san-pham",function (req,res) {
    var p1 = new Product({product_name:"Tủ lạnh Toshiba",price: 12000000,qty:10});
    p1.save();
    res.send("Tao san pham thanh cong!");
})

app.get("/",function (req,res) {
    res.send("Hom nay thu 7, van phong nghi lam");
});

app.get("/contact-us",function (req,res) {
    res.sendFile(__dirname+"/views/contact-us.html");
});

app.get("/dang-ky-tai-khoan",function (req,res) {
    res.sendFile(__dirname+"/views/register.html");
});
app.get("/luu-tai-khoan",function (req, res) {
    var username1 = req.query.username123;
    var email1 = req.query.email;
    var pass1 = req.query.password;

    var u = new User({username:username1,email:email1,password: pass1});
    u.save();
    res.send("dang ky tai khoan thanh cong");
});