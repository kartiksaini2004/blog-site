import express, { urlencoded } from "express";
import articleRouter from "./routes/articles.js";
import mongoose from "mongoose";
import Article from './models/article.js';
import methodOverride from 'method-override';

mongoose.connect('mongodb://localhost/blog');
const app = express();
const PORT = 5000;

app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

app.get("/",async(req,res)=>{
    const articles = await Article.find().sort({createdAt:'desc'});
    res.render("articles/index.ejs",{articles:articles});
});
app.use("/articles",articleRouter);

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});