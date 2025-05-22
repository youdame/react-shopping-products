import { useState } from 'react';
import * as styles from './Header.style';
import DetailModal from '../Modal/DetailModal';
import { useApiContext } from '../../contexts/ApiContext';
import { CartItemResponse } from '../../types/response';
import getCartItems from '../../api/getCartItems';
import Image from '../Image/Image';

function Header({ cartLength }: { cartLength?: number | undefined }) {
  const [isAlertOpen, setAlertOpen] = useState(false);

  const handleToggle = () => {
    setAlertOpen((prev) => !prev);
  };

  const { data: cartItems } = useApiContext<CartItemResponse>({
    fetchFn: getCartItems,
    key: 'getCartItems'
  });

  return (
    <header css={styles.header}>
      <p>SHOP</p>
      <button onClick={handleToggle} css={styles.cartIcon}>
        <img src="assets/cart.svg" alt="cart-icon" />
        <span hidden={cartLength === 0}>{cartLength}</span>
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
