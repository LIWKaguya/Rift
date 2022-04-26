const Blog = ({ blog }) => {
    return (
        <div>
            <p>{blog.content} by {blog.user.username}</p>
        </div>
    )
}

export default Blog