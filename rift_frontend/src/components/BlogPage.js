import Blog from "./Blog"
import React from "react"
import NewBlogForm from "./NewBlogForm"

const BlogPage = ({ blogs, user, handleLogOut, setBlogs }) => {

    return (
        <>
            <h1>Blog app</h1>
            <h2>{user.username} logged in<button onClick={handleLogOut}>Logout</button></h2> 
            { blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} />) }
            <NewBlogForm blogs={blogs} setBlogs={setBlogs}/>
        </>
    )
}

export default BlogPage