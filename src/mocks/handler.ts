import { http, HttpResponse } from 'msw';
import products from './data/products.json';
import cartItems from './data/cartItems.json';
import { CartItemResponse } from '../types/response';
const serverCartItems = JSON.parse(JSON.stringify(cartItems)) as CartItemResponse;

type PostProductRequestBody = {
  productId: number;
  quantity: number;
};

export const handlers = [
  // 🛍️ 상품 목록 조회
  http.get('/products', () => {
    return HttpResponse.json(products);
  }),

  // 🛒 장바구니 목록 조회
  http.get('/cart-items', () => {
    return HttpResponse.json(serverCartItems);
  }),

  // ➕ 장바구니 아이템 추가
  http.post('/cart-items', async ({ request }) => {
    const { productId, quantity } = (await request.json()) as PostProductRequestBody;

    if (quantity > 5) {
      return HttpResponse.json(
        {
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.'
        },
        { status: 400 }
      );
    }

    const product = products.content.find((p) => p.id === productId);

    if (!product) {
      return HttpResponse.json(
        {
          errorCode: 'PRODUCT_NOT_FOUND',
          message: '상품을 찾을 수 없습니다.'
        },
        { status: 404 }
      );
    }

    const newItem = {
      id: Date.now(),
      quantity,
      product
    };

    serverCartItems.content.push(newItem);

    return new HttpResponse(null, { status: 201 });
  }),

  // ❌ 장바구니 아이템 삭제
  http.delete('/cart-items/:cartItemId', ({ params }) => {
    const idToDelete = Number(params.cartItemId);

    serverCartItems.content = serverCartItems.content.filter((item) => item.id !== idToDelete);

    return new HttpResponse(null, { status: 204 });
  })
];
