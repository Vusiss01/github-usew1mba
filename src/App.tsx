import { Layout } from "./components/layout/Layout"
import { SidebarProvider } from "./components/layout/SidebarContext"

function App() {
  return (
    <SidebarProvider>
      <Layout>
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Delicious Food Delivered
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Order your favorite meals from the best restaurants in town. Fast delivery, great prices, and amazing food.
          </p>
          <div className="flex items-center gap-x-6">
            <button className="px-6 py-3 text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              Order Now
            </button>
            <button className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Browse Restaurants
            </button>
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  )
}

export default App
