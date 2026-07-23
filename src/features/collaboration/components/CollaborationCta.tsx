"use client";

import { useState } from "react";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { Button } from "@/components/ui/Button";

type CollaborationCtaProps = {
  title: string;
  subtitle: string;
  buttonLabel: string;
};

export function CollaborationCta({ title, subtitle, buttonLabel }: CollaborationCtaProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CtaBanner
        title={title}
        subtitle={subtitle}
        action={
          <Button variant="white" onClick={() => setIsOpen(true)}>
            {buttonLabel}
          </Button>
        }
      />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div 
            className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
              aria-label="Close dialog"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-ink mb-6 pr-8">Start Your Research Project</h2>
              
              <form action="mailto:sales@beaconmartech.com" method="post" encType="text/plain" className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-ink/80 mb-1">Full Name*</label>
                  <input 
                    required 
                    type="text" 
                    name="Full Name" 
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-ink/80 mb-1">Work Email*</label>
                  <input 
                    required 
                    type="email" 
                    name="Work Email" 
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-ink/80 mb-1">Company Name*</label>
                  <input 
                    required 
                    type="text" 
                    name="Company Name" 
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-ink/80 mb-1">Project Requirements*</label>
                  <textarea 
                    required 
                    name="Project Requirements" 
                    rows={4} 
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="w-full">
                    Submit Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
