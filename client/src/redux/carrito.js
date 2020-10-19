import axios from 'axios'

//CONSTANTES

const GET_CARRITO = 'GET_CARRITO'
const GET_LOCAL_CARRITO = 'GET_LOCAL_CARRITO'
const MIGRAR_DATA = 'MIGRAR_DATA'

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
        case GET_LOCAL_CARRITO:
            return {
                ...state,
                carritoProducts: action.payload,
                carritoInfo: {
                    id: 0,
                    userId: 'GUEST'
                }
            }
        case MIGRAR_DATA:
            return {                
                carritoProducts: []
            }
        default:
            return {
                ...state
            }
    }
}

// // ACTIONS

export const getCarrito = (userId) => async(dispatch) => { 
     try{
        const {data} = await axios.get(`http://localhost:3001/user/${userId}/cart`)
        dispatch({
            type: GET_CARRITO,
            payload: data
        })

     }catch(error){
        console.log(error)
     }
}

export const getLocalCarrito = () => (dispatch) => {
    
    const data = JSON.parse(localStorage.getItem('carrito'))
    dispatch({
        type: GET_LOCAL_CARRITO,
        payload: data
    })
}

export const localToUser = (id, carrito) => async (dispatch) => {
    try{
        console.log(carrito);
        
        carrito.map(async (p) => {
            await axios.post(`http://localhost:3001/user/${id}/cart`, p)
        })
        
        console.log(localStorage);
        
        dispatch({
            type: MIGRAR_DATA
        })
    }catch(err) {
        console.log(err);
        
    }
}
