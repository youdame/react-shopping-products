import * as styles from './App.style';
import Header from './components/Header/Header';
import ProductList from './components/Product/ProductList/ProductList';

function App() {
  return (
    <div css={styles.bodyCss}>
      <div style={{ height: '80px' }} />
      <Header />
      <ProductList />
    </div>
  );
}

export default App;
