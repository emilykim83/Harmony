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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
      question: 'How do I get started with ${projectName}?',
      answer:
        'To get started, simply sign up for an account on our website. Once registered, you can explore our features and choose a plan that suits your needs.',
    },
    {
      question: 'What devices can I use ${projectName} on?',
      answer:
        '${projectName} is compatible with most tablets and computers, allowing you to learn music on the go or from the comfort of your home.',
    },
    {
      question: "Can I track my child's progress?",
      answer:
        "Yes, ${projectName} offers detailed progress tracking, allowing parents to monitor their child's learning journey and achievements.",
    },
    {
      question: 'Is there a community or support group for users?',
      answer:
        'Yes, we have an active community forum where users can share tips, ask questions, and connect with other learners. Our support team is also available to assist you.',
    },
    {
      question: 'How often is new content added?',
      answer:
        'We regularly update our song library and lessons to ensure a fresh and engaging learning experience. Stay tuned for new content announcements.',
    },
    {
      question: 'What if I need help with the app?',
      answer:
        "Our support team is here to help. You can reach out to us via the contact form on our website, and we'll respond promptly to assist you.",
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - Music Learning App`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about our music learning app. Learn more about features, pricing, and how to get started.`}
        />
      </Head>
      <WebSiteHeader projectName={'Harmony'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Harmony'}
          image={['Person reading FAQ document']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Learn more about our features, pricing, and how to get started.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'Harmony'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Harmony'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on laptop']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have more questions or need assistance? Contact us anytime, and our support team will respond promptly to help you with your ${projectName} experience.`}
        />
      </main>
      <WebSiteFooter projectName={'Harmony'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
