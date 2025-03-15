import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationTabs from "../layout/NavigationTabs";
import {
  ChevronLeft,
  Copy,
  Calendar,
  Tag,
  Info,
  X,
  Gift,
  Star,
  Trophy,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";
import Logo from "../layout/Logo";

interface Promotion {
  id: string;
  code: string;
  description: string;
  expiryDate: string;
  terms: string;
  isNew: boolean;
  discount: string;
  minOrder?: number;
  maxDiscount?: number;
  image?: string;
  backgroundColor: string;
}

interface Reward {
  id: string;
  title: string;
  points: number;
  description: string;
  expiryDate: string;
  image?: string;
  backgroundColor: string;
  isNew?: boolean;
}

const PromotionsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("available");
  const [activeSection, setActiveSection] = useState("promotions");
  const [promoCode, setPromoCode] = useState("");
  const [showTerms, setShowTerms] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const rewardsRef = useRef<HTMLDivElement>(null);

  // Check if we should scroll to rewards section based on URL hash
  useEffect(() => {
    if (location.hash === "#rewards") {
      setActiveSection("rewards");
      // Scroll to rewards section after a short delay to ensure rendering
      setTimeout(() => {
        rewardsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.hash]);

  // Sample promotions data
  const availablePromotions: Promotion[] = [
    {
      id: "promo1",
      code: "WELCOME20",
      description: "20% off your first order",
      expiryDate: "2023-12-31",
      terms:
        "Valid for new users only. Minimum order $15. Maximum discount $10.",
      isNew: true,
      discount: "20% OFF",
      minOrder: 15,
      maxDiscount: 10,
      backgroundColor: "bg-orange-100",
    },
    {
      id: "promo2",
      code: "FREESHIP",
      description: "Free delivery on all orders",
      expiryDate: "2023-11-30",
      terms: "Valid for all users. Minimum order $20.",
      isNew: false,
      discount: "FREE DELIVERY",
      minOrder: 20,
      backgroundColor: "bg-blue-100",
    },
    {
      id: "promo3",
      code: "SAVE10",
      description: "$10 off orders over $50",
      expiryDate: "2023-12-15",
      terms: "Valid for all users. Cannot be combined with other offers.",
      isNew: true,
      discount: "$10 OFF",
      minOrder: 50,
      backgroundColor: "bg-green-100",
    },
    {
      id: "promo4",
      code: "WEEKEND25",
      description: "25% off weekend orders",
      expiryDate: "2023-11-30",
      terms:
        "Valid only on Saturday and Sunday. Minimum order $25. Maximum discount $15.",
      isNew: false,
      discount: "25% OFF",
      minOrder: 25,
      maxDiscount: 15,
      backgroundColor: "bg-purple-100",
    },
  ];

  const usedPromotions: Promotion[] = [
    {
      id: "used1",
      code: "SUMMER15",
      description: "15% off summer specials",
      expiryDate: "2023-09-30",
      terms:
        "Was valid for all users. Minimum order $20. Maximum discount $12.",
      isNew: false,
      discount: "15% OFF",
      backgroundColor: "bg-gray-100",
    },
    {
      id: "used2",
      code: "BIRTHDAY10",
      description: "$10 off your birthday order",
      expiryDate: "2023-10-15",
      terms: "Was valid once per user during their birthday month.",
      isNew: false,
      discount: "$10 OFF",
      backgroundColor: "bg-gray-100",
    },
  ];

  // Sample rewards data
  const availableRewards: Reward[] = [
    {
      id: "reward1",
      title: "Free Delivery",
      points: 500,
      description: "Redeem for free delivery on your next order",
      expiryDate: "2023-12-31",
      backgroundColor: "bg-blue-100",
      isNew: true,
    },
    {
      id: "reward2",
      title: "$5 Off Coupon",
      points: 1000,
      description: "Get $5 off your next order over $20",
      expiryDate: "2023-12-31",
      backgroundColor: "bg-green-100",
    },
    {
      id: "reward3",
      title: "Free Dessert",
      points: 1500,
      description: "Enjoy a free dessert with your next meal",
      expiryDate: "2023-12-31",
      backgroundColor: "bg-yellow-100",
    },
    {
      id: "reward4",
      title: "Priority Delivery",
      points: 2000,
      description: "Get priority delivery on your next 3 orders",
      expiryDate: "2023-12-31",
      backgroundColor: "bg-purple-100",
      isNew: true,
    },
  ];

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.trim() === "") return;

    // Check if code exists in available promotions
    const promotion = availablePromotions.find(
      (promo) => promo.code.toLowerCase() === promoCode.toLowerCase(),
    );

    if (promotion) {
      // In a real app, this would apply the code to the user's account
      alert(`Promo code ${promotion.code} applied successfully!`);
      setPromoCode("");
    } else {
      alert("Invalid promo code. Please try again.");
    }
  };

  // Copy promo code to clipboard
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);

    // Reset copied status after 2 seconds
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Redeem reward
  const redeemReward = (reward: Reward) => {
    // In a real app, this would handle the reward redemption process
    alert(`You've redeemed: ${reward.title} for ${reward.points} points!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-3 p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <Logo />
            </div>
            <h1 className="text-xl font-bold">Promotions & Rewards</h1>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6">
          {/* Back button and title */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="mr-3 p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold">Promotions & Rewards</h1>
          </div>

          {/* Section Tabs */}
          <Tabs
            defaultValue={activeSection}
            value={activeSection}
            onValueChange={setActiveSection}
            className="w-full mb-6"
          >
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-4">
              <TabsTrigger
                value="promotions"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
              >
                Promotions
              </TabsTrigger>
              <TabsTrigger
                value="rewards"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
              >
                Rewards
              </TabsTrigger>
            </TabsList>

            {/* Promotions Section */}
            <TabsContent value="promotions" className="mt-0">
              {/* Apply Promo Code */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="font-semibold mb-4">Apply a Promo Code</h2>
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Enter promo code"
                    className="rounded-r-none"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button
                    className="rounded-l-none bg-orange-500 hover:bg-orange-600"
                    onClick={applyPromoCode}
                  >
                    Apply
                  </Button>
                </div>
              </div>

              {/* Promotions Tabs */}
              <Tabs
                defaultValue="available"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-4">
                  <TabsTrigger
                    value="available"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
                  >
                    Available
                  </TabsTrigger>
                  <TabsTrigger
                    value="used"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
                  >
                    Used & Expired
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="available" className="mt-0">
                  <div className="space-y-4">
                    {availablePromotions.map((promo) => (
                      <div
                        key={promo.id}
                        className={`${promo.backgroundColor} rounded-lg overflow-hidden relative`}
                      >
                        {promo.isNew && (
                          <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                            NEW
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">
                                {promo.discount}
                              </h3>
                              <p className="text-gray-700">
                                {promo.description}
                              </p>
                              <div className="flex items-center mt-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>
                                  Valid until {formatDate(promo.expiryDate)}
                                </span>
                              </div>
                              {promo.minOrder && (
                                <div className="flex items-center mt-1 text-sm text-gray-600">
                                  <Tag className="h-4 w-4 mr-1" />
                                  <span>Min. order ${promo.minOrder}</span>
                                  {promo.maxDiscount && (
                                    <span className="ml-2">
                                      • Max. discount ${promo.maxDiscount}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="bg-white px-3 py-2 rounded border border-gray-200 text-sm font-mono mb-2">
                                {promo.code}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center"
                                onClick={() => copyToClipboard(promo.code)}
                              >
                                {copiedCode === promo.code ? (
                                  "Copied!"
                                ) : (
                                  <>
                                    <Copy className="h-3 w-3 mr-1" />
                                    Copy
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button
                              variant="link"
                              size="sm"
                              className="text-xs p-0 h-auto flex items-center text-gray-600"
                              onClick={() => setShowTerms(promo.id)}
                            >
                              <Info className="h-3 w-3 mr-1" />
                              Terms & Conditions
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="used" className="mt-0">
                  <div className="space-y-4">
                    {usedPromotions.map((promo) => (
                      <div
                        key={promo.id}
                        className={`${promo.backgroundColor} rounded-lg overflow-hidden relative opacity-75`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm font-medium opacity-75">
                            EXPIRED
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">
                                {promo.discount}
                              </h3>
                              <p className="text-gray-700">
                                {promo.description}
                              </p>
                              <div className="flex items-center mt-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>
                                  Expired on {formatDate(promo.expiryDate)}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="bg-white px-3 py-2 rounded border border-gray-200 text-sm font-mono">
                                {promo.code}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Rewards Section */}
            <TabsContent
              value="rewards"
              className="mt-0"
              ref={rewardsRef}
              id="rewards"
            >
              {/* Points Summary */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-sm p-6 mb-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-xl mb-1">Your Points</h2>
                    <p className="text-orange-100">
                      Earn points with every order
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">2,450</div>
                    <p className="text-orange-100">Available Points</p>
                  </div>
                </div>
              </div>

              {/* Available Rewards */}
              <h2 className="font-semibold text-xl mb-4 flex items-center">
                <Gift className="h-5 w-5 mr-2 text-orange-500" />
                Available Rewards
              </h2>
              <div className="space-y-4 mb-8">
                {availableRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className={`${reward.backgroundColor} rounded-lg overflow-hidden relative`}
                  >
                    {reward.isNew && (
                      <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                        NEW
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{reward.title}</h3>
                          <p className="text-gray-700">{reward.description}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              Valid until {formatDate(reward.expiryDate)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="bg-white px-3 py-2 rounded-full border border-gray-200 text-sm font-bold text-orange-500 mb-2">
                            {reward.points} Points
                          </div>
                          <Button
                            className="bg-orange-500 hover:bg-orange-600"
                            size="sm"
                            onClick={() => redeemReward(reward)}
                          >
                            Redeem
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* How to Earn Points */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="font-semibold text-xl mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  How to Earn Points
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Trophy className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Place Orders</h3>
                      <p className="text-gray-600 text-sm">
                        Earn 10 points for every $1 spent on orders
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Star className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Write Reviews</h3>
                      <p className="text-gray-600 text-sm">
                        Earn 50 points for each review you write
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <Gift className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Refer Friends</h3>
                      <p className="text-gray-600 text-sm">
                        Earn 200 points for each friend who signs up and places
                        their first order
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Terms & Conditions</h3>
              <button
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={() => setShowTerms(null)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="text-gray-700">
              <p>
                {
                  availablePromotions.find((promo) => promo.id === showTerms)
                    ?.terms
                }
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Bizibyte reserves the right to modify or cancel promotions at
                any time without notice.
              </p>
            </div>
            <Button
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600"
              onClick={() => setShowTerms(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar - Mobile Only */}
      <div className="md:hidden">
        <BottomNavBar />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PromotionsScreen;
