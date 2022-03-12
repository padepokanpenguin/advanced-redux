import { useSelector, useDispatch } from 'react-redux'
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Notification from './components/UI/Notification';
import { uiSliceActions } from './store/ui-slice';
import Products from './components/Shop/Products';
import {useEffect, Fragment} from 'react';

let isInitial = true;

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);
  
  useEffect(() => {
  const sendCartData = async () =>  {
    dispatch(uiSliceActions.showNotification({
      status: 'Pending',
      title: 'Sending...',
      message: 'sending cart data',
    }))
    const response = await fetch('https://react-advanced-redux-c6410-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart),
    });
    
    if (!response.ok) {
      throw new Error ('Sending cart data failed')
    }

    dispatch(uiSliceActions.showNotification({
      status: 'succes',
      title: 'Succes...',
      message: 'Sending cart data succesfully',
    }))
  };
  
  if (isInitial) {
    isInitial = false;
    return;
  }
  
  sendCartData().catch(error => {
    dispatch(uiSliceActions.showNotification({
      status: 'error',
      title: 'Error',
      message: 'Sending cart data failed',
    }))
  })
  },[cart, dispatch])

  return (
    <Fragment>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
      {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
