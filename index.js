const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

var admin = require("firebase-admin");

var serviceAccount = require("./short1-980a8-firebase-adminsdk-szyq5-37fc0fb8ce.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//const static 
const static = express.static('public');

const urlsdb = admin.firestore().collection("urlsdb");
const usersdb = admin.firestore().collection("usersdb");

//app.use
app.use(static);
app.use(bodyParser.json());
// app.use((req, res, next) => {
//     console.log("We intercepted the request"); 
//     next(); 
// })

app.get('/:short', (req, res) => {
    console.log(req.params); 
    const short = req.params.short;
    const doc = urlsdb.doc(short);

    doc.get().then(response => {
        const data = response.data();
        //console.log(data);

        if(data && data.url){
            res.redirect(301, data.url);
        } else {
            res.redirect(301, "https://leetcode.com/");
        }
    })
    // res.send('we will redirect you to' + short)
})

app.post('/admin/urls', (req, res) => {
    const {email, password, short, url} = req.body;

    usersdb.doc(email).get().then(response=>{
        const user = response.data();
        // console.log(user);

        if(user && (user.email == email) && (user.password == password)){
            const doc = urlsdb.doc(short);
            doc.set({url});
            res.send("Done")
        } else {
            res.send(403, "Not possible")
        }
    })
  })

//app.get

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})