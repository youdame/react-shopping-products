import { rest } from 'msw';

export const handlers = [
  // 상품 목록 GET 핸들러
  rest.get('/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json('./data/products.json') // 또는 직접 객체 넣어도 됨
    );
  }),

  // 장바구니 목록 GET 핸들러
  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json('./data/cartItems.json'));
  }),

  // 장바구니 추가 POST 핸들러
  rest.post('/cart-items', async (req, res, ctx) => {
    const { productId, quantity } = await req.json();

    // 예시: 재고 초과
    if (quantity > 5) {
      return res(
        ctx.status(400),
        ctx.json({
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.'
        })
      );
    }

    return res(ctx.status(201));
  }),

  // 장바구니 수량 변경 PATCH 핸들러
  rest.patch('/cart-items/:id', async (req, res, ctx) => {
    const { quantity } = await req.json();

    if (quantity > 5) {
      return res(
        ctx.status(400),
        ctx.json({
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.'
        })
      );
    }

    return res(ctx.status(200));
  })
];
