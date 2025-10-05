import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectTotalAmount } from "../app/CartSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";
// Note: In a real production environment, you would use the Paystack SDK on the backend
// For frontend demonstration purposes, we're showing how it would be integrated

const Checkout = ({ onCheckoutToggle, onBackToCart }) => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const dispatch = useDispatch();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("whatsapp"); // default to whatsapp
  const [orderNote, setOrderNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleWhatsAppCheckout = () => {
    // Format order details for WhatsApp
    let message = `*New Order from Nike Store*\n\n`;
    message += `*Customer Information:*\n`;
    message += `Name: ${customerInfo.name}\n`;
    message += `Email: ${customerInfo.email}\n`;
    message += `Phone: ${customerInfo.phone}\n`;
    message += `Address: ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}\n\n`;
    
    message += `*Order Items:*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.title} - Qty: ${item.cartQuantity} - $${item.price * item.cartQuantity}\n`;
    });
    
    message += `\n*Total Amount: $${totalAmount}*\n`;
    
    if (orderNote) {
      message += `\n*Order Note:*\n${orderNote}\n`;
    }
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    // TODO: Replace with actual business WhatsApp number
    const whatsappUrl = `https://wa.me/1234567890?text=${encodedMessage}`; // Replace with actual business number
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
    
    // Show success message
    alert("Order details sent via WhatsApp! Our team will contact you shortly to confirm your order.");
    
    // In a real application, you would send this data to your backend
    // For now, we'll just reset the form
    setCustomerInfo({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    });
    
    // Close the checkout
    onCheckoutToggle();
  };

  const handlePaystackCheckout = () => {
    // Show loading state
    setIsLoading(true);
    
    // In a real production environment, you would:
    // 1. Send customer data to your backend
    // 2. Your backend would initialize a Paystack transaction
    // 3. Your backend would return the authorization URL
    // 4. Redirect the user to that URL
    
    // For demonstration purposes, we'll simulate this process
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate backend response with Paystack authorization URL
      // In reality, this URL would come from your backend after initializing the transaction
      const paystackUrl = `https://checkout.paystack.com/example_transaction_id`;
      
      // Redirect to Paystack
      window.location.href = paystackUrl;
    }, 1500);
  };

  const handleCheckout = async () => {
    // Validate required fields
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || 
        !customerInfo.address || !customerInfo.city || !customerInfo.state) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate phone format (simple validation)
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(customerInfo.phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (paymentMethod === "whatsapp") {
      handleWhatsAppCheckout();
    } else if (paymentMethod === "paystack") {
      handlePaystackCheckout();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 blur-effect-theme w-full h-screen opacity-100 z-[400]">
      <div className="blur-effect-theme h-screen max-w-2xl w-full absolute right-0 overflow-y-auto">
        <div className="bg-white h-11 flex items-center justify-between px-3 sticky top-0 left-0 right-0 w-full z-10">
          <h1 className="text-base font-normal text-slate-900">Checkout</h1>
          <button
            type="button"
            onClick={onCheckoutToggle}
            className="bg-theme-cart rounded active:scale-90"
          >
            <XMarkIcon className="h-5 w-5 text-white stroke-[2]" />
          </button>
        </div>

        <div className="p-5">
          {/* Order Summary */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="border rounded-lg p-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.cartQuantity}</p>
                  </div>
                  <p className="font-medium">${item.price * item.cartQuantity}</p>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <h3 className="text-lg font-bold">Total</h3>
                <p className="text-lg font-bold">${totalAmount}</p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={customerInfo.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12345"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main St"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="New York"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                <input
                  type="text"
                  name="state"
                  value={customerInfo.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="NY"
                  required
                />
              </div>
            </div>
          </div>

          {/* Order Notes */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Order Notes (Optional)</h2>
            <textarea
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Special instructions for your order..."
            ></textarea>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === "whatsapp"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => handlePaymentMethodChange("whatsapp")}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                    paymentMethod === "whatsapp" ? "border-blue-500" : "border-gray-300"
                  }`}>
                    {paymentMethod === "whatsapp" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">WhatsApp</h3>
                    <p className="text-sm text-gray-600">Send order details via WhatsApp</p>
                  </div>
                </div>
              </div>
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === "paystack"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => handlePaymentMethodChange("paystack")}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                    paymentMethod === "paystack" ? "border-blue-500" : "border-gray-300"
                  }`}>
                    {paymentMethod === "paystack" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">Paystack</h3>
                    <p className="text-sm text-gray-600">Secure online payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-bold text-yellow-800 mb-2">Security Notice</h3>
            <p className="text-sm text-yellow-700">
              All payment information is securely processed. We never store your payment details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onBackToCart}
              className="flex-1 button-theme bg-gray-200 text-gray-800 hover:bg-gray-300"
              disabled={isLoading}
            >
              Back to Cart
            </button>
            <button
              type="button"
              onClick={handleCheckout}
              className="flex-1 button-theme bg-theme-cart text-white flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                paymentMethod === "whatsapp" ? "Send via WhatsApp" : "Proceed to Payment"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;