import {useState} from 'react'
import {useWorkoutContext} from '../hooks/useWorkoutContext'            // we are using useWorkoutContext to update the array of workouts in global context
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
    const {dispatch} = useWorkoutContext();     // destructure the useWorkoutContext to get only dispatch value
    const [title,setTitle] = useState('')  // sets initial value of title as empty string
    const [load,setLoad] = useState('')  
    const [reps,setReps] = useState('')
    const [error,setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();  // prevents the form from submitting with default values
        
        if(!user) {
            setError("You must be logged in")
            return
        }

        const workout = {title,load,reps}

        const response = await fetch('http://localhost:4000/api/workouts' , {              // using fetchAPI to send a POST request
            method : 'POST',
            body : JSON.stringify(workout),     //to send workout as body  and convert workout as a JSON string
            headers : {
                'Content-Type' : 'application/json',      // to specify the data sent through request
                'Authorization' : `Bearer ${user.token}`        // sending authorization token JWT
            }
        })   

        const json = await response.json()

        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('New Workout added',json)
            dispatch({type : 'CREATE_WORKOUT' , payload : json})
        }
    }


    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a workout: </h3>

            <label>Workout Title:</label>
            <input 
                type='text'
                onChange={(e)=>{setTitle(e.target.value)}}      // e stands for event , target is our input field
                value={title}
                className = {emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in Kg):</label>
            <input 
                type='number'
                onChange={(e)=>{setLoad(e.target.value)}}      // e stands for event , target is our input field
                value={load}
                className = {emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
                type='number'
                onChange={(e)=>{setReps(e.target.value)}}      // e stands for event , target is our input field
                value={reps}
                className = {emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    ) 
}

export default WorkoutForm;