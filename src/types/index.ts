export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice?: number
  unit: string
  images: string[]
  category: string
  tags: string[]
  nutrition: NutritionInfo
  benefits: string[]
  storage: string
  inStock: boolean
  weight: string
  origin: string
}

export interface NutritionInfo {
  calories: number
  fat: number
  carbs: number
  protein: number
  fiber: number
  vitaminC: number
  manganese: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  subtotal: number
  shipping: number
  discount: number
  status: OrderStatus
  customer: CustomerInfo
  paymentMethod: string
  createdAt: string
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

export interface Review {
  id: string
  productId: string
  name: string
  rating: number
  comment: string
  date: string
}

export interface AdminStats {
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  totalProducts: number
  pendingOrders: number
  monthlyRevenue: number[]
}