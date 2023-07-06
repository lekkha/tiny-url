const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

//all the static files are in html
const static = express.static("public"); 

//static middleware able to put up files 
app.use(static); 
app.use(bodyParser.json());

//creating a middleware 
// app.use((req, res, next) => { 
//   console.log("we intercepted the request");
//   next; 
// })

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

//what is post operation what is get operation 
app.post("/admin/urls/", (req, res) => {
  console.log(req.body); 
  res.send("Hello from another!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});