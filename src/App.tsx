import { Layout } from "./components/layout/Layout"
import { SidebarProvider } from "./components/layout/SidebarContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SplashScreen from "./components/auth/SplashScreen"
import { ChevronLeft, ChevronRight } from "lucide-react"

function App() {
  return (
    <Router>
      <SidebarProvider>
        <Routes>
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/" element={
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

                {/* Food Categories Section */}
                <div className="w-full max-w-6xl mx-auto px-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Search by Food</h2>
                    <div className="hidden md:flex items-center gap-2">
                      <a href="#" className="text-orange-500 hover:underline">View All</a>
                      <button className="p-2 bg-orange-500 rounded-full text-white hover:bg-orange-600">
                        <ChevronLeft size={24} />
                      </button>
                      <button className="p-2 bg-orange-500 rounded-full text-white hover:bg-orange-600">
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  </div>

                  {/* Mobile View - Instagram Stories Style */}
                  <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
                    <div className="flex gap-4 min-w-max">
                      <div className="w-20 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-orange-500 p-0.5">
                          <div className="rounded-full overflow-hidden w-full h-full relative">
                            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591" alt="Pizza" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <p className="text-sm mt-1 font-medium">Pizza</p>
                      </div>
                      <div className="w-20 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-orange-500 p-0.5">
                          <div className="rounded-full overflow-hidden w-full h-full relative">
                            <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd" alt="Burger" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <p className="text-sm mt-1 font-medium">Burger</p>
                      </div>
                      <div className="w-20 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-orange-500 p-0.5">
                          <div className="rounded-full overflow-hidden w-full h-full relative">
                            <img src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624" alt="Noodles" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <p className="text-sm mt-1 font-medium">Noodles</p>
                      </div>
                      <div className="w-20 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-orange-500 p-0.5">
                          <div className="rounded-full overflow-hidden w-full h-full relative">
                            <img src="https://images.unsplash.com/photo-1509722747041-616f39b57569" alt="Sub-sandwich" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <p className="text-sm mt-1 font-medium">Sub-sandwich</p>
                      </div>
                      <div className="w-20 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-orange-500 p-0.5">
                          <div className="rounded-full overflow-hidden w-full h-full relative">
                            <img src="https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1" alt="Chowmein" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <p className="text-sm mt-1 font-medium">Chowmein</p>
                      </div>
                      <div className="w-20 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-orange-500 p-0.5">
                          <div className="rounded-full overflow-hidden w-full h-full relative">
                            <img src="https://images.unsplash.com/photo-1546964124-0cce460f38ef" alt="Steak" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <p className="text-sm mt-1 font-medium">Steak</p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Grid View */}
                  <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-6">
                    <div className="text-center">
                      <div className="rounded-full overflow-hidden mb-2 aspect-square">
                        <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591" alt="Pizza" className="w-full h-full object-cover" />
                      </div>
                      <p className="font-medium">Pizza</p>
                    </div>
                    <div className="text-center">
                      <div className="rounded-full overflow-hidden mb-2 aspect-square">
                        <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd" alt="Burger" className="w-full h-full object-cover" />
                      </div>
                      <p className="font-medium">Burger</p>
                    </div>
                    <div className="text-center">
                      <div className="rounded-full overflow-hidden mb-2 aspect-square">
                        <img src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624" alt="Noodles" className="w-full h-full object-cover" />
                      </div>
                      <p className="font-medium">Noodles</p>
                    </div>
                    <div className="text-center">
                      <div className="rounded-full overflow-hidden mb-2 aspect-square">
                        <img src="https://images.unsplash.com/photo-1509722747041-616f39b57569" alt="Sub-sandwich" className="w-full h-full object-cover" />
                      </div>
                      <p className="font-medium">Sub-sandwich</p>
                    </div>
                    <div className="text-center">
                      <div className="rounded-full overflow-hidden mb-2 aspect-square">
                        <img src="https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1" alt="Chowmein" className="w-full h-full object-cover" />
                      </div>
                      <p className="font-medium">Chowmein</p>
                    </div>
                    <div className="text-center">
                      <div className="rounded-full overflow-hidden mb-2 aspect-square">
                        <img src="https://images.unsplash.com/photo-1546964124-0cce460f38ef" alt="Steak" className="w-full h-full object-cover" />
                      </div>
                      <p className="font-medium">Steak</p>
                    </div>
                  </div>
                </div>
              </div>
            </Layout>
          } />
        </Routes>
      </SidebarProvider>
    </Router>
  )
}

export default App
