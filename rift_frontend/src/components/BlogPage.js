import Blog from "./Blog"
import React from "react"

const BlogPage = ({ blogs, user, handleLogOut }) => {

    return (
        <>
            <h2>{user.username} logged in</h2>
            <button onClick={handleLogOut}>Logout</button>
            { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
        </>
    )
}

export default BlogPage