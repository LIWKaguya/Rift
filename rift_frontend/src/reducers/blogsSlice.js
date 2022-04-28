import { createSlice } from "@reduxjs/toolkit";
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs: (_, action) => {
            return action.payload
        },
        addBlog: (state, action) => {
            return [...state, action.payload]
        },
        likeBlog: (state, _) => {
            return state
        },
        deleteBlog: (state, action) => {
            return state.filter(b => b.id !== action.payload.id)
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogsService.upload(blog)
        dispatch(addBlog(newBlog))
    }
}

export const likeThisBlog = ({ id }) => {
    return async dispatch => {
        await blogsService.like({ id })
        dispatch(likeBlog())
    }
}

export const deleteThisBlog = ({ id }) => {
    return async dispatch => {
        await blogsService.clearThis({ id })
        dispatch(deleteBlog({ id }))
    }
}


export const {setBlogs, addBlog, likeBlog, deleteBlog} = blogsSlice.actions
export default blogsSlice.reducer;