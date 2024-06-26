import {useEffect} from 'react'
import {useWorkoutContext} from '../hooks/useWorkoutContext'

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/workoutForm';
import {useAuthContext} from '../hooks/useAuthContext'

const Home = () => {
    //  not of use right now as we are using workoutContext
    // // creating local state
    // const [workouts,setWorkouts] = useState(null)  // it consist of variable , function to assign its value , default value is set null

    const {workouts , dispatch} = useWorkoutContext()     // here we are destructuring useWorkoutContext() to get only workouts and dispatch value
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkout = async() => {
            const response = await fetch('http://localhost:4000/api/workouts',{
                headers : {
                    'Authorization' : `Bearer ${user.token}`        // using backticks for outputting a variable in a string , Bearer is just some word we have to use
                } 
            })      // for resolving the cross server request problem we put /api/workouts as it will recognize internally a static request and will proxy the request // fetch function is an API which fetches the workout from the backend
            const json = await response.json();
        
            if(response.ok){
                dispatch({type : 'SET_WORKOUTS' , payload : json})          // dispatch functon is fired which inturn fires workoutReducer function in workoutContext in context folder
            }
    
        }

        if(user){
            fetchWorkout()
        }

    },[dispatch,user]) // since dispatch function is an external function , so we need to pass it to useEffect functon because if dispatch function changes useEffect can run again then
                        // user is a variable so when its value changes , the function gets executed

    return (
        <div className="home">
            <div className='workouts'>
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key = {workout._id} workout = {workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;