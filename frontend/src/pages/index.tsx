import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  ContactFormDesigns,
  FeaturesDesigns,
  FaqDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import FaqSection from '../components/WebPageComponents/FaqComponent';

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

  const features_points = [
    {
      name: 'Interactive Lessons',
      description:
        'Engage students with interactive lessons that break down songs into manageable sections, making learning fun and accessible.',
      icon: 'mdiMusicNote',
    },
    {
      name: 'Real-Time Feedback',
      description:
        'Provide instant feedback as students play, helping them improve their skills and progress through lessons with confidence.',
      icon: 'mdiCommentCheck',
    },
    {
      name: 'Progress Tracking',
      description:
        'Track student progress with detailed reports, allowing them to see their improvement and stay motivated.',
      icon: 'mdiChartLine',
    },
  ];

  const faqs = [
    {
      question: 'What age group is ${projectName} suitable for?',
      answer:
        '${projectName} is designed for elementary school students, typically aged 6 to 12, providing age-appropriate lessons and activities.',
    },
    {
      question: 'How does the interactive practice work?',
      answer:
        "The app listens to the student's performance and provides real-time feedback, allowing them to progress to the next section once they play correctly.",
    },
    {
      question: "Can parents track their child's progress?",
      answer:
        "Yes, ${projectName} offers progress tracking features that allow parents to view detailed reports of their child's learning journey and achievements.",
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, we offer a free trial period for new users to explore the features and benefits of ${projectName} before committing to a subscription.',
    },
    {
      question: 'What devices is ${projectName} compatible with?',
      answer:
        '${projectName} is compatible with most tablets and computers, ensuring a seamless learning experience across different devices.',
    },
    {
      question: 'Are there different levels of difficulty?',
      answer:
        'Yes, ${projectName} offers lessons with varying levels of difficulty to cater to beginners as well as more advanced young musicians.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Music Learning App for Elementary Students`}</title>
        <meta
          name='description'
          content={`Engage young learners with our interactive music learning app designed for elementary school students. Explore lessons, practice sections, and track progress with ease.`}
        />
      </Head>
      <WebSiteHeader projectName={'Harmony'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Harmony'}
          image={['Child playing piano joyfully']}
          mainText={`Unlock Musical Potential with ${projectName}`}
          subTitle={`Discover the joy of music with ${projectName}, the interactive app designed to make learning fun and engaging for elementary students.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Start Learning`}
        />

        <AboutUsSection
          projectName={'Harmony'}
          image={['Team collaborating on project']}
          mainText={`Discover the Heart of ${projectName}`}
          subTitle={`At ${projectName}, we are passionate about making music education accessible and enjoyable for young learners. Our mission is to inspire creativity and foster a love for music in every child.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <FeaturesSection
          projectName={'Harmony'}
          image={['Colorful music notes illustration']}
          withBg={0}
          features={features_points}
          mainText={`Explore ${projectName} Features`}
          subTitle={`Empower young learners with engaging and interactive features designed to make music education fun and effective.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <FaqSection
          projectName={'Harmony'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'Harmony'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Child using tablet for music']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need assistance? Reach out to us anytime, and our team will respond promptly to help you with your ${projectName} experience.`}
        />
      </main>
      <WebSiteFooter projectName={'Harmony'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
