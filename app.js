const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const uri = "mongodb+srv://tanvir:helloworld@tanvirabbas.tzbhb.gcp.mongodb.net/tanvirAbbas?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected…')
})
.catch(err => console.log(err.message))

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

let note = new Schema({
    name: {
        type: String,
        required: true
    },
    notesUrl:{
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    topic:{
        type: String,
        required: true
    }
});
noteSchema = mongoose.model('notes', note);
let search = false;
let result;
app.get('/', async(req,res)=>{
    if(!search){
        result = await noteSchema.find({});
    }
    res.render('index',{result:result});
    search = false;
});
app.post('/',async(req,res)=>{
    search = true;
    q = req.body.sQuery;
    console.log(q);
    result = await noteSchema.find({name: new RegExp(q, "i")});
    console.log(result);
    res.redirect('/');
});
app.get('/note/:id',async(req,res)=>{
    let result = await noteSchema.find({"_id": req.params.id});
    res.render('notes',{result: result})
    console.log(result);
});

app.get('/newpost/tanvirabbasfsd24434', (req,res)=>{
    res.render('savenotes');
});
app.post('/newpost/tanvirabbasfsd24434',(req,res)=>{
    let name = req.body.notesName;
    let cat = req.body.category;
    let notesUrl = req.body.notesUrl;
    let decs = req.body.decs;
    let notes = new noteSchema({
        name: name,
        notesUrl: notesUrl,
        desc: decs,
        topic: cat
    })
    notes.save();
    res.redirect('/newpost/tanvirabbasfsd24434');
});
app.listen(process.env.PORT || 5000);