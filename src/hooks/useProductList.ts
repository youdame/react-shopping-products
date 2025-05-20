import { useState, useCallback } from 'react';
import { useErrorContext } from '../contexts/ErrorContext';
import useFetch from '../hooks/useFetch';
import getProducts from '../api/getProducts';
import { createProductListViewModel, ProductCardViewModel } from '../api/model/createProductListModel';
import { CategoryOptionType, OrderByOptionType } from '../types/categoryOption';
import { CartItem } from '../types/cartContents';
import { ProductResponse } from '../types/response';
import { deleteCartItem } from '../api/deleteCartItem';
import postCartItem from '../api/postCartItem';
import useErrorHandler from './useErrorHandler';

interface UseProductListProps {
  cartItems?: CartItem[];
  refetchCart: () => Promise<void>;
}

export default function useProductList({ cartItems, refetchCart }: UseProductListProps) {
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

  return {
    category,
    setCategory,
    orderBy,
    setOrderBy,
    productListViewModel,
    productFetchLoading,
    handleCartToggle
  };
}
