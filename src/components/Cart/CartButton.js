import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import { uiSliceActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiSliceActions.toggle())
  }

  return (
    <button className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
