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
import AllStoresPage from "./pages/AllStoresPage";
import AllRecommendationsPage from "./pages/AllRecommendationsPage";
import AllTrendingPage from "./pages/AllTrendingPage";
import AllMilkshakesPage from "./pages/AllMilkshakesPage";
import FullMapPage from "./pages/FullMapPage";
import GiftCardsPage from "./pages/help/GiftCardsPage";
import AddRestaurantPage from "./pages/restaurants/AddRestaurantPage";
import SignUpDeliverPage from "./pages/help/SignUpDeliverPage";
import FirstOrderPage from "./pages/help/FirstOrderPage";
import NearbyRestaurantsPage from "./pages/restaurants/NearbyRestaurantsPage";
import ViewAllCitiesPage from "./pages/restaurants/ViewAllCitiesPage";
import PickupNearMePage from "./pages/restaurants/PickupNearMePage";
import AboutUsPage from "./pages/about/AboutUsPage";
import CareersPage from "./pages/about/CareersPage";
import InvestorsPage from "./pages/about/InvestorsPage";
import BlogPage from "./pages/about/BlogPage";
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage";
import TermsPage from "./pages/legal/TermsPage";
import PricingPage from "./pages/legal/PricingPage";
import DoNotSellPage from "./pages/legal/DoNotSellPage";
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

            {/* New Routes */}
            <Route path="/all-stores" element={<AllStoresPage />} />
            <Route path="/full-map" element={<FullMapPage />} />
            <Route path="/recommendations" element={<AllRecommendationsPage />} />
            <Route path="/trending" element={<AllTrendingPage />} />
            <Route path="/milkshakes" element={<AllMilkshakesPage />} />

            {/* Help Routes */}
            <Route path="/gift-cards" element={<GiftCardsPage />} />
            <Route path="/add-restaurant" element={<AddRestaurantPage />} />
            <Route path="/sign-up-deliver" element={<SignUpDeliverPage />} />
            <Route path="/first-order" element={<FirstOrderPage />} />

            {/* Restaurant Routes */}
            <Route path="/nearby" element={<NearbyRestaurantsPage />} />
            <Route path="/cities" element={<ViewAllCitiesPage />} />
            <Route path="/pickup" element={<PickupNearMePage />} />

            {/* About Routes */}
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/investors" element={<InvestorsPage />} />
            <Route path="/blog" element={<BlogPage />} />

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

            {/* Legal Routes */}
            <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/legal/terms" element={<TermsPage />} />
            <Route path="/legal/pricing" element={<PricingPage />} />
            <Route path="/legal/do-not-sell" element={<DoNotSellPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </SidebarProvider>
  );
}

export default App;
