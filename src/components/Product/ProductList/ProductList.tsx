import * as styles from './ProductList.style';
import Dropdown from '../../Dropdown/Dropdown';
import Spinner from '../../Spinner/Spinner';
import ProductCard from '../ProductCard/ProductCard';
import { CATEGORY_OPTIONS, ORDER_BY_OPTIONS } from '../../../constants/categoryOption';
import { CartItem } from '../../../types/cartContents';
import { useCallback, useState } from 'react';
import { CategoryOptionType, OrderByOptionType } from '../../../types/categoryOption';
import { useErrorContext } from '../../../contexts/ErrorContext';
import useFetch from '../../../hooks/useFetch';
import { ProductResponse } from '../../../types/response';
import getProducts from '../../../api/getProducts';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { createProductListViewModel, ProductCardViewModel } from '../../../api/model/createProductListModel';
import { deleteCartItem } from '../../../api/deleteCartItem';
import postCartItem from '../../../api/postCartItem';

interface ProductListProps {
  cartItems?: CartItem[];
  refetchCart: () => Promise<void>;
}

export default function ProductList({ cartItems, refetchCart }: ProductListProps) {
  const [category, setCategory] = useState<CategoryOptionType>('전체');
  const [orderBy, setOrderBy] = useState<OrderByOptionType>('낮은 가격순');
  const { showError } = useErrorContext();

  const {
    data: products,
    isLoading: productFetchLoading,
    error: productFetchError
  } = useFetch<ProductResponse>({
    fetchFn: getProducts(orderBy),
    deps: [orderBy]
  });

  useErrorHandler(productFetchError);

  const filteredProducts =
    category === '전체' ? products?.content : products?.content.filter((item) => item.category === category);

  const productListViewModel = createProductListViewModel({
    products: filteredProducts,
    cartItems
  });

  const handleCartToggle = useCallback(
    async (product: ProductCardViewModel) => {
      try {
        if (product.isInCart) {
          await deleteCartItem(product.cartItemId!);
          await refetchCart();
        } else {
          await postCartItem(product.id, 1);
          await refetchCart();
        }
      } catch (err) {
        if (err instanceof Error) showError(err);
      }
    },
    [refetchCart, showError]
  );

  return (
    <>
      <div css={styles.dropdownDivCss}>
        <Dropdown list={CATEGORY_OPTIONS} placeholder="전체" value={category} onSelect={setCategory} />
        <Dropdown list={ORDER_BY_OPTIONS} placeholder="낮은 가격순" value={orderBy} onSelect={setOrderBy} />
      </div>
      {productFetchLoading ? (
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
