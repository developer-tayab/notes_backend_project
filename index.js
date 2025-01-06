const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  fs.readdir("./files", (error, files) => {
    if (error) {
      console.log(error);
    }
    else {
      res.render("index", { files: files });
    }
  })
})

app.post("/create", (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (error) => {
    if (error) {
      console.log(error);

    } else {
      res.redirect("/");
    }
  })
})

app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.render("details", { title: req.params.filename.split(".")[0], details: data });
    }
  })
})

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { title: req.params.filename })
})

app.post("/edit", (req, res) => {
  const previousName = req.body.previousName.trim(); // Remove any leading/trailing spaces
  const newName = req.body.newName.trim(); // Remove any leading/trailing spaces

  fs.rename(`./files/${previousName}`, `./files/${newName}`, (error) => {
    if (error) {
      console.log(error); // Log the error for debugging
      res.status(500).send("Error renaming the file.");
    } else {
      res.redirect("/");
    }
  });
});



const Port = 3000;
app.listen(Port, () => {
  console.log(`Server is running at http://localhost:${Port}`)
}) 