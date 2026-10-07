import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryPopup from '@/components/EnquiryPopup';
import StickyBrochure from '@/components/StickyBrochure';
// import ChatBot from '@/components/ChatBot';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SuccessStorySection from '@/components/sections/SuccessStorySection';
import TestimonialVideoSection from '@/components/sections/TestimonialVideoSection';
import WhyMysuru from '@/components/sections/WhyMysuru';
// import GrowthInfraSection from '@/components/sections/GrowthInfraSection';
import { fireLeadConversions } from '@/lib/gtag';
import PriceComparisonSection from '@/components/sections/PriceComparisonSection';
import LocationSection from '@/components/sections/LocationSection';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import AboutUsMinimalSection from '@/components/sections/AboutUsMinimalSection';
import SustainabilityIntroSection from '@/components/sections/SustainabilityIntroSection';
import ConfigurationSection from '@/components/sections/ConfigurationSection';
import GallerySection from '@/components/sections/GallerySection';
import BookCallSection from '@/components/sections/BookCallSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import SeoKeywordsSection from '@/components/sections/SeoKeywordsSection';
import { BaseCrudService } from '@/integrations';
import { initializeUTMTracking } from '@/lib/utm-tracker';
import { buildTrackingPayload } from '@/lib/utm-tracker';
import { initializeAllTrackers } from '@/lib/tracker-init';

import { sendLeadToWebhook } from '@/lib/webhook';

export default function HomePage() {
  // --- STATE ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);

  /* Initialize UTM tracking on mount — persists params to sessionStorage */
  useEffect(() => {
    initializeUTMTracking();
    initializeAllTrackers();
  }, []);

  /* Auto-open popup after 8 seconds (reduced frequency) */
  useEffect(() => {
    const t = setTimeout(() => setPopupOpen(true), 8000);
    return () => clearTimeout(t);
  }, []);

  // --- FORM SUBMISSION ---
  const handleFormSubmit = async (formData: {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    message: string;
  }) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const tracking = buildTrackingPayload();
      
      const payload = {
        _id: crypto.randomUUID(),
        fullName: formData.fullName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        dateSubmitted: new Date().toISOString(),
        ...tracking,
      };

      // Send lead payload to Make.com webhook
      await sendLeadToWebhook(payload);

      await BaseCrudService.create('inquiries', payload);

      // Fire Google Ads conversion events (only after API success)
      fireLeadConversions();

      setSubmitMessage('We appreciate your interest in our project. Our team shall contact you very soon.');
    } catch (error) {
      console.error('❌ Error submitting inquiry:', error);
      setSubmitMessage('Sorry! something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground selection:bg-primary/20 selection:text-primary">
      <EnquiryPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
      <StickyBrochure onOpen={() => setPopupOpen(true)} />
      {/* <ChatBot /> */}
      <Header onOpenPopup={() => setPopupOpen(true)} onOpenBrochure={() => setPopupOpen(true)} />

      <HeroSection 
        onFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
        onOpenPopup={() => setPopupOpen(true)}
      />

      <AboutSection onOpenPopup={() => setPopupOpen(true)} />

      <SuccessStorySection onOpenPopup={() => setPopupOpen(true)} />

      <ConfigurationSection />

      <WhyMysuru />

      {/* <GrowthInfraSection /> */}

      <PriceComparisonSection />

      <LocationSection />

      <AmenitiesSection />

      <AboutUsMinimalSection />

      <SustainabilityIntroSection />

      <GallerySection />

      <TestimonialVideoSection />

      <BookCallSection onOpenPopup={() => setPopupOpen(true)} />

      <FAQSection />

      <ContactSection 
        onFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
      />

      <SeoKeywordsSection />

      <Footer />
    </div>
  );
}
