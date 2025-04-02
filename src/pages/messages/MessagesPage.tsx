import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, Image, Smile, Paperclip, Bell, MoreVertical } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface Message {
  id: string;
  sender: string;
  senderType: 'admin' | 'store' | 'driver' | 'user';
  avatar: string;
  content: string;
  timestamp: string;
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  }[];
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  type: 'admin' | 'store' | 'driver' | 'user';
  lastMessage: string;
  timestamp: string;
  unread: number;
  online?: boolean;
}

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [notifications, setNotifications] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Mock data for chats
  const chats: Chat[] = [
    {
      id: '1',
      name: 'Pizza Palace',
      avatar: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
      type: 'store',
      lastMessage: 'Your order is being prepared',
      timestamp: '10:30 AM',
      unread: 2,
      online: true,
    },
    {
      id: '2',
      name: 'John (Driver)',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
      type: 'driver',
      lastMessage: 'I am 5 minutes away',
      timestamp: 'Yesterday',
      unread: 0,
      online: true,
    },
    {
      id: '3',
      name: 'Support Team',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
      type: 'admin',
      lastMessage: 'How can we help you today?',
      timestamp: '2 days ago',
      unread: 1,
      online: false,
    },
  ];

  // Mock messages for the selected chat
  const messages: Message[] = [
    {
      id: '1',
      sender: 'Pizza Palace',
      senderType: 'store',
      avatar: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
      content: 'Your order is being prepared',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      sender: 'You',
      senderType: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      content: 'Great, thank you! How long will it take?',
      timestamp: '10:31 AM',
    },
    {
      id: '3',
      sender: 'Pizza Palace',
      senderType: 'store',
      avatar: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
      content: 'It should be ready in about 15-20 minutes',
      timestamp: '10:32 AM',
      attachments: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
          name: 'pizza-preparation.jpg',
        },
      ],
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
      setIsTyping(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically upload the file to your backend
      console.log('Uploading file:', file);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setNewMessage(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-12 h-[calc(100vh-12rem)]">
          {/* Chat List */}
          <div className="col-span-4 border-r border-gray-200">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Messages</h2>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search messages..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedChat === chat.id ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="relative">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {chat.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <span className="ml-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="col-span-8 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={chats.find(c => c.id === selectedChat)?.avatar}
                          alt="Chat"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {chats.find(c => c.id === selectedChat)?.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold">
                          {chats.find(c => c.id === selectedChat)?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {isTyping ? 'Typing...' : chats.find(c => c.id === selectedChat)?.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleNotifications}
                        className={`hover:bg-gray-100 ${notifications ? 'text-orange-500' : 'text-gray-500'}`}
                      >
                        <Bell className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'You' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`flex items-start max-w-[70%] ${
                          message.sender === 'You' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <img
                          src={message.avatar}
                          alt={message.sender}
                          className="w-8 h-8 rounded-full object-cover mx-2"
                        />
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === 'You'
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100'
                          }`}
                        >
                          <p>{message.content}</p>
                          {message.attachments?.map((attachment, index) => (
                            <div key={index} className="mt-2">
                              {attachment.type === 'image' ? (
                                <img
                                  src={attachment.url}
                                  alt={attachment.name}
                                  className="rounded-lg max-w-xs"
                                />
                              ) : (
                                <div className="flex items-center gap-2 bg-white rounded p-2">
                                  <Paperclip className="h-4 w-4" />
                                  <span>{attachment.name}</span>
                                </div>
                              )}
                            </div>
                          ))}
                          <span className="text-xs text-gray-500 mt-1 block">
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => fileInputRef.current?.click()}
                      className="hover:bg-gray-100"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => fileInputRef.current?.click()}
                      className="hover:bg-gray-100"
                    >
                      <Image className="h-5 w-5" />
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                          setIsTyping(true);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      >
                        <Smile className="h-5 w-5 text-gray-500" />
                      </Button>
                      {showEmojiPicker && (
                        <div className="absolute bottom-full right-0 mb-2">
                          <Picker
                            data={data}
                            onEmojiSelect={handleEmojiSelect}
                            theme="light"
                          />
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-600">
                    Select a chat to start messaging
                  </h3>
                  <p className="text-gray-500">
                    Choose from your conversations on the left
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 