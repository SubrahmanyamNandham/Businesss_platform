import React from 'react';
import { useAgency, AppView } from '../context/AgencyContext';
import { ArrowUpRight, MessageSquare, Mail, Phone, ShieldCheck } from 'lucide-react';
import { Brand } from './Brand';

export const Footer: React.FC = () => {
  const { setCurrentView } = useAgency();

  const handleNav = (view: AppView) => {
    setCurrentView(view);
  };

  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Brand />
            <p className="text-neutral-400 text-sm max-w-sm leading-relaxed">
              World-class digital engineering and creative technology studio. We partner with ambitious leaders to architect high-performance web systems, custom automation, and enterprise client platforms.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Client Code Ownership · Zero Vendor Lock-in</span>
            </div>
          </div>

          {/* Nav Col 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">Capabilities</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('work')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Selected Work
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Services Directory
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Industries We Transform
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('process')} className="hover:text-white transition-colors cursor-pointer text-left">
                  7-Stage Engineering
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('proposals')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Client Proposal Platform
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">Sectors</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Education & Schools ERP
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Restaurant & POS Tech
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Startup 0-to-1 MVPs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Healthcare & Clinical Intake
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Enterprise Automation
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">Direct Inquiries</h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <a
                href="mailto:evolvexai@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
                <span>evolvexai@gmail.com</span>
              </a>
              <a
                href="https://wa.me/918919290366?text=Hello%20Evolvex%20AI%2C%20I%20would%20like%20to%20discuss%20a%20new%20project."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: +91 89192 90366</span>
              </a>
              <div className="flex items-center gap-2 text-neutral-400">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>Office: +91 89192 90366</span>
              </div>
              <p className="text-neutral-400 text-xs pt-1">
                Response SLA: Initial review within 6 hours.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom hairline row */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Evolvex AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>WCAG 2.1 AA Compliant</span>
            <span aria-hidden="true">·</span>
            <span>San Francisco & London</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => handleNav('contact')}
              className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Schedule Discovery</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
