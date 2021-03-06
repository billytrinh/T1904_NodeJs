const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Use models
const User = require("./models/User");
const Product = require("./models/Product");

const bodyParser = require("body-parser");
var multer = require("multer");

// Ket noi mongoDB
mongoose.connect("mongodb+srv://root:root123@cluster0-hfbob.azure.mongodb.net/t1904a",
    function (err) {
    if(err){
        console.log("error"+err.toString());
    }else{
        console.log("success");
    }
});

// var Product  = mongoose.model("product",
//     {product_name: String,price: Number,qty: Number});

//var User = mongoose.model("user",{username: String,email:String,password:String});

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({dest:__dirname+'/public/upload'}).any());

app.set("view engine","ejs");

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
app.post("/dang-ky-tai-khoan",function (req, res) {
    var username1 = req.body.username123;
    var email1 = req.body.email;
    var pass1 = req.body.password;

    var u = new User({username:username1,email:email1,password: pass1});
    u.save();
    res.send("dang ky tai khoan thanh cong");
});
app.get("/danh-sach-tai-khoan",function (req,res) {
    User.find({},function (err,data) {
        if(err){
            res.send("error");
        }else{
            res.render('list',{users:data});
        }
    }).catch(function (err) {
        res.send("error");
    });
});

app.get("/chi-tiet",function (req,res) {
    var _id = req.query.id;
    User.findById(_id).then(function (data) {
        res.render("chitiet",{user:data});
    });

})