import { useState } from 'react';
import * as styles from './Header.style';
import DetailModal from '../Modal/DetailModal';
import { useApiContext } from '../../contexts/ApiContext';
import { CartItemResponse } from '../../types/response';
import getCartItems from '../../api/getCartItems';
import Image from '../Image/Image';
import useErrorHandler from '../../hooks/useErrorHandler';

function Header() {
  const [isAlertOpen, setAlertOpen] = useState(false);

  const handleToggle = () => {
    setAlertOpen((prev) => !prev);
  };

  const { data: cartItems, error: cartFetchError } = useApiContext<CartItemResponse>({
    fetchFn: getCartItems,
    key: 'getCartItems'
  });

  useErrorHandler(cartFetchError);

  return (
    <header css={styles.header}>
      <p>SHOP</p>
      <button onClick={handleToggle} css={styles.cartIcon}>
        <img src="assets/cart.svg" alt="cart-icon" />
        <span hidden={cartItems?.content.length === 0}>{cartItems?.content.length}</span>
      </button>

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
    </header>
  );
}

export default Header;
