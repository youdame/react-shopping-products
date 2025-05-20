import * as styles from './App.style';
import useFetch from './hooks/useFetch';
import { CartItemResponse } from './types/response';
import getCartItems from './api/getCartItems';
import Header from './components/Header/Header';
import ProductList from './components/Product/ProductList/ProductList';
import useErrorHandler from './hooks/useErrorHandler';

function App() {
  const {
    data: cartItems,
    error: cartFetchError,
    isLoading: cartItemsLoading,
    fetcher: refetchCart
  } = useFetch<CartItemResponse>({
    fetchFn: getCartItems
  });

  useErrorHandler(cartFetchError);

  async function handleRefetchCart() {
    await refetchCart();
  }

  return (
    <div css={styles.bodyCss}>
      <div style={{ marginBottom: '80px' }} />
      {cartItemsLoading ? <Header /> : <Header cartLength={cartItems?.content.length} />}
      <ProductList cartItems={cartItems?.content} refetchCart={handleRefetchCart} />
    </div>
  );
}

export default App;
