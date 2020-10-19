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

// Buscara solo un usuario el logueado
export let id;

export const getLogin = (body) => async(dispatch) => {
    console.log('login', body)
    try{
    const {data} = await axios.post('http://localhost:3001/user/login', body)
  id = data.id
        
      dispatch({ 
            type: GET_LOGIN, 
            payload: data
    },
        window.alert(`Bienvenido ${data.email}`)
    )
    }catch(error){
        console.log(error)
    }
    ;
};



