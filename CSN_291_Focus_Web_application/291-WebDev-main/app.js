const express= require("express");
const bodyparser= require("body-parser");
const mongoose=require("mongoose");


const app = express();
app.set('view engine','ejs');
app.use(bodyparser.urlencoded ({extended: true}));
app.use(express.static("public"));


const uri = "mongodb+srv://CSN291:hYdmruJn1e1vS3Tj@cluster0.4x7ct7y.mongodb.net/?retryWrites=true&w=majority";
const client = (uri, { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect(uri,client).then(()=>{
  console.log("Connected");
});

const itemsschema= new mongoose.Schema({
  name: String
});

const completeditemsschema = new mongoose.Schema({
  name:String
});

const item= mongoose.model("item",itemsschema);
const item1= new item({
  name:"hi"
});

const completeditem=mongoose.model("completeditem",completeditemsschema);


const defaultitems=[];
let nooftasksleft=0;


item.find().count(function(err, count){
  if(err){
    console.log(err);
  }
  console.log(count);
  nooftasksleft=count;
});






app.post("/maintask",function(req,res){
  let t1 = req.body.taskname;
  console.log(t1);
  const newitem = new item({
    name:t1
  });

  newitem.save();
  nooftasksleft=nooftasksleft+1;



  // item.insertMany(defaultitems,function(err){
  //   if(err){
  //     console.log("error is occuring");
  //     console.log(err);
  //   }
  //   else{
  //     console.log("success");
  //   }
  // })


  res.redirect("/")

});

app.post("/delete",function(req,res){
  const checkeditemid = req.body.deletebutton;

  item.findByIdAndRemove(checkeditemid,function(err){
    if(!err){
      console.log("successfully deleted");
    }


  });

  nooftasksleft=nooftasksleft-1;

  res.redirect("/");

});


let taskvalue=1;
let notevalue=0;
let searchvalue=0;
let boredvalue=0;
let dark=0;


let options={
  weekday:"long",
  day: "numeric",
  month:"long"
}
let today = new Date().toLocaleDateString("en-US",options);



app.get("/",function(req,res){


  item.find({},function(err,founditems){

    res.render("list",{todaydate:today,tvalue:taskvalue, nvalue:notevalue,svalue:searchvalue,bvalue:boredvalue,items: founditems,tleft: nooftasksleft,darkno:dark});
  })
});

app.post("/task",function(req,res){
  taskvalue=1;
  notevalue=0;
  searchvalue=0;
  boredvalue=0;
  res.redirect("/");

});

app.post("/notes",function(req,res){
  taskvalue=0;
  notevalue=1;
  searchvalue=0;
  boredvalue=0;
  res.redirect("/");

});

app.post("/darkmode",function(req,res){
if(dark==0){
  dark=1;
}
else{
  dark=0;
}

res.redirect("/");

});

app.post("/search",function(req,res){
  taskvalue=0;
  notevalue=0;
  searchvalue=1;
  boredvalue=0;
  res.redirect("/");

});

app.post("/bored",function(req,res){
  taskvalue=0;
  notevalue=0;
  searchvalue=0;
  boredvalue=1;
  res.redirect("/");

})


app.listen(3000,function(){
  console.log("server is working on port 3000");
});
