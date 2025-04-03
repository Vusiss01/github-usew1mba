import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, MapPin, Bell, Lock, CreditCard, LogOut, ChevronRight, Share2, MessageSquare, Globe, User, Mail, Phone, Coffee, Cake, Salad, Soup, Cookie, MessageCircle, Calendar, UtensilsCrossed, Utensils } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { motion } from 'framer-motion';
import ShareProfile from '../../components/ShareProfile';

interface PurchaseCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

interface PurchasedMeal {
  id: string;
  name: string;
  category: string;
  restaurant: string;
  date: string;
  price: number;
  imageUrl: string;
}

const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, City, Country',
    bio: 'Seasonal, regional & 80% vegetarian - that\'s my approach. I\'m happy if I can inspire you with my recipes.',
    followers: '12K',
    following: '12',
    notifyOrder: true,
    notifyPromotions: true,
    notifyDelivery: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&h=250&q=80');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // TODO: Implement profile update logic
    console.log('Profile updated:', profileData);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openImageUploadDialog = () => {
    const dialog = document.createElement('dialog');
    dialog.className = 'p-4 rounded-lg shadow-lg bg-white';
    dialog.innerHTML = `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-center">Upload Profile Picture</h3>
        <div class="flex justify-center space-x-4">
          <button id="camera-btn" class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Take Photo
          </button>
          <button id="upload-btn" class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Choose File
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
    dialog.showModal();

    dialog.querySelector('#camera-btn')?.addEventListener('click', () => {
      cameraInputRef.current?.click();
      dialog.close();
    });

    dialog.querySelector('#upload-btn')?.addEventListener('click', () => {
      fileInputRef.current?.click();
      dialog.close();
    });

    dialog.addEventListener('close', () => {
      document.body.removeChild(dialog);
    });
  };

  const categories: PurchaseCategory[] = [
    { id: 'breakfast', name: 'Breakfast & Brunch', icon: <Coffee className="w-5 h-5" />, count: 15 },
    { id: 'desserts', name: 'Desserts', icon: <Cake className="w-5 h-5" />, count: 8 },
    { id: 'salads', name: 'Salads', icon: <Salad className="w-5 h-5" />, count: 6 },
    { id: 'soups', name: 'Soups', icon: <Soup className="w-5 h-5" />, count: 4 },
    { id: 'snacks', name: 'Snacks', icon: <Cookie className="w-5 h-5" />, count: 12 },
  ];

  // Mock data for purchased meals
  const purchasedMeals: PurchasedMeal[] = [
    {
      id: '1',
      name: 'Classic Pancakes',
      category: 'breakfast',
      restaurant: "Morning Delight Cafe",
      date: '2024-03-15',
      price: 12.99,
      imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
    },
    {
      id: '2',
      name: 'Chocolate Cake',
      category: 'desserts',
      restaurant: "Sweet Treats Bakery",
      date: '2024-03-14',
      price: 8.99,
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    },
    // Add more mock data as needed
  ];

  const filteredMeals = selectedCategory 
    ? purchasedMeals.filter(meal => meal.category === selectedCategory)
    : purchasedMeals;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Top Action Buttons */}
        <div className="flex justify-end space-x-4 mb-6">
          <Button
            onClick={() => navigate('/messages')}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            <MessageCircle className="h-4 w-4" />
            Messages
          </Button>
          <Button
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Share2 className="h-4 w-4" />
            Share Profile
          </Button>
        </div>

        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="h-48 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl shadow-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80"
              alt="Cover"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
          </div>
          <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={openImageUploadDialog}
                className="absolute bottom-0 right-0 p-2 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4 text-white">
              <h1 className="text-3xl font-bold">{profileData.fullName}</h1>
              <p className="text-orange-100 mt-1">Team Bizibyte</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm">{profileData.followers} Followers</span>
                <span className="text-sm">{profileData.following} Following</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-16 right-8 flex items-center gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white"
              onClick={() => navigate('/profile/addresses')}
            >
              <MapPin className="h-4 w-4" />
              Manage Addresses
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white"
              onClick={() => navigate('/profile/payment-methods')}
            >
              <CreditCard className="h-4 w-4" />
              Payment Methods
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white"
              onClick={() => navigate('/profile/change-password')}
            >
              <Lock className="h-4 w-4" />
              Change Password
            </Button>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-20 mb-8">
          <p className="text-gray-600 max-w-2xl">{profileData.bio}</p>
          <div className="flex items-center gap-6 mt-4">
            <a href="#" className="flex items-center text-gray-600 hover:text-orange-500">
              <Globe size={16} className="mr-2" />
              www.bizibyte.com
            </a>
          </div>
        </div>

        {/* Purchase History Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Purchase History</h2>
          
          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {categories.map(category => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                className={`p-4 rounded-xl border transition-all ${
                  category.id === selectedCategory
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-500 hover:bg-orange-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-full mb-2 ${
                    category.id === selectedCategory ? 'bg-orange-500 text-white' : 'bg-gray-100'
                  }`}>
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                  <span className="text-sm text-gray-500">{category.count} items</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Meals Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMeals.map(meal => (
              <motion.div
                key={meal.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -4 }}
              >
                <div className="aspect-square relative">
                  <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">{meal.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{meal.restaurant}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {new Date(meal.date).toLocaleDateString()}
                    </span>
                    <span className="font-medium text-orange-500">
                      ${meal.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMeals.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChevronRight className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No purchases found</h3>
              <p className="text-gray-500 mt-1">
                You haven't made any purchases in this category yet.
              </p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <motion.div 
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <Button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-orange-50 text-orange-600 hover:bg-orange-100"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Bio</label>
                    <Input
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div 
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                <label className="flex items-center p-3 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifyOrder"
                    checked={profileData.notifyOrder}
                    onChange={handleChange}
                    className="h-5 w-5 text-orange-500 focus:ring-orange-500 border-gray-300 rounded-lg"
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900">Order status updates</span>
                    <p className="text-xs text-gray-500">Get notified about your order status changes</p>
                  </div>
                </label>
                <label className="flex items-center p-3 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifyDelivery"
                    checked={profileData.notifyDelivery}
                    onChange={handleChange}
                    className="h-5 w-5 text-orange-500 focus:ring-orange-500 border-gray-300 rounded-lg"
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900">Delivery notifications</span>
                    <p className="text-xs text-gray-500">Track your order in real-time</p>
                  </div>
                </label>
                <label className="flex items-center p-3 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifyPromotions"
                    checked={profileData.notifyPromotions}
                    onChange={handleChange}
                    className="h-5 w-5 text-orange-500 focus:ring-orange-500 border-gray-300 rounded-lg"
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900">Promotions and offers</span>
                    <p className="text-xs text-gray-500">Stay updated with latest deals and discounts</p>
                  </div>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Quick Actions</h2>
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => navigate('/profile/preferred-diet')}
                  className="flex items-center rounded-lg p-3 transition-all hover:bg-orange-50/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50">
                    <Utensils className="h-6 w-6 text-orange-500" />
                  </div>
                  <span className="ml-4 text-base font-medium text-gray-900">Preferred Diet</span>
                  <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                </button>
                <button 
                  onClick={() => navigate('/profile/special-occasions')}
                  className="flex items-center rounded-lg p-3 transition-all hover:bg-orange-50/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50">
                    <Calendar className="h-6 w-6 text-orange-500" />
                  </div>
                  <span className="ml-4 text-base font-medium text-gray-900">Special Occasions</span>
                  <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                </button>
                <button 
                  onClick={() => navigate('/profile/catering')}
                  className="flex items-center rounded-lg p-3 transition-all hover:bg-orange-50/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50">
                    <UtensilsCrossed className="h-6 w-6 text-orange-500" />
                  </div>
                  <span className="ml-4 text-base font-medium text-gray-900">Catering</span>
                  <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <motion.div 
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-6">Account</h2>
              <button
                type="button"
                className="w-full flex items-center justify-between p-4 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group"
                onClick={() => {
                  // TODO: Implement logout logic
                  console.log('Logging out...');
                }}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-red-500 rounded-lg text-white">
                    <LogOut size={20} />
                  </div>
                  <span className="ml-3 font-medium">Log out</span>
                </div>
                <ChevronRight className="text-red-500 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <ShareProfile
        username="demo-user" // Replace with actual username
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};

export default ProfilePage; 