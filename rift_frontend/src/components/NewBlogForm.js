import { useRef, useState } from "react"

import Togglable from "./Togglable"
import blogService from '../services/blogs'

const NewBlogForm = ({ blogs, setBlogs}) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const blogFormRef = useRef()

    const handleUploadBlog = async (event) => {
        blogFormRef.current.toggleVisibility()
        event.preventDefault()
        const newBlog = await blogService.upload({
            title, content
        })
        setBlogs([...blogs, newBlog])
        setTitle('')
        setContent('')
    }

    return (
        <Togglable ref={blogFormRef} buttonLabel='Create' cancelLabel='Cancel'>
            <form onSubmit={handleUploadBlog}>
                <div>title:<input type='text' id='title' value={title} onChange={({target}) => setTitle(target.value)}></input></div>
                <div>content:<textarea id='content' value={content} onChange={({target}) => setContent(target.value)}></textarea> </div>
                <button type='submit'>Create</button>
            </form>
        </Togglable>
    )
}

export default NewBlogForm