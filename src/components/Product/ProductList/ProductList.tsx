import { CartItem } from '../../../types/cartContents';
import { Product } from '../../../types/product';
import ProductCard from '../ProductCard/ProductCard';
import * as styles from './ProductList.style';

interface ProductListProps {
  products?: Product[];
  cartItems?: CartItem[];
  refetchCart: () => Promise<void>;
}

export default function ProductList({ products, cartItems, refetchCart }: ProductListProps) {
  return (
    <ul css={styles.listCss}>
      {products?.map(({ id, price, name, imageUrl }) => {
        const matchedCartItem = cartItems?.find((cartItem) => cartItem.product.id === id);

        const cartItemId = matchedCartItem?.id;

        const isItemInCart = Boolean(matchedCartItem);

        return (
          <ProductCard
            key={id}
            productId={id}
            cartItemId={cartItemId}
            price={price}
            title={name}
            imageUrl={imageUrl}
            refetchCart={refetchCart}
            isItemInCart={isItemInCart}
          />
        );
      })}
    </ul>
  );
}
