import mongoose from "mongoose";
import * as marked from 'marked';
import slugify from "slugify";
import createDomPurify from "dompurify";
import {JSDOM} from 'jsdom'
const dompurify = createDomPurify(new JSDOM().window);
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    markdown:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    sanitizedHtml:{
        type:String,
        required:true
    }
})

articleSchema.pre('validate',function(next){
    if(this.title){
        this.slug = slugify(this.title,{lower:true,strict:true})
    }
    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
    }
    next()
})
export default mongoose.model('Article',articleSchema);