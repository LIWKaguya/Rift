import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
    const likeThis = async () => {
        const likedBlog = await blogService.like({
            id : blog.id
        })
        setBlogs(blogs.map(blog => blog.id === likedBlog.id ? likedBlog : blog))
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }

    return (
        <div style={blogStyle}>
            {blog.title} by {blog.user.username} <br />
            likes : {blog.likes} <button onClick={likeThis}>Like</button>
        </div>
    )
}

export default Blog