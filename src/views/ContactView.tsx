import React, { useState, useEffect } from 'react';
import { useAgency } from '../context/AgencyContext';
import { ArrowUpRight, MessageSquare, Mail, Phone, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { addInquiry, inquiryPrefill, setInquiryPrefill, setCurrentView } = useAgency();

  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('Education & Schools');
  const [projectType, setProjectType] = useState('School Management Solutions');
  const [description, setDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('$15,000 – $25,000');
  const [expectedTimeline, setExpectedTimeline] = useState('2–3 Months');

  const [submittedInquiry, setSubmittedInquiry] = useState<{ id: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (inquiryPrefill) {
      if (inquiryPrefill.projectType) setProjectType(inquiryPrefill.projectType);
      if (inquiryPrefill.industry) setIndustry(inquiryPrefill.industry);
      if (inquiryPrefill.description) setDescription(inquiryPrefill.description);
    }
  }, [inquiryPrefill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newInq = addInquiry({
        fullName,
        company,
        email,
        phone,
        industry,
        projectType,
        description,
        budgetRange,
        expectedTimeline
      });
      setSubmittedInquiry({ id: newInq.id });
      setIsSubmitting(false);
      setInquiryPrefill(null);
    }, 400);
  };

  const handleResetForm = () => {
    setSubmittedInquiry(null);
    setFullName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setDescription('');
  };

  const generateWhatsAppMessageUrl = () => {
    const text = encodeURIComponent(
      `Hello Vanguard Studio, I would like to inquire about a project:\n` +
      `• Name: ${fullName || 'Client'}\n` +
      `• Company: ${company || 'Organization'}\n` +
      `• Type: ${projectType}\n` +
      `• Budget: ${budgetRange}\n` +
      `• Timeline: ${expectedTimeline}`
    );
    return `https://wa.me/15550192834?text=${text}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-neutral-100">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Start a Project · Discovery & Proposal
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Let’s Build Something Great Together
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Tell us about your organization and technical objectives. Our principal software architects will review your requirements, conduct a technical feasibility audit, and prepare a fixed-fee milestone proposal within 48 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Contact Details & SLA */}
        <div className="lg:col-span-5 space-y-8 bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 sm:p-8">
          
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">Direct Communication</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Prefer an immediate conversation? Reach our engineering team directly via WhatsApp or email.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* WhatsApp */}
            <a
              href="https://wa.me/15550192834?text=Hello%20Vanguard%20Team%2C%20I%20would%20like%20to%20discuss%20a%20new%20project."
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-neutral-950 border border-neutral-800 hover:border-emerald-600 rounded-lg flex items-start gap-3 transition-colors group"
            >
              <div className="p-2 bg-emerald-950/60 border border-emerald-800 rounded text-emerald-400 shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-0.5">Instant WhatsApp Hotline</span>
                <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  +1 (555) 019-2834
                </span>
                <p className="text-[11px] text-neutral-400 mt-0.5">Average reply time under 20 minutes</p>
              </div>
            </a>

            {/* Direct Email */}
            <a
              href="mailto:inquiries@vanguard-studio.tech"
              className="p-4 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-lg flex items-start gap-3 transition-colors group"
            >
              <div className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-0.5">Executive Email</span>
                <span className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors">
                  inquiries@vanguard-studio.tech
                </span>
                <p className="text-[11px] text-neutral-400 mt-0.5">Detailed RFPs & technical documents</p>
              </div>
            </a>

            {/* Studio Line */}
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg flex items-start gap-3">
              <div className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-0.5">Direct Office Line</span>
                <span className="text-sm font-semibold text-white">
                  +1 (555) 248-9100
                </span>
                <p className="text-[11px] text-neutral-400 mt-0.5">Mon–Fri 8:00 AM – 7:00 PM EST</p>
              </div>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="pt-6 border-t border-neutral-800/80 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Our Engagement Guarantees
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Initial discovery response within 6 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>100% intellectual property & code ownership transfer</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>NDA signed prior to confidential technical disclosure</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column: Interactive Inquiry Form or Submission Confirmation */}
        <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 sm:p-10">
          
          {submittedInquiry ? (
            <div className="py-8 space-y-6 text-center">
              <div className="w-14 h-14 bg-emerald-950 border border-emerald-600 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  Project Inquiry Received
                </h3>
                <p className="text-xs font-mono text-emerald-400">
                  Reference ID: {submittedInquiry.id.toUpperCase()}
                </p>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed pt-2">
                  Thank you, <strong className="text-white">{fullName}</strong>. Our senior software leads have received your inquiry for <strong className="text-white">{company}</strong>. We will review your requirements and reach out within 6 hours.
                </p>
              </div>

              {/* Instant WhatsApp bridge */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={generateWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Continue on WhatsApp Now</span>
                </a>

                <button
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-5 py-2.5 border border-neutral-700 hover:border-neutral-600 text-neutral-300 text-xs font-medium rounded transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-lg font-bold text-white">Project Inquiry Form</h2>
                <p className="text-xs text-neutral-400">
                  Fill in your details below to request a consultation and tailored proposal.
                </p>
              </div>

              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Eleanor Vance"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Oakwood Academy"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>
              </div>

              {/* Industry & Project Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Industry Sector *
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                  >
                    <option value="Education & Schools">Education & Schools</option>
                    <option value="Restaurants & Hospitality">Restaurants & Hospitality</option>
                    <option value="Startups & Venture MVPs">Startups & Venture MVPs</option>
                    <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                    <option value="Retail & E-commerce">Retail & E-commerce</option>
                    <option value="Small & Medium Businesses">Small & Medium Businesses</option>
                    <option value="Corporate & Enterprise">Corporate & Enterprise</option>
                    <option value="Professional Services">Professional Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Project Type *
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                  >
                    <option value="School Management Solutions">School Management Solutions</option>
                    <option value="Restaurant Management & Digital Solutions">Restaurant Management & Digital Solutions</option>
                    <option value="MVP Development for Startups">MVP Development for Startups</option>
                    <option value="Website Design & Development">Website Design & Development</option>
                    <option value="Full-Stack Application Development">Full-Stack Application Development</option>
                    <option value="AI & Intelligent Automation">AI & Intelligent Automation</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Business Process Automation">Business Process Automation</option>
                    <option value="E-commerce Architecture & Stores">E-commerce Architecture & Stores</option>
                    <option value="Custom Enterprise Software">Custom Enterprise Software</option>
                  </select>
                </div>
              </div>

              {/* Budget Range & Expected Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Budget Range
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                  >
                    <option value="$5,000 – $10,000">$5,000 – $10,000 (Small sprint / audit)</option>
                    <option value="$10,000 – $15,000">$10,000 – $15,000 (Focused app / PWA)</option>
                    <option value="$15,000 – $25,000">$15,000 – $25,000 (Standard MVP / ERP module)</option>
                    <option value="$25,000 – $50,000">$25,000 – $50,000 (Comprehensive platform)</option>
                    <option value="$50,000+">$50,000+ (Enterprise transformation)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Target Kickoff Timeline
                  </label>
                  <select
                    value={expectedTimeline}
                    onChange={(e) => setExpectedTimeline(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                  >
                    <option value="Immediate (Within 2 Weeks)">Immediate (Within 2 Weeks)</option>
                    <option value="1 Month">Within 1 Month</option>
                    <option value="2–3 Months">2–3 Months</option>
                    <option value="Flexible / Exploring">Flexible / Exploring</option>
                  </select>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Project Description & Key Requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your current software situation, key challenges, target features, and what success looks like..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white leading-relaxed"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-neutral-400">
                  Zero spam. Direct conversation with principal engineers.
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider rounded transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Transmitting Request...' : 'Submit Inquiry & Request Proposal'}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
