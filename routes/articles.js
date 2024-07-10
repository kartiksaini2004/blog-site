import experss from "express";
const router = experss.Router();
import Article  from "./../models/article.js"


router.get("/new",(req,res)=>{
    res.render('articles/new',{article:new Article()});
});

router.get("/edit/:id",async (req,res)=>{
    const article = await Article.findById(req.params.id);
    res.render('articles/edit',{article:article});
});
router.get("/:slug",async(req,res)=>{
    const article = await Article.findOne({slug:req.params.slug});
    if(article==null) res.redirect("/");
    res.render('articles/show',{article:article});
})

router.delete('/:id',async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})
router.post("/",async (req,res)=>{
    var article =new Article({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    })

    //to save new article in database
    try {
        article = await article.save();   
        res.redirect(`/articles/${article.slug}`);
    } catch (error) {
        console.log(error);
        res.render("articles/new",{article:article});
    }
})
router.put("/:id",async(req,res)=>{
    var article = await Article.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    },
    { new: true, runValidators: true }
    )
    try {
        article = await article.save();   
        res.redirect(`/articles/${article.slug}`);
    } catch (error) {
        console.log(error);
        res.render('articles/edit',{article:article});
    }
})

export default router;