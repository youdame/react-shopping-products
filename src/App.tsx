import * as styles from './App.style';
import { CartItemResponse } from './types/response';
import getCartItems from './api/getCartItems';
import Header from './components/Header/Header';
import ProductList from './components/Product/ProductList/ProductList';
import useErrorHandler from './hooks/useErrorHandler';
import { useApiContext } from './contexts/ApiContext';

function App() {
  const {
    data: cartItems,
    error: cartFetchError,
    isLoading: cartItemsLoading
  } = useApiContext<CartItemResponse>({
    fetchFn: getCartItems,
    key: 'getCartItems'
  });

  useErrorHandler(cartFetchError);

  return (
    <div css={styles.bodyCss}>
      <div style={{ marginBottom: '80px' }} />
      {cartItemsLoading ? <Header /> : <Header cartLength={cartItems?.content.length} />}
      <ProductList />
    </div>
  );
}

export default App;
