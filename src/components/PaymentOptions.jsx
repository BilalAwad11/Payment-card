import React, { useState } from 'react';

export default function CheckoutForm() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullForm, setIsFullForm] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to trigger success screen

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
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const onlyNums = value.replace(/\D/g, '');
      const limitedNums = onlyNums.slice(0, 16);
      const formattedCard = limitedNums.replace(/(\d{4})(?=\d)/g, '$1 ');
      setFormData(prev => ({ ...prev, [name]: formattedCard }));
      return;
    }

    if (['securityCode', 'phone', 'state', 'zipCode'].includes(name)) {
      const numericValue = value.replace(/\D/g, '');
      if (name === 'securityCode' && numericValue.length > 4) return;
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request and show success message
    setIsSubmitted(true);
  };

  const handleReset = () => {
    // Reset form states to test again
    setFormData({
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
    setIsSubmitted(false);
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-300 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-100'}`}>
      
      {/* Dev Switchers */}
      <div className="mb-6 flex gap-4 text-xs font-sans bg-white dark:bg-zinc-800 p-2 rounded-lg shadow-sm z-10">
        <button type="button" onClick={() => setIsDarkMode(!isDarkMode)} className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-700 rounded text-zinc-800 dark:text-zinc-200 font-medium">
          Toggle {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        {!isSubmitted && (
          <button type="button" onClick={() => setIsFullForm(!isFullForm)} className="px-3 py-1.5 bg-blue-600 text-white rounded font-medium">
            Switch to {isFullForm ? 'Compact View' : 'Full Form'}
          </button>
        )}
      </div>

      {/* Main Container Card */}
      <div className={`w-full ${isFullForm && !isSubmitted ? 'max-w-md md:max-w-2xl' : 'max-w-md'} font-sans transition-all duration-300 ${isDarkMode ? 'bg-[#141414] text-white' : 'bg-white text-black'} p-6 md:p-8 rounded-xl shadow-lg`}>
        
        {/* SUCCESS STATE UI (Inspired by Screenshot 2026-06-05 180402.png) */}
        {isSubmitted ? (
          <div className="flex flex-col items-center text-center py-6 animate-fadeIn">
            
            {/* Minimalist Mail/Success Graphic */}
            <div className={`relative w-24 h-24 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-black'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              {/* Floating Green Success Badge */}
              <div className="absolute top-1 right-1 bg-emerald-500 text-white p-1.5 rounded-full border-4 ${isDarkMode ? 'border-[#141414]' : 'border-white'}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </div>

            {/* Success Heading Text */}
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
              Your payment has been successfully scheduled.
            </h2>
            
            {/* Descriptive Note */}
            <p className={`text-sm max-w-xs mb-8 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              After we receive the payment, you will receive a confirmation to the e-mail specified during registration.
            </p>

            {/* Inverted Call to Actions to look elegant */}
            <div className="w-full space-y-3 sm:space-y-0 sm:flex sm:gap-3 justify-center mb-8">
              <button 
                type="button" 
                className={`w-full sm:w-auto px-6 py-3 text-xs font-semibold rounded-lg border tracking-wider transition-all active:scale-[0.98] ${isDarkMode ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                Print Receipt
              </button>
              <button 
                type="button" 
                className={`w-full sm:w-auto px-6 py-3 text-xs font-semibold rounded-lg tracking-wider transition-all active:scale-[0.98] ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'}`}
              >
                See Scheduled Payments
              </button>
            </div>

            {/* Bottom Accent Banner (Autopay box variant matching design aesthetics) */}
            <div className={`w-full p-4 rounded-xl border flex gap-3 text-left items-start ${isDarkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-gray-200 bg-gray-50'}`}>
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-zinc-800 text-emerald-400' : 'bg-white text-emerald-600 shadow-sm'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
              </div>
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Autopay saves time. You can set it and forget it and we will automatically initiate payments. <button type="button" className="underline font-semibold hover:opacity-80">set up autopay</button>?
              </p>
            </div>

            {/* Dev Reset Link */}
            <button onClick={handleReset} type="button" className="mt-6 text-xs text-zinc-400 underline hover:text-zinc-600">
              Go back / Test Form again
            </button>

          </div>
        ) : (
          
          /* ORIGINAL FORM STATE */
          <>
            <div className="relative flex items-center justify-center mb-6">
              {!isFullForm && (
                <button type="button" className="absolute left-0 text-xl hover:opacity-70 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
              )}
              <h2 className="text-xl font-semibold tracking-wide md:text-2xl">Credit Card Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              {/* Card Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`border rounded-lg p-3 md:col-span-2 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                  <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Name on card</label>
                  <input required type="text" name="nameOnCard" value={formData.nameOnCard} onChange={handleChange} placeholder="Meet Patel" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                </div>

                <div className={`border rounded-lg p-3 md:col-span-2 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                  <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Card number</label>
                  <input required type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                </div>

                <div className="md:col-span-1">
                  {isFullForm ? (
                    <div className={`border rounded-lg p-3 h-full flex items-center justify-between ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                      <div className="w-1/2 pr-2">
                        <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Card expiration</label>
                        <select required name="expMonth" value={formData.expMonth} onChange={handleChange} className="w-full bg-transparent focus:outline-none text-sm text-zinc-400 cursor-pointer"><option value="">Month</option><option value="01">01</option></select>
                      </div>
                      <div className={`h-8 w-[1px] ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-300'}`}></div>
                      <div className="w-1/2 pl-4">
                        <label className="block text-xs font-medium mb-1 opacity-0">Year</label>
                        <select required name="expYear" value={formData.expYear} onChange={handleChange} className="w-full bg-transparent focus:outline-none text-sm text-zinc-400 cursor-pointer"><option value="">Year</option><option value="2026">2026</option></select>
                      </div>
                    </div>
                  ) : (
                    <div className={`border rounded-lg p-3 flex justify-between items-center ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                      <div className="w-full">
                        <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Card expiration</label>
                        <select required name="expMonth" value={formData.expMonth} onChange={handleChange} className="w-full bg-transparent focus:outline-none text-sm text-zinc-400 cursor-pointer"><option value="">Month</option><option value="01">01</option></select>
                      </div>
                    </div>
                  )}
                </div>

                {!isFullForm && (
                  <div className={`border rounded-lg p-3 flex justify-between items-center ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                    <div className="w-full pt-4">
                      <select required name="expYear" value={formData.expYear} onChange={handleChange} className="w-full bg-transparent focus:outline-none text-sm text-zinc-400 cursor-pointer"><option value="">Year</option><option value="2026">2026</option></select>
                    </div>
                  </div>
                )}

                <div className={`border rounded-lg p-3 flex items-center justify-between md:col-span-1 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                  <div className="flex-1">
                    <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Card Security Code</label>
                    <input required type="text" name="securityCode" value={formData.securityCode} onChange={handleChange} placeholder="Code" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                  </div>
                  <button type="button" className="text-zinc-400 hover:text-zinc-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
                  </button>
                </div>
              </div>

              {/* Billing / Contact Responsive Section */}
              {isFullForm && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold tracking-wide">Billing address</h3>
                    <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                      <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Country</label>
                      <select required name="country" value={formData.country} onChange={handleChange} className="w-full bg-transparent focus:outline-none text-sm text-zinc-400 cursor-pointer"><option value="">Country</option><option value="US">United States</option></select>
                    </div>
                    <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                      <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Address</label>
                      <input required type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                        <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>City</label>
                        <input required type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                      </div>
                      <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                        <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>State</label>
                        <input required type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                      </div>
                    </div>
                    <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                      <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>ZIP CODE</label>
                      <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="ZIP CODE" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold tracking-wide">Contact information</h3>
                    <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                      <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Email</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                    </div>
                    <div className={`border rounded-lg p-3 ${isDarkMode ? 'border-zinc-800 bg-[#1a1a1a]' : 'border-gray-300 bg-white'}`}>
                      <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>Phone</label>
                      <input required type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full bg-transparent focus:outline-none text-sm placeholder-zinc-400" />
                    </div>
                  </div>
                </div>
              )}

              {/* Fixed Solid Themed Action Button */}
              <button 
                type="submit" 
                className={`w-full py-4 mt-4 font-medium rounded-lg text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer
                  ${isDarkMode 
                    ? 'bg-white text-black hover:bg-zinc-200' 
                    : 'bg-black text-white hover:bg-zinc-900'
                  }`}
              >
                {isFullForm ? 'Pay' : 'Continue'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}