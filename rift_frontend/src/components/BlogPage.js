import Blog from "./Blog"
import React from "react"

const BlogPage = ({ blogs, user }) => {
    return (
        <>
            <h2>{user.username} logged in</h2>
            { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
        </>
    )
}

export default BlogPage