import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Harmony';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/products',
      label: 'products',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/contact',
      label: 'contact',
    },
  ];

  const faqs = [
    {
      question: 'How can I reset my password?',
      answer:
        "To reset your password, click on the 'Forgot Password' link on the login page. Follow the instructions to receive a reset link via email.",
    },
    {
      question: 'What should I do if I encounter a technical issue?',
      answer:
        'If you experience any technical issues, please contact our support team through the contact form. Provide details about the issue for faster assistance.',
    },
    {
      question: 'Can I upgrade my plan at any time?',
      answer:
        'Yes, you can upgrade your plan at any time. Simply log into your account, go to the subscription settings, and select the desired plan.',
    },
    {
      question: 'Is there a mobile app available?',
      answer:
        'Currently, ${projectName} is accessible via web browsers on tablets and computers. We are working on a mobile app version for future release.',
    },
    {
      question: 'How do I cancel my subscription?',
      answer:
        'To cancel your subscription, log into your account, navigate to the subscription settings, and follow the cancellation instructions. Contact support if you need help.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        '${projectName} accepts major credit cards and PayPal for subscription payments. All transactions are secure and encrypted.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - Music Learning App`}</title>
        <meta
          name='description'
          content={`Get in touch with our team for any inquiries or support. Find answers to common questions and learn more about our music learning app.`}
        />
      </Head>
      <WebSiteHeader projectName={'Harmony'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Harmony'}
          image={['Customer support team assisting']}
          mainText={`Connect with ${projectName} Support Team`}
          subTitle={`We're here to help with any questions or support you need. Reach out to us and let us assist you in making the most of your ${projectName} experience.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'Harmony'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'Harmony'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person writing an email']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need support? Send us a message anytime, and our team will respond promptly to assist you with your ${projectName} experience.`}
        />
      </main>
      <WebSiteFooter projectName={'Harmony'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
