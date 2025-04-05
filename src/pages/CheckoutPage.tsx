import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, MapPin, CreditCard, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

interface DeliveryAddress {
  street: string;
  unit?: string;
  city: string;
  instructions?: string;
}

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'delivery' | 'payment' | 'review'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    street: '12 Roncroft Dr',
    city: 'Toronto',
  });
  
  // Sample payment methods
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card1');
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: '12',
      expiryYear: '24'
    },
    {
      id: 'card2',
      type: 'card',
      last4: '8888',
      brand: 'Mastercard',
      expiryMonth: '09',
      expiryYear: '25'
    }
  ];

  // Sample order details
  const orderDetails = {
    subtotal: 59.94,
    deliveryFee: 4.99,
    tax: 7.79,
    total: 72.72,
    estimatedDeliveryTime: '30-45'
  };

  const handleBack = () => {
    if (step === 'delivery') {
      navigate('/cart');
    } else if (step === 'payment') {
      setStep('delivery');
    } else {
      setStep('payment');
    }
  };

  const handleNext = () => {
    if (step === 'delivery') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('review');
    } else {
      // Handle order submission
      console.log('Order submitted');
      navigate('/order-confirmation');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4"
            onClick={handleBack}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-semibold">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <div className={`h-1 ${step === 'delivery' ? 'bg-orange-500' : 'bg-orange-200'}`} />
          </div>
          <div className="flex-1">
            <div className={`h-1 ${step === 'payment' ? 'bg-orange-500' : 'bg-orange-200'}`} />
          </div>
          <div className="flex-1">
            <div className={`h-1 ${step === 'review' ? 'bg-orange-500' : 'bg-orange-200'}`} />
          </div>
        </div>

        {/* Delivery Details Step */}
        {step === 'delivery' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Delivery Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address
                </label>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">{deliveryAddress.street}</p>
                    <p className="text-sm text-gray-500">{deliveryAddress.city}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                    onClick={() => {/* Handle address change */}}
                  >
                    Change
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apartment/Suite/Unit
                </label>
                <Input
                  type="text"
                  placeholder="Optional"
                  value={deliveryAddress.unit || ''}
                  onChange={(e) => setDeliveryAddress(prev => ({ ...prev, unit: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Instructions
                </label>
                <Textarea
                  placeholder="Add any special instructions for delivery"
                  value={deliveryAddress.instructions || ''}
                  onChange={(e) => setDeliveryAddress(prev => ({ ...prev, instructions: e.target.value }))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Payment Method</h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer ${
                    selectedPaymentMethod === method.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium">
                          {method.brand} ending in {method.last4}
                        </p>
                        <p className="text-sm text-gray-500">
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className={`h-4 w-4 rounded-full border-2 ${
                      selectedPaymentMethod === method.id
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300'
                    }`} />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => {/* Handle add payment method */}}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </div>
        )}

        {/* Review Step */}
        {step === 'review' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Review Order</h2>
            
            {/* Delivery Info */}
            <div className="border-b pb-4 mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Delivery Address</h3>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">{deliveryAddress.street}</p>
                  {deliveryAddress.unit && (
                    <p className="text-gray-600">Unit {deliveryAddress.unit}</p>
                  )}
                  <p className="text-gray-600">{deliveryAddress.city}</p>
                  {deliveryAddress.instructions && (
                    <p className="text-gray-600 mt-1">{deliveryAddress.instructions}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Estimated Time */}
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium">Estimated Delivery Time</p>
                  <p className="text-gray-600">{orderDetails.estimatedDeliveryTime} minutes</p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border-b pb-4 mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Method</h3>
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  {paymentMethods.map(method => {
                    if (method.id === selectedPaymentMethod) {
                      return (
                        <p key={method.id} className="font-medium">
                          {method.brand} ending in {method.last4}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">${orderDetails.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${orderDetails.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleNext}
          >
            {step === 'review' ? 'Place Order' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
} 