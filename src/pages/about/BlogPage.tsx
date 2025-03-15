import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Calendar, ArrowRight } from "lucide-react";
import Logo from "../../components/layout/Logo";
import { Input } from "../../components/ui/input";
import Footer from "../../components/layout/Footer";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
}

const BlogPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - in a real app, this would come from an API
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Bizibyte Expands to 50 New Cities",
      excerpt: "We're excited to announce our expansion into 50 new cities, bringing our delicious food delivery service to more customers than ever before.",
      category: "Company News",
      date: "March 15, 2024",
      author: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "2",
      title: "How We're Making Food Delivery More Sustainable",
      excerpt: "Learn about our initiatives to reduce environmental impact and promote sustainable practices in food delivery.",
      category: "Sustainability",
      date: "March 10, 2024",
      author: "Michael Chen",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "3",
      title: "Supporting Local Restaurants During Peak Hours",
      excerpt: "Discover how our technology helps restaurants manage high-volume orders and maintain quality service.",
      category: "Technology",
      date: "March 5, 2024",
      author: "David Smith",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "4",
      title: "Meet Our Delivery Partners: Stories of Success",
      excerpt: "Read inspiring stories from our delivery partners and learn how they've grown with Bizibyte.",
      category: "Community",
      date: "March 1, 2024",
      author: "Emily Rodriguez",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-xl font-bold">Company Blog</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Latest Updates from Bizibyte</h1>
          
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search blog posts"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="md:flex">
                  <div className="md:w-64 h-48 md:h-auto">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <div className="mx-2">•</div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <button
                        onClick={() => navigate(`/blog/${post.id}`)}
                        className="flex items-center text-orange-500 hover:text-orange-600"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">No blog posts found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage; 