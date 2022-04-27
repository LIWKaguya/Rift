import { useEffect, useState } from 'react';
import BlogPage from './components/BlogPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
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

    const handleRegister = async (event) => {
        event.preventDefault()
        try {
            await userService.register({
                username: registerUsername,
                name,
                password: registerPassword
            })
            const user = await loginService.authenticate({
                username : registerUsername,
                password : registerPassword
            })
            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            setRegisterUsername('')
            setName('')
            setRegisterPassword('')
        } catch (error) {
            console.log(error.response.data)
        }
    }

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
            console.log(error.response.data)
        }
    }

    const handleLogOut = () => {
        setUser(null)
        window.localStorage.clear()
    }

    return (
        <>
            { 
            user === null ? 
                <>
                    <LoginForm 
                        handleLogin={handleLogin}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword} /> 
                    <RegisterForm
                        handleRegister={handleRegister}
                        registerUsername={registerUsername}
                        setRegisterUsername={setRegisterUsername}
                        registerPassword={registerPassword}
                        setRegisterPassword={setRegisterPassword}
                        name={name}
                        setName={setName} />
                </>
                : 
                <BlogPage 
                    user={user}
                    blogs={blogs}
                    handleLogOut={handleLogOut} />
            }
        </>
    )
}

export default App