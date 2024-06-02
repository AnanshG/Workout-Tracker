import {WorkoutContext} from '../context/WorkoutContext'
import {useContext} from 'react'

export const useWorkoutContext = ()=>{
    const context = useContext(WorkoutContext);     // is used for gettng values from the WorkoutContext and setting them in context variable

    if(!context){
        throw Error('useWorkoutContext must be used inside an WorkoutContextProvider')
    }

    return context;
}