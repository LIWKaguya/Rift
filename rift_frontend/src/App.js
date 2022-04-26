import { useEffect, useState } from 'react';
import BlogPage from './components/BlogPage';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs => {
            setBlogs(blogs)
        })
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if(loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.authenticate({
                username, password
            })
            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            { 
            user === null ? 
                <LoginForm 
                    handleLogin={handleLogin}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword} /> 
                : 
                <BlogPage 
                    user={user}
                    blogs={blogs} />
            }
        </>
    )
}

export default App