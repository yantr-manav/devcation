
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    ticket: 'full',
    dietary: '',
    code: ''
  });
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const nextStep = () => {
    // Basic validation
    if (step === 1) {
      if (!formData.name || !formData.email) {
        toast({
          title: "Required Fields",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      if (!formData.email.includes('@')) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setStep((prev) => prev + 1);
  };
  
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Registration Successful!",
        description: "Check your email for confirmation details.",
      });
      setIsSubmitting(false);
      setStep(3); // Success step
    }, 1500);
  };

  return (
    <section id="register" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid-bg opacity-10 -z-10"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyberOrange/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyberPurple/10 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 glow-text">
          <span className="text-cyberBlue">Register</span> Now
        </h2>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
          Secure your spot at Devcation 2025 and prepare for an unforgettable experience
        </p>
        
        <div className="max-w-2xl mx-auto">
          {/* Progress indicator */}
          {step < 3 && (
            <div className="mb-10 relative">
              <div className="h-1 bg-gray-700 rounded-full">
                <div 
                  className="h-1 bg-gradient-to-r from-cyberPurple to-cyberBlue rounded-full transition-all duration-300"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step >= 1 ? 'bg-cyberPurple text-white' : 'bg-gray-700 text-gray-400'
                  }`}>
                    1
                  </div>
                  <span className="text-xs mt-1 text-gray-400">Personal Info</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step >= 2 ? 'bg-cyberBlue text-white' : 'bg-gray-700 text-gray-400'
                  }`}>
                    2
                  </div>
                  <span className="text-xs mt-1 text-gray-400">Ticket Selection</span>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="cyber-box">
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name <span className="text-cyberOrange">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-cyberDark border border-cyberPurple/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyberPurple/50"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email Address <span className="text-cyberOrange">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-cyberDark border border-cyberPurple/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyberPurple/50"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-cyberDark border border-cyberPurple/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyberPurple/50"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
                        Job Title/Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full bg-cyberDark border border-cyberPurple/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyberPurple/50"
                        placeholder="Your job title"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-6">Ticket Selection</h3>
                  
                  <div className="grid gap-4">
                    <label className="flex items-center p-4 border border-cyberPurple/30 rounded-md cursor-pointer bg-cyberDark hover:bg-cyberDark-lighter transition-colors">
                      <input
                        type="radio"
                        name="ticket"
                        value="full"
                        checked={formData.ticket === 'full'}
                        onChange={handleChange}
                        className="mr-3 h-5 w-5 border-cyberBlue text-cyberBlue"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-white font-medium">Full Conference Pass</span>
                          <span className="text-cyberOrange font-mono">$899</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          Access to all 4 days, including workshops, keynotes, networking events, and meals
                        </p>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-cyberPurple/30 rounded-md cursor-pointer bg-cyberDark hover:bg-cyberDark-lighter transition-colors">
                      <input
                        type="radio"
                        name="ticket"
                        value="digital"
                        checked={formData.ticket === 'digital'}
                        onChange={handleChange}
                        className="mr-3 h-5 w-5 border-cyberBlue text-cyberBlue"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-white font-medium">Digital Access</span>
                          <span className="text-cyberOrange font-mono">$399</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          Virtual attendance with interactive sessions, Q&A participation, and on-demand recordings
                        </p>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-cyberPurple/30 rounded-md cursor-pointer bg-cyberDark hover:bg-cyberDark-lighter transition-colors">
                      <input
                        type="radio"
                        name="ticket"
                        value="vip"
                        checked={formData.ticket === 'vip'}
                        onChange={handleChange}
                        className="mr-3 h-5 w-5 border-cyberBlue text-cyberBlue"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-white font-medium">VIP Experience</span>
                          <span className="text-cyberOrange font-mono">$1,499</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          Full access plus exclusive speaker sessions, priority seating, VIP lounge access, and special events
                        </p>
                      </div>
                    </label>
                  </div>
                  
                  <div>
                    <label htmlFor="dietary" className="block text-sm font-medium text-gray-300 mb-1">
                      Dietary Requirements or Preferences
                    </label>
                    <textarea
                      id="dietary"
                      name="dietary"
                      value={formData.dietary}
                      onChange={handleChange}
                      className="w-full bg-cyberDark border border-cyberPurple/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyberPurple/50 h-24"
                      placeholder="Let us know if you have any dietary requirements"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-1">
                      Promo Code (if applicable)
                    </label>
                    <input
                      type="text"
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      className="w-full bg-cyberDark border border-cyberPurple/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyberPurple/50"
                      placeholder="Enter promo code"
                    />
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="text-center py-8">
                  <div className="inline-block p-3 rounded-full bg-cyberBlue/20 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyberBlue" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Registration Complete!</h3>
                  <p className="text-gray-300 mb-6">
                    Thank you for registering for Devcation 2025. We've sent confirmation details to your email.
                  </p>
                  <div className="space-y-4">
                    <p className="text-cyberOrange font-mono">Confirmation: DEV2025-{Math.floor(100000 + Math.random() * 900000)}</p>
                    <Button className="bg-cyberBlue hover:bg-cyberBlue-dark text-white">
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              )}
              
              {step < 3 && (
                <div className="mt-10 flex justify-between">
                  {step > 1 && (
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={prevStep}
                      className="border-cyberPurple/50 text-white hover:bg-cyberPurple/10"
                    >
                      Back
                    </Button>
                  )}
                  
                  {step < 2 ? (
                    <Button 
                      type="button"
                      className="bg-cyberBlue hover:bg-cyberBlue-dark ml-auto"
                      onClick={nextStep}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      className="bg-cyberPurple hover:bg-cyberPurple-dark ml-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Complete Registration'
                      )}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </form>
          
          <div className="mt-10 cyber-box p-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1 text-2xl">💡</div>
              <div>
                <p className="text-cyberBlue font-bold">Early Bird Discount</p>
                <p className="text-gray-300">Register before March 1, 2025 to save 20% on all ticket types!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
