import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, MapPin, Bell, Lock, CreditCard, LogOut, ChevronRight, Share2, MessageSquare, Globe } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { motion } from 'framer-motion';

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

  const categories = [
    'All Categories', 'Breakfast & Brunch', 'Desserts', 'Salad', 'Soup', 'Snack', 'Drink'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
              <div className="w-32 h-32 bg-white rounded-2xl shadow-xl p-1">
                <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl overflow-hidden">
                  <img
                    src="https://via.placeholder.com/128"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 p-2.5 bg-orange-500 rounded-xl text-white hover:bg-orange-600 shadow-lg transform transition-transform hover:scale-105">
                  <Camera size={18} />
                </button>
              </div>
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
            <Button variant="outline" className="bg-white hover:bg-gray-50">
              <Share2 size={18} className="mr-2" />
              Share
            </Button>
            <Button variant="outline" className="bg-white hover:bg-gray-50">
              <MessageSquare size={18} className="mr-2" />
              Message
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

        {/* Categories */}
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-4">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? "default" : "outline"}
              className={index === 0 ? "bg-orange-500 hover:bg-orange-600" : "bg-white hover:bg-gray-50"}
            >
              {category}
            </Button>
          ))}
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
            <motion.div 
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/addresses"
                  className="flex items-center justify-between p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors group"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-500 rounded-lg text-white">
                      <MapPin size={20} />
                    </div>
                    <span className="ml-3 font-medium">Manage Addresses</span>
                  </div>
                  <ChevronRight className="text-orange-500 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/payment-methods"
                  className="flex items-center justify-between p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors group"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-500 rounded-lg text-white">
                      <CreditCard size={20} />
                    </div>
                    <span className="ml-3 font-medium">Payment Methods</span>
                  </div>
                  <ChevronRight className="text-orange-500 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/change-password"
                  className="flex items-center justify-between p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors group"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-500 rounded-lg text-white">
                      <Lock size={20} />
                    </div>
                    <span className="ml-3 font-medium">Change Password</span>
                  </div>
                  <ChevronRight className="text-orange-500 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

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
    </div>
  );
};

export default ProfilePage; 