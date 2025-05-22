import * as styles from './App.style';
import Header from './components/Header/HomeHeader';
import ProductList from './components/Product/ProductList/ProductList';

function App() {
  return (
    <div css={styles.bodyCss}>
      <div style={{ marginBottom: '80px' }} />
      <Header />
      <ProductList />
    </div>
  );
}

export default App;
