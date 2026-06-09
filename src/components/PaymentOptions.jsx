import React, { useState } from 'react';

export default function CheckoutForm() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullForm, setIsFullForm] = useState(true);

  const [formData, setFormData] = useState({
    nameOnCard: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    securityCode: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const { nameOnCard, cardNumber, expMonth, expYear, securityCode, country, address, city, state, zipCode, email, phone } = formData;
    const baseCardValid = nameOnCard.trim() && cardNumber.trim() && expMonth && expYear && securityCode.trim();
    
    if (!isFullForm) return baseCardValid;
    
    return baseCardValid && country && address.trim() && city.trim() && state.trim() && zipCode.trim() && email.trim() && phone.trim();
  };

  const valid = isFormValid();

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-300 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-100'}`}>
      
      {/* Configuration Switches */}
      <div className="mb-6 flex gap-4 text-xs font-sans bg-white dark:bg-zinc-800 p-2 rounded-lg shadow-sm z-10">
        <button type="button" onClick={() => setIsDarkMode(!isDarkMode)} className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-700 rounded text-zinc-800 dark:text-zinc-200 font-medium">
          Toggle {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button type="button" onClick={() => setIsFullForm(!isFullForm)} className="px-3 py-1.5 bg-blue-600 text-white rounded font-medium">
          Switch to {isFullForm ? 'Compact View' : 'Full Form'}
        </button>
      </div>

      {/* Responsive Container: max-w-md on mobile, expands up to max-w-2xl on desktop */}
      <div className={`w-full ${isFullForm ? 'max-w-md md:max-w-2xl' : 'max-w-md'} font-sans transition-all duration-300 ${isDarkMode ? 'bg-[#141414] text-white' : 'bg-white text-black'} p-6 md:p-8 rounded-xl shadow-lg`}>
        
        {/* Header */}
        <div className="relative flex items-center justify-center mb-6">
          {!isFullForm && (
            <button type="button" className="absolute left-0 text-xl hover:opacity-70 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
          )}
          <h2 className="text-xl font-semibold tracking-wide md:text-2xl">Credit Card Details</h2>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          
          {/* Payment Method Badge */}
          <div className={`border border-dashed p-4 rounded-lg flex items-center justify-between ${isDarkMode ? 'border-zinc-700' : 'border-gray-300'}`}>
            <span className="text-sm font-medium">Payment Method</span>
            <div className="flex gap-2 items-center">
              <div className="w-8 h-5 bg-amber-500 rounded-sm opacity-90 flex items-center justify-center text-[6px] text-white font-bold">MC</div>
              <div className="w-8 h-5 bg-blue-600 rounded-sm opacity-90 flex items-center justify-center text-[6px] text-white font-italic font-bold">VISA</div>
              <div className="w-8 h-5 bg-cyan-500 rounded-sm opacity-90 flex items-center justify-center text-[6px] text-white font-bold">AMEX</div>
              <div className="w-8 h-5 bg-gray-400 rounded-sm opacity-90 flex items-center justify-center text-[6px] text-white font-bold">DISC</div>
            </div>
          </div>

          {/* SECTION: Credit Card Inputs (Always unified layout grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`border rounded-lg p-3 md:col-span-2 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Name on card</label>
              <input type="text" name="nameOnCard" value={formData.nameOnCard} onChange={handleChange} placeholder="Meet Patel" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
            </div>

            <div className={`border rounded-lg p-3 md:col-span-2 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Card number</label>
              <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
            </div>

            {/* Expiration Split adaptation */}
            <div className="md:col-span-1">
              {isFullForm ? (
                <div className={`border rounded-lg p-3 h-full flex items-center justify-between ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                  <div className="w-1/2 pr-2">
                    <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Card expiration</label>
                    <select name="expMonth" value={formData.expMonth} onChange={handleChange} className="w-full bg-transparent focus:outline-none text-sm text-zinc-400 cursor-pointer"><option value="">Month</option><option value="01">01</option></select>
                  </div>
                  <div className={`h-8 w-[1px] ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-300'}`}></div>
                  <div className="w-1/2 pl-4">
                    <label className="block text-xs font-medium mb-1 opacity-0">Year</label>
                    <select name="expYear" value={formData.expYear} onChange={handleChange} className="w-full bg-transparent focus:outline-none text-sm text-zinc-400 cursor-pointer"><option value="">Year</option><option value="2026">2026</option></select>
                  </div>
                </div>
              ) : (
                <div className={`border rounded-lg p-3 flex justify-between items-center ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                  <div className="w-full">
                    <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Card expiration</label>
                    <select name="expMonth" value={formData.expMonth} onChange={handleChange} className="w-full bg-transparent focus:outline-none text-sm text-zinc-400 cursor-pointer"><option value="">Month</option></select>
                  </div>
                </div>
              )}
            </div>

            {!isFullForm && (
              <div className={`border rounded-lg p-3 flex justify-between items-center ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                <div className="w-full pt-4">
                  <select name="expYear" value={formData.expYear} onChange={handleChange} className="w-full bg-transparent focus:outline-none text-sm text-zinc-400 cursor-pointer"><option value="">Year</option></select>
                </div>
              </div>
            )}

            <div className={`border rounded-lg p-3 flex items-center justify-between md:col-span-1 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
              <div className="flex-1">
                <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Card Security Code</label>
                <input type="password" name="securityCode" value={formData.securityCode} onChange={handleChange} placeholder="Code" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
              </div>
              <button type="button" className="text-zinc-400 hover:text-zinc-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
              </button>
            </div>
          </div>

          {/* DESKTOP 2-COLUMN SPLIT FOR BILLING & CONTACT */}
          {isFullForm && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              
              {/* Billing Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold tracking-wide">Billing address</h3>
                
                <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                  <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Country</label>
                  <select name="country" value={formData.country} onChange={handleChange} className="w-full bg-transparent focus:outline-none text-sm text-zinc-400 cursor-pointer"><option value="">Country</option><option value="US">United States</option></select>
                </div>
                
                <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                  <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                    <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                  </div>
                  <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                    <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                  </div>
                </div>

                <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                  <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>ZIP CODE</label>
                  <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="ZIP CODE" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                </div>
              </div>

              {/* Contact Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold tracking-wide">Contact information</h3>
                
                <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                  <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                </div>
                
                <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                  <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                </div>
              </div>

            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={!valid}
            className={`w-full py-4 mt-4 font-medium rounded-lg text-sm tracking-wide transition-all duration-200
              ${!valid ? 'opacity-40 cursor-not-allowed scale-100' : 'opacity-100 cursor-pointer active:scale-[0.99]'}
              ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'}`}
          >
            {isFullForm ? 'Pay' : 'Continue'}
          </button>

        </form>
      </div>
    </div>
  );
}