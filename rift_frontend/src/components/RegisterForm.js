const RegisterForm = ({ handleRegister, name, setName, registerUsername, setRegisterUsername, registerPassword, setRegisterPassword }) => {
    return (
        <form onSubmit={handleRegister}>
            <div>username: <input type='text' value={registerUsername} name='username' onChange={({target}) => setRegisterUsername(target.value)}></input></div>
            <div>name: <input type='text' value={name} name='name' onChange={({target}) => setName(target.value)}></input></div>
            <div>password: <input type='password' value={registerPassword} name='password' onChange={({target}) => setRegisterPassword(target.value)}></input></div>
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm