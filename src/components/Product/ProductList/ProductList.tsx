import * as styles from './ProductList.style';
import { deleteCartItem } from '../../../api/deleteCartItem';
import postCartItem from '../../../api/postCartItem';
import { useErrorContext } from '../../../contexts/ErrorContext';
import { CartItem } from '../../../types/cartContents';
import { Product } from '../../../types/product';
import ProductCard from '../ProductCard/ProductCard';
import { createProductListViewModel, ProductCardViewModel } from '../../../api/model/createProductListModel';

interface ProductListProps {
  products?: Product[];
  cartItems?: CartItem[];
  refetchCart: () => Promise<void>;
}
export default function ProductList({ products, cartItems, refetchCart }: ProductListProps) {
  const { showError } = useErrorContext();

  const productListViewModel = createProductListViewModel({
    products,
    cartItems
  });

  const handleCartToggle = async (product: ProductCardViewModel) => {
    try {
      if (product.isInCart) {
        await deleteCartItem(product.cartItemId!)();
      } else {
        await postCartItem(product.id, 1)();
      }
      await refetchCart();
    } catch (err) {
      if (err instanceof Error) showError(err);
    }
  };

  return (
    <ul css={styles.listCss}>
      {productListViewModel.map((productCard) => (
        <ProductCard key={productCard.id} {...productCard} onClick={() => handleCartToggle(productCard)} />
      ))}
    </ul>
  );
}
