import axios from 'axios'
import { localToUser } from './carrito';

//CONSTANTES


const GET_LOGIN = 'GET_LOGIN';
const GET_USERS = 'GET_USERS';


 //STATE

const initialState = {
    user: "",
    users: [],
    userLogin:{
        id:null,
        login: false
    }
}

 // REDUCER

export default function userReducer(state = initialState, action){
    switch(action.type){
        case GET_USERS:
            return {
                ...state, 
                users: action.payload,
            }
        case GET_LOGIN:
            return{
                ...state,
                userLogin:{
                    id: action.payload.id,
                    email: action.payload.email,
                    isAdmin: action.payload.isAdmin,
                    login: true
                }
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
    const {data} = await axios.get(`http://localhost:3001/users/${id}`, { withCredentials: true })
        dispatch({ 
            type: GET_USERS, 
            payload: data
    })
    }catch(error){
        console.log(error)
    }
    ;
};

// Buscara solo un usuario el logueado
export let id;

export const getLogin = (body) => async(dispatch) => {
    console.log('login', body)
    try{
    const {data} = await axios.post('http://localhost:3001/user/login', body, { withCredentials: true })
    console.log(data.user)
    id = data.user.id
        
      dispatch({ 
            type: GET_LOGIN, 
            payload: data.user
    },
        window.alert(`Bienvenido ${data.user.email}`)
    )
    }catch(error){
        console.log(error)
    }
    ;
};



