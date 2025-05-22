import * as styles from './Header.style';
import { useApiContext } from '../../contexts/ApiContext';
import { CartItemResponse } from '../../types/response';
import getCartItems from '../../api/getCartItems';
import useErrorHandler from '../../hooks/useErrorHandler';

function Header() {
  const { data: cartItems, error: cartFetchError } = useApiContext<CartItemResponse>({
    fetchFn: getCartItems,
    key: 'getCartItems'
  });

  useErrorHandler(cartFetchError);

  return (
    <header css={styles.header}>
      <p>SHOP</p>
      <button css={styles.cartIcon}>
        <img src="assets/cart.svg" alt="cart-icon" />
        <span hidden={cartItems?.content.length === 0}>{cartItems?.content.length}</span>
      </button>
    </header>
  );
}

export default Header;
