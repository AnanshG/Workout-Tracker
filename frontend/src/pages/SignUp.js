import { useState} from 'react'
import { useSignUp } from '../hooks/useSignUp';


const SignUp = () => {
    const [email, setEmail] = useState();
    const [password , setPassword] = useState();
    const {signUp , error , isLoading} = useSignUp();

    const handleSubmit = async (e) => {                  // function is async because later on we are making a request to backend which can take time so that why it is asynchronous
        e.preventDefault();
        
        console.log(email,password)

        await signUp(email , password)
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
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

            <button disabled = {isLoading}>Sign Up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}


export default SignUp