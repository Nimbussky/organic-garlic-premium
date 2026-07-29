"use client"

import { useState } from "react"
import { products } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui"
import type { Order } from "@/types"

const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    items: [{ product: products[0], quantity: 2 }],
    total: 698,
    subtotal: 698,
    shipping: 0,
    discount: 0,
    status: "pending",
    customer: {
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 98765 43210",
      address: "123 Green Avenue",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    paymentMethod: "UPI",
    createdAt: "2026-07-29T10:30:00Z",
  },
  {
    id: "ORD-002",
    items: [{ product: products[2], quantity: 1 }],
    total: 599,
    subtotal: 599,
    shipping: 0,
    discount: 0,
    status: "processing",
    customer: {
      name: "Rahul Verma",
      email: "rahul@example.com",
      phone: "+91 98765 43211",
      address: "456 Oak Street",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
    },
    paymentMethod: "UPI",
    createdAt: "2026-07-28T15:00:00Z",
  },
]

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "products">("dashboard")

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard" },
    { id: "orders" as const, label: "Orders" },
    { id: "products" as const, label: "Products" },
  ]

  return (
    <div className="pt-24 min-h-screen bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-[#C9A84C] text-sm tracking-[0.2em] uppercase mb-2">
              Admin Panel
            </p>
            <h1 className="text-4xl font-light text-[#1A1A2E]">Dashboard</h1>
          </div>
        </div>

        <div className="flex gap-1 bg-white rounded-2xl p-1 border border-[#E8E4DC] mb-10 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#1A1A2E] text-white"
                  : "text-[#5A5A6E] hover:text-[#1A1A2E]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "products" && <ProductsTab />}
      </div>
    </div>
  )
}

function DashboardTab() {
  const stats = {
    totalOrders: 156,
    totalRevenue: 58450,
    totalCustomers: 89,
    totalProducts: products.length,
    pendingOrders: 3,
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: "Total Orders", value: stats.totalOrders, color: "text-[#1A1A2E]" },
          { label: "Revenue", value: formatPrice(stats.totalRevenue), color: "text-[#C9A84C]" },
          { label: "Customers", value: stats.totalCustomers, color: "text-[#6B8E5A]" },
          { label: "Products", value: stats.totalProducts, color: "text-[#1A1A2E]" },
          { label: "Pending", value: stats.pendingOrders, color: "text-[#C44A4A]" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-2xl border border-[#E8E4DC]"
          >
            <p className="text-sm text-[#5A5A6E] mb-2">{stat.label}</p>
            <p className={`text-3xl font-light ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#E8E4DC]">
        <h3 className="text-lg font-medium text-[#1A1A2E] mb-6">
          Recent Orders
        </h3>
        <div className="space-y-4">
          {sampleOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-3 border-b border-[#E8E4DC] last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-[#1A1A2E]">{order.id}</p>
                <p className="text-xs text-[#5A5A6E]">{order.customer.name}</p>
              </div>
              <span className="text-sm font-medium">
                {formatPrice(order.total)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function OrdersTab() {
  return (
    <div className="bg-white rounded-3xl border border-[#E8E4DC] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E8E4DC]">
              {["Order ID", "Customer", "Items", "Total", "Status", "Date"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 text-xs text-[#5A5A6E] uppercase tracking-wider"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {sampleOrders.map((order) => (
              <tr key={order.id} className="border-b border-[#E8E4DC] last:border-0">
                <td className="px-6 py-4 text-sm font-medium text-[#1A1A2E]">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-sm text-[#5A5A6E]">
                  {order.customer.name}
                </td>
                <td className="px-6 py-4 text-sm text-[#5A5A6E]">
                  {order.items.length} items
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  {formatPrice(order.total)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#5A5A6E]">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ProductsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white p-6 rounded-3xl border border-[#E8E4DC]"
        >
          <div className="w-full h-40 bg-[#F5F0E8] rounded-2xl flex items-center justify-center mb-4">
            <span className="text-5xl opacity-40">🧄</span>
          </div>
          <h3 className="text-sm font-medium text-[#1A1A2E]">{product.name}</h3>
          <p className="text-[#C9A84C] text-sm mt-1">{formatPrice(product.price)}</p>
          <div className="flex items-center justify-between mt-3">
            <Badge variant={product.inStock ? "organic" : "sale"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
            <span className="text-xs text-[#5A5A6E]">{product.unit}</span>
          </div>
        </div>
      ))}
    </div>
  )
}