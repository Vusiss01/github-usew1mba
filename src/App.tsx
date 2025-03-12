import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import CategoryDetail from "./components/home";
import SplashScreen from "./components/auth/SplashScreen";
import AuthScreen from "./components/auth/AuthScreen";
import VendorListScreen from "./components/vendors/VendorListScreen";
import VendorDetailScreen from "./components/vendors/VendorDetailScreen";
import MenuScreen from "./components/vendors/MenuScreen";
import ItemDetailScreen from "./components/vendors/ItemDetailScreen";
import CartScreen from "./components/cart/CartScreen";
import CheckoutScreen from "./components/cart/CheckoutScreen";
import OrderConfirmationScreen from "./components/orders/OrderConfirmationScreen";
import OrderTrackingScreen from "./components/orders/OrderTrackingScreen";
import OrderHistoryScreen from "./components/orders/OrderHistoryScreen";
import UserProfileScreen from "./components/profile/UserProfileScreen";
import PaymentMethodsScreen from "./components/profile/PaymentMethodsScreen";
import ReviewsScreen from "./components/reviews/ReviewsScreen";
import SearchScreen from "./components/search/SearchScreen";
import CateringRequestScreen from "./components/catering/CateringRequestScreen";
import ChatScreen from "./components/chat/ChatScreen";
import DietaryPreferencesScreen from "./components/profile/DietaryPreferencesScreen";
import PromotionsScreen from "./components/promotions/PromotionsScreen";
import NotificationsScreen from "./components/notifications/NotificationsScreen";
import FavoritesScreen from "./components/favorites/FavoritesScreen";
import HelpSupportScreen from "./components/support/HelpSupportScreen";
import SettingsScreen from "./components/profile/SettingsScreen";
import TopRatedScreen from "./components/top-rated/TopRatedScreen";
import CuisinesScreen from "./components/cuisines/CuisinesScreen";
import routes from "tempo-routes";
import { SidebarProvider } from "./components/layout/SidebarContext";

function App() {
  return (
    <SidebarProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            {/* Authentication */}
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/auth" element={<AuthScreen />} />

            {/* Main Screens */}
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryId" element={<CategoryDetail />} />

            {/* Vendor Screens */}
            <Route path="/vendors" element={<VendorListScreen />} />
            <Route path="/vendor/:vendorId" element={<VendorDetailScreen />} />
            <Route path="/vendor/:vendorId/menu" element={<MenuScreen />} />
            <Route
              path="/vendor/:vendorId/menu/:itemId"
              element={<ItemDetailScreen />}
            />

            {/* Cart & Checkout */}
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />

            {/* Orders */}
            <Route
              path="/order-confirmation"
              element={<OrderConfirmationScreen />}
            />
            <Route
              path="/order-tracking/:orderId"
              element={<OrderTrackingScreen />}
            />
            <Route path="/orders" element={<OrderHistoryScreen />} />

            {/* Profile */}
            <Route path="/profile" element={<UserProfileScreen />} />
            <Route
              path="/profile/payment-methods"
              element={<PaymentMethodsScreen />}
            />
            <Route
              path="/profile/dietary-preferences"
              element={<DietaryPreferencesScreen />}
            />
            <Route path="/profile/settings" element={<SettingsScreen />} />
            <Route path="/favorites" element={<FavoritesScreen />} />

            {/* Reviews */}
            <Route path="/reviews/:vendorId" element={<ReviewsScreen />} />

            {/* Search */}
            <Route path="/search" element={<SearchScreen />} />

            {/* Additional Features */}
            <Route
              path="/catering-request"
              element={<CateringRequestScreen />}
            />
            <Route path="/chat/:vendorId" element={<ChatScreen />} />
            <Route path="/promotions" element={<PromotionsScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/help-support" element={<HelpSupportScreen />} />
            <Route path="/top-rated" element={<TopRatedScreen />} />
            <Route path="/cuisines" element={<CuisinesScreen />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/splash" replace />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </SidebarProvider>
  );
}

export default App;
