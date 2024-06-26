import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogOut = () => {
    const {dispatch} = useAuthContext();
    const {dispatch : workoutDispatch} = useWorkoutContext()          // setting name of dispatch function of workout context something else , so to remove same variabel names error

    const logout = () => {
        // remove the user (user details) from the local storage
        localStorage.removeItem('user')

        // dispatch logout function
        dispatch({type : "LOGOUT"})
        workoutDispatch({type : "SET_WORKOUTS", payload : null})
    }

    return {logout}
}