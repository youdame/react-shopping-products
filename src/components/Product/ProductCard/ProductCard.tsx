import CartButton from '../../CartButton/CartButton';
import * as styles from './ProductCard.style';
import Image from '../../Image/Image';
interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  refetchCart: () => Promise<void>;
  isItemInCart: boolean;
  productId: number;
  cartItemId?: number;
}

function ProductCard({ title, price, imageUrl, isItemInCart, refetchCart, productId, cartItemId }: ProductCardProps) {
  return (
    <li css={styles.cardCss}>
      <Image css={[styles.imageCss]} src={imageUrl} alt={`${title}상품`} />

      <div css={styles.detailCss}>
        <h2>{title}</h2>
        <p>{`${price.toLocaleString()}원`}</p>
        <CartButton productId={productId} refetchCart={refetchCart} isInCart={isItemInCart} cartItemId={cartItemId} />
      </div>
    </li>
  );
}

export default ProductCard;
