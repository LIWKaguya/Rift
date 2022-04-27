const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }

    return (
        <div style={blogStyle}>
            {blog.title} by {blog.user.username}
        </div>
    )
}

export default Blog