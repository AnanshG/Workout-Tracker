import {useReducer , createContext , useEffect} from 'react'          // for a quick understanding read workoutContext.js for documentation

export const AuthContext = createContext();             

export const AuthReducer = (state , action) => {
    switch(action.type){
        case 'LOGIN':
            return {user : action.payload}
        case 'LOGOUT':
            return {user : null};
        default :
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state , dispatch] = useReducer(AuthReducer , {
        user : null
    })

    useEffect(() => {           // using useEffect to see if we have a token in localstorage and keep the user logged in if the browser refreshes
        const user = JSON.parse(localStorage.getItem('user'))   // using parse because localstorage keeps the value in json string form , but we want it in object

        if(user){
            dispatch({type : 'LOGIN' , payload : user})
        }

    } , [])    // means only fire the function once when the component renders , if we provide a function or variable in array then it will fire the function as many times as the variable or function changes

    console.log('AuthContext state :' , state)      // to keep track of state whenever it changes , that is during login , logout etc

    return (                                            // providing user property (state) and dispatch function as values
        <AuthContext.Provider value={{...state,dispatch}}>          
            {children}          
        </AuthContext.Provider>
    )
}


