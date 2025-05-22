import * as styles from './HomeHeader.style';
import { useApiContext } from '../../contexts/ApiContext';
import { CartItemResponse } from '../../types/response';
import getCartItems from '../../api/getCartItems';
import useErrorHandler from '../../hooks/useErrorHandler';
import Header from './Header';

function HomeHeader() {
  const { data: cartItems, error: cartFetchError } = useApiContext<CartItemResponse>({
    fetchFn: getCartItems,
    key: 'getCartItems'
  });

  useErrorHandler(cartFetchError);

  return (
    <>
      <Header
        left={<p css={styles.logoCss}>SHOP</p>}
        right={
          <button css={styles.cartIcon}>
            <img src="assets/cart.svg" alt="cart-icon" />
            <span hidden={cartItems?.content.length === 0}>{cartItems?.content.length}</span>
          </button>
        }
      />
    </>
  );
}

export default HomeHeader;
