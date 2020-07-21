const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/ejDB", {useNewUrlParser: true ,useUnifiedTopology: true, useFindAndModify: false,useCreateIndex: true});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://adminn-kunal:12345@cluster0.bcb1o.mongodb.net/Book?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("Book").collection("devices");
  // perform actions on the collection object
  client.close();
});
mongoose.connection.on('connected',() =>{
  console.log("run");
})
  
  

const bookSchema ={
    
      name: {
        type: String,
        required: true,
        text: true,
      },
      author: {
        type: String,
        required: true,
        text: true,
      },
      category: {
        type: String,
        required: true,
        enum: [
          "Beginner",
          "Fictional",
         
        ],
      },
      description: {
        type: String,
        required: true,
        text: true,
      },
      review: {
        type: String,
      },
      pages: {
        type: Number,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },

    }

const Book = mongoose.model("Book", bookSchema);


app.get("/", function(req,res){
         
    res.render("index")
 })

 app.post("/",function(req,res){
  
    const book = new Book ({
       
        name : req.body.postTitle,
        author : req.body.postAuthor,
        category : req.body.postCategory,
        description : req.body.postDescription,
        review :  req.body.postReview,
        pages : req.body.postPage,
        imageUrl :req.body.postImageUrl

});
    book.save(function(err){
        if (!err){
            res.redirect("/db");
        }
      });
     });

     app.get("/cat", function(req, res){
        Book.findOne({"category" :"Fictional" }, function(err, book){
            res.render("cat", {
                name : book.name,
                author : book.author,
                category : book.category,
                description : book.description,
                pages : book.pages,
                imageUrl : book.imageUrl
              
            });
          });
        
        });


// app.listen(3000, function() {
//     console.log("Server started on port 3000");
//   });
  
let port = (process.env.PORT || '3000')

app.listen(port, process.env.IP, function () {
    console.log("server is running");
});
 