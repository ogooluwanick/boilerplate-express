let express = require('express');
let app = express();
let bodyParser=require("body-parser");



app.use( (req,res,next)=>{
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
});

app.use(bodyParser.urlencoded({extend:false}))
app.get("/text",(req,res)=>{ res.send(__dirname+"/views/index.html")});

app.use("/public", express.static(__dirname + "/public"));


app.get("/now", (req,res,next)=>{
  req.time=new Date().toString();
  next();
},(req,res)=>{
  res.json({"time": req.time})
})



app.get("/json",(req,res)=>{
  if (process.env['MESSAGE_STYLE']!=="uppercase") {
    res.json({"message": "Hello json"})
  }
  res.json({"message": "Hello json".toUpperCase()})
})

app.get("/name",(req,res)=>{
  console.log(req.query)
  res.json({name:`${req.query.first} ${req.query.last}`})
})

app.post("/name",(req,res)=>{
  console.log(req.query)
  res.json({name:`${req.body.first} ${req.body.last}`})
})

app.get("/:word/echo",(req,res)=>{
  res.json({echo:req.params.word})
})

app.get("/",(req,res)=>{ res.sendFile(__dirname+"/views/index.html")});

































 module.exports = app;
