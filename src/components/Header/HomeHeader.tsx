import * as styles from './HomeHeader.style';
import { useApiContext } from '../../contexts/ApiContext';
import { CartItemResponse } from '../../types/response';
import getCartItems from '../../api/getCartItems';
import useErrorHandler from '../../hooks/useErrorHandler';
import Header from './Header';
import { useState } from 'react';
import DetailModal from '../Modal/DetailModal';
import Image from '../Image/Image';

function HomeHeader() {
  const [isAlertOpen, setAlertOpen] = useState(false);

  const handleToggle = () => {
    setAlertOpen((prev) => !prev);
  };
  const {
    data: cartItems,
    error: cartFetchError,
    isLoading
  } = useApiContext<CartItemResponse>({
    fetchFn: getCartItems,
    key: 'getCartItems'
  });

  useErrorHandler(cartFetchError);

  const cartLength = cartItems?.content.length;
  const shouldShowCount = !isLoading && cartLength !== 0;

  return (
    <>
      <Header
        left={<p css={styles.logoCss}>SHOP</p>}
        right={
          <button onClick={handleToggle} css={styles.cartIcon}>
            <img src="assets/cart.svg" alt="cart-icon" />
            {shouldShowCount && <span data-testid="cart-count">{cartLength}</span>}
          </button>
        }
      />
      {isAlertOpen && (
        <DetailModal
          isOpen={isAlertOpen}
          onClose={() => setAlertOpen(false)}
          content={
            <div css={styles.modalContent}>
              {cartItems?.content?.map((item) => (
                <div key={item.id} css={styles.cartItem}>
                  <div css={styles.cartImageWrapper}>
                    <Image src={item.product.imageUrl} />
                  </div>
                  <div css={styles.cartTextBlock}>
                    <p>{item.product.name}</p>
                    <p>{item.product.price.toLocaleString()}원</p>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      )}
    </>
  );
}
export default HomeHeader;
