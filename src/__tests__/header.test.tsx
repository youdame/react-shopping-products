import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import Header from '../components/Header/Header';
import { CartItemResponse } from '../types/response';
import { handlers } from '../mocks/handler';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('장바구니에 있는 아이템 수만큼 숫자가 표시된다.', async () => {
  const res = await fetch('/cart-items');
  const data: CartItemResponse = await res.json();

  const cartLength = data.content.length;
  render(<Header cartLength={cartLength} />);

  await waitFor(() => {
    expect(screen.getByText(String(cartLength))).toBeInTheDocument();
  });
});
