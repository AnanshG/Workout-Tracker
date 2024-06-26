import {useState} from 'react'
import {useLogin} from '../hooks/useLogin'

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {login , error , isLoading} = useLogin()

    const handleSubmit = async (e) => {                  // function is async because later on we are making a request to backend which can take time so that why it is asynchronous
        e.preventDefault();
        
        await login(email, password)

    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Email :</label>
            <input
                type = "email"
                onChange = {(e) => setEmail(e.target.value)}            // target is input field here
                value={email}
            />
            <label>Password :</label>
            <input
                type = "password"
                onChange = {(e) => setPassword(e.target.value)}            // target is input field here
                value={password}
            />

            <button disabled = {isLoading}>Login</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}


export default Login