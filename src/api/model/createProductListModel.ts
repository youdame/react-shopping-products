import { CartItem } from '../../types/cartContents';
import { Product } from '../../types/product';

interface createProductListViewModelParams {
  products?: Product[];
  carts?: CartItem[];
}

export interface ProductCardViewModel {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  isInCart: boolean;
  cartItemId?: number;
}

export function createProductListViewModel({
  products,
  carts
}: createProductListViewModelParams): ProductCardViewModel[] {
  if (!products) return [];

  return products.map((product) => {
    const matchedCart = carts?.find((c) => c.product.id === product.id);
    return {
      id: product.id,
      title: product.name,
      price: `${product.price.toLocaleString()}원`,
      imageUrl: product.imageUrl,
      isInCart: !!matchedCart,
      cartItemId: matchedCart?.id
    };
  });
}
