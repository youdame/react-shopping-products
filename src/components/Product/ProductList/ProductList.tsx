import * as styles from './ProductList.style';
import useProductList from '../../../hooks/useProductList';
import Dropdown from '../../Dropdown/Dropdown';
import Spinner from '../../Spinner/Spinner';
import ProductCard from '../ProductCard/ProductCard';
import { CATEGORY_OPTIONS, ORDER_BY_OPTIONS } from '../../../constants/categoryOption';
import { CartItem } from '../../../types/cartContents';

interface ProductListProps {
  cartItems?: CartItem[];
  refetchCart: () => Promise<void>;
  cartItemsLoading: boolean;
}

export default function ProductList({ cartItems, refetchCart, cartItemsLoading }: ProductListProps) {
  const { category, setCategory, orderBy, setOrderBy, productListViewModel, productFetchLoading, handleCartToggle } =
    useProductList({ cartItems, refetchCart });

  return (
    <>
      <div css={styles.dropdownDivCss}>
        <Dropdown list={CATEGORY_OPTIONS} placeholder="전체" value={category} onSelect={setCategory} />
        <Dropdown list={ORDER_BY_OPTIONS} placeholder="낮은 가격순" value={orderBy} onSelect={setOrderBy} />
      </div>
      {cartItemsLoading || productFetchLoading ? (
        <Spinner size="medium" />
      ) : (
        <ul css={styles.listCss}>
          {productListViewModel.map((productCard) => (
            <ProductCard key={productCard.id} {...productCard} onClick={() => handleCartToggle(productCard)} />
          ))}
        </ul>
      )}
    </>
  );
}
