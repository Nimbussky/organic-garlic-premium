"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { CartItem, Product } from "@/types"

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "TOGGLE_CART" }
  | { type: "CLEAR_CART" }

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  totalItems: number
  subtotal: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  toggleCart: () => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.product.id === action.payload.product.id
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          isOpen: true,
        }
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        isOpen: true,
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload.productId
        ),
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }
    case "CLEAR_CART":
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  })

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const addItem = (product: Product, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } })

  const removeItem = (productId: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: { productId } })

  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } })

  const toggleCart = () => dispatch({ type: "TOGGLE_CART" })

  const clearCart = () => dispatch({ type: "CLEAR_CART" })

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        toggleCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}