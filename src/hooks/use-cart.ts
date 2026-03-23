"use client";
import { useContext } from 'react';
import CartContext from '@/context/cart-context';
import type { Product } from '@/lib/products';

export function useCart() {
  const { state, dispatch } = useContext(CartContext);
  
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  return {
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
}
