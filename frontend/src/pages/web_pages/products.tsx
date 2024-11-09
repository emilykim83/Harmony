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
  PricingDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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

  const pricing_features = {
    standard: {
      features: [
        'Access to basic song library',
        'Interactive lessons',
        'Progress tracking',
      ],
      limited_features: [
        'Limited personalized learning paths',
        'Basic support',
      ],
    },
    premium: {
      features: [
        'Access to full song library',
        'Advanced interactive lessons',
        'Comprehensive progress tracking',
      ],
      also_included: [
        'Unlimited personalized learning paths',
        'Priority support',
        'Offline access',
      ],
    },
    business: {
      features: [
        'Full access to all features',
        'Customizable learning modules',
        'Dedicated account manager',
        'Advanced analytics and reporting',
      ],
    },
  };

  const description = {
    standard:
      'The Standard plan is perfect for individual learners who want to explore music at their own pace with essential features.',
    premium:
      'The Premium plan is ideal for small music schools or dedicated learners seeking enhanced features and personalized learning experiences.',
    business:
      'The Business plan is designed for educational institutions and enterprises looking for comprehensive solutions with advanced customization and support.',
  };

  const features_points = [
    {
      name: 'Interactive Song Library',
      description:
        'Access a diverse library of songs tailored for young learners, complete with visual guides and interactive elements to enhance learning.',
      icon: 'mdiLibraryMusic',
    },
    {
      name: 'Personalized Learning Paths',
      description:
        "Create customized learning paths that adapt to each student's pace and skill level, ensuring a personalized and effective learning experience.",
      icon: 'mdiAccountSwitch',
    },
    {
      name: 'Progressive Skill Development',
      description:
        'Our app focuses on progressive skill development, helping students build a strong foundation in music through structured lessons and exercises.',
      icon: 'mdiChartBar',
    },
  ];

  const testimonials = [
    {
      text: '${projectName} has been a game-changer for our music program. The interactive features keep our students engaged and excited to learn.',
      company: 'Harmony Music Academy',
      user_name: 'Alice Thompson, Director',
    },
    {
      text: "As a parent, I love how ${projectName} tracks my child's progress. It's rewarding to see their improvement and enthusiasm for music.",
      company: 'Melody Makers',
      user_name: 'Robert Johnson, Parent',
    },
    {
      text: "The personalized learning paths in ${projectName} are fantastic. They cater to each student's needs, making teaching more effective.",
      company: 'Crescendo School of Music',
      user_name: 'Laura Smith, Music Teacher',
    },
    {
      text: "Our students have shown remarkable progress since we started using ${projectName}. The app's features are intuitive and comprehensive.",
      company: 'Symphony Learning Center',
      user_name: 'Michael Brown, Instructor',
    },
    {
      text: "${projectName} offers a wide range of songs and lessons that keep my child motivated. It's a wonderful tool for young musicians.",
      company: 'Tune Up Studios',
      user_name: 'Jessica Davis, Parent',
    },
    {
      text: 'The support team at ${projectName} is exceptional. They are always ready to help and ensure we get the most out of the app.',
      company: 'Rhythm and Rhyme School',
      user_name: 'David Wilson, Music Teacher',
    },
  ];

  const faqs = [
    {
      question: 'What is included in the Standard plan?',
      answer:
        "The Standard plan includes access to the basic song library, interactive lessons, and progress tracking. It's perfect for individual learners starting their musical journey.",
    },
    {
      question: 'How does the Premium plan differ from the Standard plan?',
      answer:
        'The Premium plan offers access to the full song library, advanced interactive lessons, and comprehensive progress tracking. It also includes unlimited personalized learning paths and priority support.',
    },
    {
      question: 'Is there a free trial available for ${projectName}?',
      answer:
        'Yes, we offer a free trial period for new users to explore the features and benefits of ${projectName} before committing to a subscription.',
    },
    {
      question: 'Can I switch plans after signing up?',
      answer:
        'Absolutely! You can upgrade or downgrade your plan at any time to better suit your needs. Simply contact our support team for assistance.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        '${projectName} accepts major credit cards and PayPal for subscription payments. All transactions are secure and encrypted for your safety.',
    },
    {
      question: 'Is ${projectName} suitable for classroom use?',
      answer:
        'Yes, ${projectName} is designed to be used both individually and in classroom settings, making it a versatile tool for music education.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Explore Our Music Learning Products`}</title>
        <meta
          name='description'
          content={`Discover the innovative products offered by our music learning app, designed to enhance the educational experience for elementary students. Learn about features, pricing, and more.`}
        />
      </Head>
      <WebSiteHeader projectName={'Harmony'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Harmony'}
          image={['Child playing digital piano']}
          mainText={`Discover ${projectName} Products Today`}
          subTitle={`Explore our range of innovative products designed to make music learning engaging and effective for young students. Unlock the potential of every child with ${projectName}.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`View Products`}
        />

        <PricingSection
          projectName={'Harmony'}
          withBg={0}
          features={pricing_features}
          description={description}
        />

        <FeaturesSection
          projectName={'Harmony'}
          image={['Colorful music app interface']}
          withBg={0}
          features={features_points}
          mainText={`Innovative Features of ${projectName}`}
          subTitle={`Discover the powerful features that make ${projectName} the perfect choice for young music learners.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'Harmony'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`Hear from Our Satisfied Users `}
        />

        <FaqSection
          projectName={'Harmony'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'Harmony'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
