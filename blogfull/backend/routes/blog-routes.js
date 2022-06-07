import  express  from "express";
import { addBlog, deleteBlog, getAllBlogs, getById, updateBlog } from "../controllers/blog-controller";
const BlogRouter = express.Router();

BlogRouter.get("/",getAllBlogs);
BlogRouter.post("/add",addBlog);
BlogRouter.put("/update:id",updateBlog);
BlogRouter.get("/:id",getById);
BlogRouter.delete("/:id",deleteBlog);
//BlogRouter.get("/user/:id",);


export default BlogRouter;