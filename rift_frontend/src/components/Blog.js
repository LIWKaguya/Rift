import blogService from '../services/blogs'

const Blog = ({ blog }) => {
    const likeThis = async () => {
        await blogService.like(blog)
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