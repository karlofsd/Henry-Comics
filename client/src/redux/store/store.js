import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import productReducer from '../productos'
import categoryReducer from '../categorias'

const rootReducer = combineReducers({
    productState: productReducer,
    categoryState: categoryReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))
    return store;
}