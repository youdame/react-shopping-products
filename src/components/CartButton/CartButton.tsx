import * as styles from './CartButton.style';
import { ComponentProps, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useErrorContext } from '../../contexts/ErrorContext';
import { deleteCartItem } from '../../api/deleteCartItem';
import postCartItem from '../../api/postCartItem';

interface CartButtonProps extends ComponentProps<'button'> {
  isInCart: boolean;
  refetchCart: () => Promise<void>;
  productId: number;
  cartItemId?: number;
}

export default function CartButton({ isInCart, refetchCart, productId, cartItemId, ...props }: CartButtonProps) {
  const { showError } = useErrorContext();

  const {
    fetcher: deleteCartItemFetcher,
    isLoading: isDeletingCartItem,
    error: deleteError
  } = useFetch({
    fetchFn: deleteCartItem(cartItemId),
    immediate: false
  });

  const {
    fetcher: postCartItemFetcher,
    isLoading: isAddingCartItem,
    error: addError
  } = useFetch({
    fetchFn: postCartItem(productId, 1),
    immediate: false
  });

  useEffect(() => {
    if (deleteError) {
      showError(deleteError);
    }
  }, [deleteError]);

  useEffect(() => {
    if (addError) {
      showError(addError);
    }
  }, [addError]);

  const handleDeleteCartItem = async () => {
    try {
      await deleteCartItemFetcher();
      await refetchCart();
    } catch (error) {
      if (error instanceof Error) {
        showError(error);
      }
    }
  };

  const handlePostCartItemFetcher = async () => {
    try {
      await postCartItemFetcher();
      await refetchCart();
    } catch (error) {
      if (error instanceof Error) {
        showError(error);
      }
    }
  };

  return (
    <button
      {...props}
      disabled={isAddingCartItem || isDeletingCartItem}
      onClick={isInCart ? handleDeleteCartItem : handlePostCartItemFetcher}
      css={[styles.buttonCss, isInCart ? styles.inCartCss : styles.notInCartCss]}
    >
      {isInCart ? (
        <>
          <img src="assets/emptyCart.svg" />
          <span>빼기</span>
        </>
      ) : (
        <>
          <img src="assets/filledCart.svg" />
          <span>담기</span>
        </>
      )}
    </button>
  );
}
