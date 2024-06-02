import {createContext, useReducer} from 'react'

export const WorkoutContext = createContext()

export const workoutsReducer = (state , action) => {                                   // what this do is locally is update the state without fetching from the server or db
     switch(action.type){
        case "SET_WORKOUTS":
            return {
                workouts : action.payload
            }
        case "CREATE_WORKOUT":
            return {
                workouts : [action.payload , ...state.workouts]                                          // means ... to spread the object
            }
        case 'DELETE_WORKOUT':
            return {
                workouts : state.workouts.filter((w) =>  w._id !== action.payload._id)                                  // firing a function for each workout to check if we want the workout to show or not , the deleted one will not be shown
            }
        default:
            return state;
     }
} 

export const WorkoutContextProvider = ( {children })=>{             // here children is the props of the wrapped component , which is the app component in this case   , it used for providing context to the wrapped component
    const [state,dispatch] = useReducer( workoutsReducer , {workouts : null} );                          // useReducer is used for updating states , read it about in docs
    // dispatch = (({type : " SET_WORKOUTS", payload : array of workouts}) it is a property which contains the following used for invoking a action or dispatch a action

    // now the workoutcontextprovider is providing context to whatever component is wrapped inside the context provider
    // value are something which is available to every component wrapped inside the context provider
    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>                           
        {children}                                                              
        </WorkoutContext.Provider>
    )

}