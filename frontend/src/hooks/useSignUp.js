import {useAuthContext} from './useAuthContext'
import {useState} from 'react'

export const useSignUp = () => {
    const [error , setError] = useState(null)
    const [isLoading , setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()


    const signUp = async (email,password) => {

        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/user/signup' , {
            method : 'POST',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify({email,password})
        })
        const json = await response.json()            // to get response in a json format

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            // storing / saving the user {JWT token , email} in local storage   , doing so that user can still be logged in if browser refreshes
            localStorage.setItem('user',JSON.stringify(json))

            // update the AuthContext
            dispatch({type : 'LOGIN' , payload : json})

            setIsLoading(false)
        }

    }

    return { signUp , error , isLoading}
}