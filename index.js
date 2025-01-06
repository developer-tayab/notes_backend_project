const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


app.get("/", (req,res )=>{
  fs.readdir("./files" , (error , files )=>{
    if(error){
      console.log(error);
    }
    else{
      res.render("index" , {files : files});
    }
  })
})

app.post("/create" , (req , res)=>{
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt` , req.body.details , (error)=>{
   if(error){
     console.log(error);
   
   }else{
     res.redirect("/");
   } 
  })
})


const Port = 3000;
app.listen(Port,()=>{
  console.log(`Server is running at http://localhost:${Port}`)
}) 