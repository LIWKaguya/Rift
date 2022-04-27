const Blog = ({ blog }) => {
    return (
        <div>
            <p>{blog.title} by {blog.user.username}</p>
        </div>
    )
}

export default Blog