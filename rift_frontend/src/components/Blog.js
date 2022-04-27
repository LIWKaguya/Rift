import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
    const likeThis = async () => {
        const likedBlog = await blogService.like({
            id : blog.id
        })
        setBlogs(blogs.map(b => b.id === likedBlog.id ? likedBlog : b))
    }

    const handleDelete = async () => {
        const ok = window.confirm(`Do you want to delete "${blog.title}" ?`)
        if(ok) {
            setBlogs(blogs.filter(b => b.id !== blog.id))
            await blogService.clearThis({
                id : blog.id
            })
        }
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
            likes : {blog.likes} <button onClick={likeThis}>Like</button> <br />
            {user.username === blog.user.username ? <button onClick={handleDelete}>Delete</button> : <></>}
        </div>
    )
}

export default Blog