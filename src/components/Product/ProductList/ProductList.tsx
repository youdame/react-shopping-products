import * as styles from './ProductList.style';
import { deleteCartItem } from '../../../api/deleteCartItem';
import postCartItem from '../../../api/postCartItem';
import { useErrorContext } from '../../../contexts/ErrorContext';
import { CartItem } from '../../../types/cartContents';
import ProductCard from '../ProductCard/ProductCard';
import { createProductListViewModel, ProductCardViewModel } from '../../../api/model/createProductListModel';
import { CategoryOptionType, OrderByOptionType } from '../../../types/categoryOption';
import { useState, useEffect, useMemo, useCallback } from 'react';
import useFetch from '../../../hooks/useFetch';
import getProducts from '../../../api/getProducts';
import { ProductResponse } from '../../../types/response';
import Dropdown from '../../Dropdown/Dropdown';
import { CATEGORY_OPTIONS, ORDER_BY_OPTIONS } from '../../../constants/categoryOption';
import Spinner from '../../Spinner/Spinner';

interface ProductListProps {
  cartItems?: CartItem[];
  refetchCart: () => Promise<void>;
  cartItemsLoading: boolean;
}

export default function ProductList({ cartItems, refetchCart, cartItemsLoading }: ProductListProps) {
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

  useEffect(() => {
    if (productFetchError) {
      showError(productFetchError);
    }
  }, [productFetchError, showError]);

  const filteredProducts = useMemo(() => {
    if (!products?.content) return [];
    return category === '전체' ? products.content : products.content.filter((item) => item.category === category);
  }, [products, category]);

  const productListViewModel = useMemo(() => {
    return createProductListViewModel({
      products: filteredProducts,
      cartItems
    });
  }, [filteredProducts, cartItems]);

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
  useEffect(() => {
    console.log(
      '🛒 cartItems changed',
      cartItems?.map((c) => c.id)
    );
  }, [cartItems]);

  if (cartItemsLoading || productFetchLoading) {
    return <Spinner size="medium" />;
  }

  return (
    <>
      <div css={styles.dropdownDivCss}>
        <Dropdown
          list={CATEGORY_OPTIONS}
          placeholder="전체"
          value={category}
          onSelect={(value: CategoryOptionType) => setCategory(value)}
        />
        <Dropdown
          list={ORDER_BY_OPTIONS}
          placeholder="낮은 가격순"
          value={orderBy}
          onSelect={(value: OrderByOptionType) => setOrderBy(value)}
        />
      </div>
      <ul css={styles.listCss}>
        {productListViewModel.map((productCard) => (
          <ProductCard key={productCard.id} {...productCard} onClick={() => handleCartToggle(productCard)} />
        ))}
      </ul>
    </>
  );
}
