import { TYPES } from "../acciones/accionesCarrito";

export const compraIncialState = {
    cart:[],
}



export function compraReducer(state,action){
    switch (action.type) {
       case TYPES.ADD_TO_CART:{
        let newItem = action.payload;
        let iteminCart = state.cart.find((item) => item.cod_bl === newItem.cod_bl);

        return iteminCart ? {
            ...state,
            cart:state.cart.map(item => item.cod_bl===newItem.cod_bl ? {...item, quantity:item.quantity + 1}:item),

        }:{
            ...state,
            cart:[...state.cart, {...newItem,quantity:1}],
        };

       }
       case TYPES.REMOVE_ONE_FROM_CART:{
        let itemtoDelete = state.cart.find((item) => item.cod_bl === action.payload);

        return itemtoDelete.quantity > 1 ? {
            ...state,
            cart:state.cart.map((item) => item.cod_bl === action.payload ? {...item, quantity:item.quantity-1}:item),
        }: {
            ...state,
            cart: state.cart.filter((item) => item.cod_bl !== action.payload),
        }
       }
       case TYPES.REMOVE_ALL_FROM_CART:{
        return{
            ...state,
            cart: state.cart.filter((item) => item.cod_bl !== action.payload),
        }
       }
       case TYPES.CLEAR_CART:
        return compraIncialState;


       default:
        return state;
    }
}
