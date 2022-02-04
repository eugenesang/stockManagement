const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const {readFile}=require("fs");

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(cors({origin:'*'}));

const uri="mongodb+srv://Eugene:24Kmagic@student.vjnh9.mongodb.net/stock?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology:true, useNewUrlParser:true})
.then(r=>{
  app.listen(4000, ()=>{
    console.log("app listening on port 4000")
  })
});


const Item=require("./itemsModel");
app.post("/save", (req, res)=>{
    console.log(req.body);
    let item=new Item(req.body);
    item.save()
    .then(d=>{
        res.redirect("/");
    })
    .catch(e=>res.json({error:e}))
})
app.post("/update",(req, res)=>{
    let {id}=req.body;
    Item.findById(id)
    .then(d=>{
        for(let i in red.body) d[i]=req.body[i];
        d.save()
        .then(result=>res.json(result))
    }).catch(e=>res.json({error:e}));
})
app.post("/delete", (req, res)=>{
    Item.findById(req.body.id).then(d=>{
        d.delete().then(ans=>res.json(ans))
    }).catch(e=>res.json({error:e}))
})
app.get("/all", (req, res)=>{
    Item.find()
    .then(d=>{
        res.json(d);
    }).catch(
        e=>res.json({error:e})
    )
});
app.get("/", (req, res)=>{
    readFile("client.html", "utf-8", (err, data)=>{
        res.send(data);
    })
})