import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import ProductList from '../components/Product/ProductList/ProductList';
import { ErrorContextProvider } from '../contexts/ErrorContext';
import products from '../mocks/data/products.json';
import { describe, it, beforeAll, afterAll, afterEach, vi, expect } from 'vitest';

const server = setupServer(
  http.get('/products', () => {
    return HttpResponse.json(products);
  }),
  http.get('/cart-items', () => {
    return HttpResponse.json({ content: [] });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe.only('🧪 ProductList 컴포넌트 (http 기반)', () => {
  const mockRefetchCart = vi.fn();

  it('상품 목록이 성공적으로 렌더링된다', async () => {
    render(
      <ErrorContextProvider>
        <ProductList cartItems={[]} refetchCart={mockRefetchCart} />
      </ErrorContextProvider>
    );

    await waitFor(() => {
      screen.getByRole('heading', { name: /^12$/ });
    });
  });

  it('상품 API 요청이 실패하면 에러 메시지가 출력된다', async () => {
    // 👉 http 버전의 핸들러로 실패 시나리오 대체
    server.use(
      http.get('/products', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(
      <ErrorContextProvider>
        <ProductList cartItems={[]} refetchCart={mockRefetchCart} />
      </ErrorContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/에러가 발생했습니다/i)).toBeInTheDocument();
    });
  });
});
