import axios from 'axios'

//CONSTANTES

const GET_USERS = 'GET_USERS';

 //STATE

const initialState = {
    users: [],
}

 // REDUCER

export default function userReducer(state = initialState, action){
    switch(action.type){
        case GET_USERS:
            return {
                ...state, 
                users: action.payload,
            }
        default:
            return{
                ...state
            }
    }
}

// ACTIONS

export const getUsers = (id) => async(dispatch) => {
    try{
    const {data} = await axios.get(`'http://localhost:3001/users/${id}'`)
        dispatch({ 
            type: GET_USERS, 
            payload: data
    })
    }catch(error){
        console.log(error)
    }
    ;
};
