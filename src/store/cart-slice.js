import { createSlice } from '@reduxjs/toolkit';
import {uiSliceActions} from './ui-slice';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        })
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.totalQuantity--;
      // state.changed = true;


      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price
      }
    }
  }
})

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiSliceActions.showNotification({
      status: 'pending',
      title: 'Pending...',
      message: 'Sending cart detail',
    })
    );
    const sendRequest = async () => {
      const response = await fetch('https://react-advanced-redux-c6410-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      }
      );

      if (!response.ok) {
      throw new Error('Failed sending cart data')
      }
    }
  
    try {
    await sendRequest();
      
    dispatch(uiSliceActions.showNotification({
        status: 'succes',
        title: 'Succes!',
        message: 'Sent cart data succesfully',
      }
      ))

    } catch (error) {
      dispatch(uiSliceActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed',
      }))
    }

    ;

  }
}

export const cartSliceActions = cartSlice.actions;

export default cartSlice
