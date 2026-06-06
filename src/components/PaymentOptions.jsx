import React, { useState } from "react";

// ==========================================
// 1. CONSTANTS & CONFIGURATION HELPERS
// ==========================================

// This map acts as our database for card brand UI themes.
// It makes adding new card types in the future incredibly easy.
const CARD_THEMES = {
  VISA: {
    name: "Visa",
    bgClass: "from-blue-900 via-indigo-950 to-slate-950",
    logo: <span className="text-xl font-black italic tracking-tight text-white select-none">Visa<span className="text-amber-400">.</span></span>
  },
  MASTERCARD: {
    name: "Mastercard",
    bgClass: "from-neutral-900 via-stone-900 to-neutral-950",
    logo: (
      <div className="flex items-center -space-x-2">
        <div className="w-6 h-6 rounded-full bg-red-500 opacity-95" />
        <div className="w-6 h-6 rounded-full bg-amber-500 opacity-90" />
      </div>
    )
  },
  AMEX: {
    name: "American Express",
    bgClass: "from-cyan-900 via-teal-950 to-slate-950",
    logo: <div className="border border-cyan-300/40 bg-cyan-500/10 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest text-cyan-200">AMEX</div>
  },
  DISCOVER: {
    name: "Discover",
    bgClass: "from-orange-900 via-stone-900 to-neutral-950",
    logo: <div className="flex items-center text-sm font-bold tracking-wider text-white">DISC<span className="w-2.5 h-2.5 mx-0.5 rounded-full bg-orange-500 inline-block" />VER</div>
  },
  UNKNOWN: {
    name: "Card",
    bgClass: "from-slate-850 via-slate-900 to-neutral-950",
    logo: (
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-400/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-400/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-400/20" />
      </div>
    )
  }
};

/**
 * Detects a credit card network based on its standard prefix numbers.
 */
const detectCardNetwork = (cardNumber) => {
  const digits = cardNumber.replace(/\s+/g, "");
  
  if (digits.startsWith("4")) return CARD_THEMES.VISA;
  if (/^(5[1-5]|2[2-7])/.test(digits)) return CARD_THEMES.MASTERCARD;
  if (/^3[47]/.test(digits)) return CARD_THEMES.AMEX;
  if (/^6(011|5)/.test(digits)) return CARD_THEMES.DISCOVER;
  
  return CARD_THEMES.UNKNOWN;
};


// ==========================================
// 2. MAIN COMPONENT EXPORT
// ==========================================

