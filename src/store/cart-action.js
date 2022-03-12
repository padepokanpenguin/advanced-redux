// import {createSlice} from '@reduxjs/toolkit';
import { uiSliceActions } from './ui-slice';
import {cartSliceActions} from './cart-slice';


export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('https://react-advanced-redux-c6410-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json')
    

    if (!response.ok) {
      throw new Error('Could not fetch cart data')
    }

    const data = await response.json();

    return data;
    }

  try {
    const cartData = await fetchData();
    dispatch(cartSliceActions.replaceCart({
      items: cartData.items || [],
      totalQuantity: cartData.totalQuantity,
    }))
  } catch (error) {
    dispatch(uiSliceActions.showNotification({
      status: 'error',
      title: 'Error!',
      message: 'Fetching cart data failed',
    })
    )
  }
  }
}

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
        body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
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
