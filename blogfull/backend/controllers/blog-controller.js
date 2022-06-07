import mongoose from "mongoose";
import blog from "../model/blog";
import BlogRouter from "../routes/blog-routes";


export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await blog.find();
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "Bulunamadı" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
     existingUser =  await user.findById(user);
  } catch (err) {
    return console.log(err)
  }
  if (!existingUser) {
    return res.status(400).json({message:"Unable to find user by this ıd"});
  }

  const blogResult = new blog({
    title,
    description,
    image,
    user,
  });
  try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await blogResult.save({session});
      existingUser.blogs.push(blogResult);
      await existingUser.save({session});
      await session.commitTransaction();
  } catch (err) {
      console.log(err);
      return res.status(500).json({message:err})
  }
  return res.status(200).json({ blogResult })
};


export const updateBlog = async (req, res, next) => {
  const {title,description} = req.body;
    const blogId = req.params.id;
    let blog;
    try {
      const blog = await blog.findByIdUpdate(blogId,{
        title,
        description
      })
    } catch (err) {
      return console.log(err)
    }
    if(!blog){
      return res.status(500).json({message:"Güncellendi"})
    }
    return res.status(200).json({blog});
};




//çalışmıyor

export const getById = async (req,res,next)=>{
  const id = req.params.id;
  await blog;
  try {
    blog =  await blog.findById(id);
  } catch (err) {
    return console.log(err)
  }
  if (!blog) {
    return res.status(404).json({message:"blog bulunamadı"})
  }
  return res.status(200).json({blog});
};



export const deleteBlog = async (req,res,next)=>{
  const id = req.params.id;

  await blog;
  try {
    blog = await blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog)
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(400).json({message:""})
  }
  return res.status(200).json({message:"Silme başarılı"});
}