export default function LearnableCheckout() {
  // Navigation & Transaction States
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState(""); // Captures API/Simulated bank errors
  const [simulateFailure, setSimulateFailure] = useState(false); // Testing toggle button

  // Form Field Aggregation
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "",
    cardName: "", cardNumber: "", expiry: "", cvc: ""
  });

  // Calculate the active card details on every render cycle
  const cardType = detectCardNetwork(formData.cardNumber);

  // ==========================================
  // 3. INPUT EVENT FORMATTERS
  // ==========================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format fields dynamically as the user types
    if (name === "cardNumber") {
      const numbersOnly = value.replace(/\D/g, "");
      formattedValue = numbersOnly.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    } else if (name === "expiry") {
      const numbersOnly = value.replace(/\D/g, "");
      formattedValue = numbersOnly.length > 2 
        ? `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2, 4)}`
        : numbersOnly;
    } else if (name === "cvc" || name === "phone") {
      formattedValue = value.replace(/\D/g, "");
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));

    // Clear validation warnings immediately as the user edits the input field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    if (name === "cardNumber" || name === "cvc") {
      setPaymentError(""); 
    }
  };

  // ==========================================
  // 4. FORM DATA VALIDATION
  // ==========================================

  const validateShippingForm = () => {
    const localErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) localErrors.name = "We need your full name for delivery.";
    if (!emailPattern.test(formData.email)) localErrors.email = "Please use a valid email structure.";
    if (formData.phone.length < 7) localErrors.phone = "Enter a complete structural phone number.";
    if (!formData.address.trim()) localErrors.address = "Please provide your shipping destination.";

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const validatePaymentForm = () => {
    const localErrors = {};
    
    if (!formData.cardName.trim()) localErrors.cardName = "Name on card is mandatory.";
    if (formData.cardNumber.length < 15) localErrors.cardNumber = "Card numbers require 15-16 digits.";
    if (formData.expiry.length < 5) localErrors.expiry = "Provide expiry month and year (MM/YY).";
    if (formData.cvc.length < 3) localErrors.cvc = "Security codes require 3-4 digits.";

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  // ==========================================
  // 5. TRANSACTION SUBMISSION HANDLER
  // ==========================================

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!validatePaymentForm()) return;

    setIsSubmitting(true);
    setPaymentError("");

    // Simulate network server latency (2.0 seconds)
    setTimeout(() => {
      setIsSubmitting(false);

      if (simulateFailure) {
        // Triggers a human-like UI transaction fallback error state
        setPaymentError("Your card was declined. Please check your balance or try a different card.");
      } else {
        // Safe route to execution confirmation screen
        setStep(3);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* ==========================================
            LEFT SIDE: DYNAMIC WORKFLOW CONTAINER
           ========================================== */}
        <div className="p-6 sm:p-10 lg:col-span-7 flex flex-col justify-between">
          
          {/* Breadcrumb Stepper Navigation */}
          {step < 3 && (
            <nav className="flex items-center gap-3 mb-8 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span className={step === 1 ? "text-indigo-600 font-bold" : ""}>1. Shipping</span>
              <span>/</span>
              <span className={step === 2 ? "text-indigo-600 font-bold" : ""}>2. Payment</span>
            </nav>
          )}

          {/* STEP 1: USER SHIPPING REGISTRATION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Shipping Information</h2>
                <p className="text-sm text-slate-500 mt-1">Fill in your delivery context details below.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Jane Doe" className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl outline-none text-sm transition-all focus:bg-white focus:ring-2 ${errors.name ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-indigo-600 focus:ring-indigo-100"}`} />
                  {errors.name && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="jane@example.com" className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl outline-none text-sm transition-all focus:bg-white focus:ring-2 ${errors.email ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-indigo-600 focus:ring-indigo-100"}`} />
                    {errors.email && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="5551234567" className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl outline-none text-sm transition-all focus:bg-white focus:ring-2 ${errors.phone ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-indigo-600 focus:ring-indigo-100"}`} />
                    {errors.phone && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Street Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="742 Evergreen Terrace" className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl outline-none text-sm transition-all focus:bg-white focus:ring-2 ${errors.address ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-indigo-600 focus:ring-indigo-100"}`} />
                  {errors.address && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.address}</p>}
                </div>
              </div>

              <button type="button" onClick={() => validateShippingForm() && setStep(2)} className="w-full bg-slate-950 text-white font-semibold py-3.5 rounded-xl text-sm hover:bg-slate-800 transition-colors mt-4">
                Continue to Payment
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT CARD CONTEXT SUBMISSION */}
          {step === 2 && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Payment Details</h2>
                <p className="text-sm text-slate-500 mt-1">Transactions are completely encrypted and secure.</p>
              </div>

              {/* Dynamic Global Server Processing Errors */}
              {paymentError && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-medium animate-fadeIn">
                  {paymentError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cardholder Name</label>
                  <input type="text" disabled={isSubmitting} name="cardName" value={formData.cardName} onChange={handleInputChange} placeholder="JANE DOE" className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl outline-none text-sm transition-all focus:bg-white focus:ring-2 disabled:opacity-50 ${errors.cardName ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-indigo-600 focus:ring-indigo-100"}`} />
                  {errors.cardName && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.cardName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Card Number</label>
                  <input type="text" disabled={isSubmitting} name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="4111 2222 3333 4444" maxLength="19" className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl outline-none text-sm transition-all focus:bg-white focus:ring-2 disabled:opacity-50 ${errors.cardNumber ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-indigo-600 focus:ring-indigo-100"}`} />
                  {errors.cardNumber && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Expiration (MM/YY)</label>
                    <input type="text" disabled={isSubmitting} name="expiry" value={formData.expiry} onChange={handleInputChange} placeholder="MM/YY" maxLength="5" className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl outline-none text-sm transition-all focus:bg-white focus:ring-2 disabled:opacity-50 ${errors.expiry ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-indigo-600 focus:ring-indigo-100"}`} />
                    {errors.expiry && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Security Code (CVC)</label>
                    <input type="password" disabled={isSubmitting} name="cvc" value={formData.cvc} onChange={handleInputChange} placeholder="•••" maxLength="4" className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl outline-none text-sm transition-all focus:bg-white focus:ring-2 disabled:opacity-50 ${errors.cvc ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-indigo-600 focus:ring-indigo-100"}`} />
                    {errors.cvc && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.cvc}</p>}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button type="button" disabled={isSubmitting} onClick={() => setStep(1)} className="w-1/3 border border-slate-200 text-slate-600 font-semibold py-3.5 rounded-xl text-sm hover:bg-slate-50 transition-colors disabled:opacity-50">
                  Back
                </button>
                <button type="submit" disabled={isSubmitting} className="w-2/3 bg-indigo-600 text-white font-semibold py-3.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  {isSubmitting ? "Processing..." : `Pay $120.00`}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: TRANSACTION COMPLETE SUCCESS VIEW */}
          {step === 3 && (
            <div className="py-12 text-center space-y-5">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl border border-emerald-100 shadow-sm">✓</div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Order Confirmed!</h2>
                <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                  Thank you for your business, <span className="font-semibold text-slate-800">{formData.name}</span>. An electronic configuration summary has been dispatched to <span className="font-medium text-indigo-600">{formData.email}</span>.
                </p>
              </div>
              <button type="button" onClick={() => { setStep(1); setFormData({ name: "", email: "", phone: "", address: "", cardName: "", cardNumber: "", expiry: "", cvc: "" }); }} className="w-full max-w-xs bg-slate-950 text-white text-sm font-semibold py-3.5 rounded-xl hover:bg-slate-800 transition-colors">
                Return to Store Simulation
              </button>
            </div>
          )}
        </div>

        {/* ==========================================
            RIGHT SIDE: HARDWARE CARD PREVIEW & LEDGER
           ========================================== */}
        <div className="p-6 sm:p-10 lg:col-span-5 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-between gap-8">
          
          {/* Card Component Layout Layer */}
          <div className={`w-full h-44 rounded-2xl bg-gradient-to-br ${cardType.bgClass} p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden transition-all duration-500`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            
            <div className="flex justify-between items-center">
              {/* Internal Smart Chip Vector */}
              <div className="w-8 h-6 bg-amber-400/20 rounded border border-amber-400/30 flex items-center justify-center">
                <div className="w-4 h-3 bg-amber-400/40 rounded-sm" />
              </div>
              {/* Dynamic Vector Logo Output */}
              <div className="h-6 flex items-center">{cardType.logo}</div>
            </div>

            <p className="font-mono tracking-[0.25em] text-base text-slate-100 mt-2">
              {formData.cardNumber || "•••• •••• •••• ••••"}
            </p>

            <div className="flex justify-between items-end text-xs">
              <div className="truncate max-w-[70%]">
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 mb-0.5">Cardholder</span>
                <p className="font-semibold uppercase tracking-wide truncate text-slate-200">
                  {formData.cardName || "Your Name Here"}
                </p>
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 mb-0.5">Expires</span>
                <p className="font-mono font-semibold text-slate-200">
                  {formData.expiry || "MM/YY"}
                </p>
              </div>
            </div>
          </div>

          {/* Checkout Accounting Ledger Summary */}
          <div className="space-y-6">
            <div className="space-y-3.5 text-sm">
              <h3 className="font-bold uppercase tracking-wider text-slate-400 text-xs pb-2 border-b border-slate-200/60">Checkout Summary</h3>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Subtotal</span>
                <span className="text-slate-800">$120.00</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Shipping Fee</span>
                <span className="text-emerald-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-slate-200 text-slate-900">
                <span className="font-semibold text-slate-800">Total Bill</span>
                <span className="text-2xl font-black text-slate-950">$120.00</span>
              </div>
            </div>

            {/* SIMULATE ERROR UX TOGGLE CONTROLLER */}
            {step === 2 && (
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-600">Simulate Bank Decline</span>
                <button type="button" onClick={() => setSimulateFailure(!simulateFailure)} className={`w-10 h-6 flex items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${simulateFailure ? "bg-red-500 justify-end" : "bg-slate-300 justify-start"}`}>
                  <span className="bg-white w-5 h-5 rounded-full shadow-md transform duration-200" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}