import * as styles from './App.style';
import { useEffect } from 'react';
import useFetch from './hooks/useFetch';
import { CartItemResponse } from './types/response';
import getCartItems from './api/getCartItems';
import { useErrorContext } from './contexts/ErrorContext';
import Header from './components/Header/Header';
import ProductList from './components/Product/ProductList/ProductList';

function App() {
  const { showError } = useErrorContext();

  const {
    data: cartItems,
    error: cartFetchError,
    isLoading: cartItemsLoading,
    fetcher: refetchCart
  } = useFetch<CartItemResponse>({
    fetchFn: getCartItems
  });

  useEffect(() => {
    console.log('cartItems updated in App:', cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (cartFetchError) {
      showError(cartFetchError);
    }
  }, [cartFetchError, showError]);

  async function handleRefetchCart() {
    await refetchCart();
  }

  return (
    <div css={styles.bodyCss}>
      <div style={{ marginBottom: '80px' }} />
      {cartItemsLoading ? <Header /> : <Header cartLength={cartItems?.content.length} />}

      <ProductList cartItemsLoading={cartItemsLoading} cartItems={cartItems?.content} refetchCart={handleRefetchCart} />
    </div>
  );
}

export default App;
