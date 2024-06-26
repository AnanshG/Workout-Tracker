import {AuthContext} from '../context/AuthContext'
import {useContext} from 'react'

export const useAuthContext = ()=>{
    const context = useContext(AuthContext);        // for understanding see workout context
                                                    // if we want to use Authcontext , that is the user  values in state so we invoke this hook and destructure the state to get user value
    if(!context){
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context;
}