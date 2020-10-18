import axios from 'axios'

//CONSTANTES

const GET_CARRITO = 'GET_CARRITO'


// STATE

const initialState = {
    carritoProducts: [],
}

// REDUCER

export default function carritoReducer (state = initialState, action){
    switch(action.type){
        case GET_CARRITO:
            return {
                ...state,
                carritoProducts: action.payload.products,
                carritoInfo: {
                    id: action.payload.id,
                    userId: action.payload.userId
                }
            }
        default:
            return {
                ...state
            }
    }
}

// // ACTIONS

export const getCarrito = () => async(dispatch) => { 
     try{
        const {data} = await axios.get(`http://localhost:3001/user/${1}/cart`)
        console.log(data)
        dispatch({
            type: GET_CARRITO,
            payload: data
        })
   
     }catch(error){
        console.log(error)
     }
}
