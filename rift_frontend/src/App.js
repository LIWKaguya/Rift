import { useEffect, useState } from 'react';
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        blogService.getAll().then(blogs => {
            setBlogs(blogs)
        })
    }, [])

    console.log(blogs)

    return (
        <div>
            <h2>Current Blog</h2>
            { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
        </div>
    )
}

export default App