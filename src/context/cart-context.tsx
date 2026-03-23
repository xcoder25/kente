"use client";
import React, { createContext, useReducer, ReactNode } from 'react';
import type { Product } from '@/lib/products';

export interface CartItem extends Product {
  quantity: number;
}

type CartState = {
  cart: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id:string; quantity: number } };

const initialState: CartState = {
  cart: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.payload;
      const existItem = state.cart.find((x) => x.id === item.id);
      const cartItems = existItem
        ? state.cart.map((x) =>
            x.id === existItem.id ? { ...item, quantity: x.quantity + 1 } : x
          )
        : [...state.cart, { ...item, quantity: 1 }];
      return { ...state, cart: cartItems };
    }
    case 'REMOVE_ITEM': {
      const cartItems = state.cart.filter((x) => x.id !== action.payload.id);
      return { ...state, cart: cartItems };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        const cartItems = state.cart.filter((x) => x.id !== id);
        return { ...state, cart: cartItems };
      }
      const cartItems = state.cart.map((x) =>
        x.id === id ? { ...x, quantity } : x
      );
      return { ...state, cart: cartItems };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
