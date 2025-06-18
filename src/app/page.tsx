import { ProductDashboard } from "@/components/product-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Walmart Product Management Demo</h1>
          <p className="text-gray-600">Manage and view product inventory and purchase history</p>
        </div>
        <ProductDashboard />
      </div>
    </main>
  )
}
