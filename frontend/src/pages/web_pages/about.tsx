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
  AboutUsDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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

  const features_points = [
    {
      name: 'Engaging Visuals',
      description:
        'Our app uses vibrant visuals to guide students through each lesson, making learning intuitive and enjoyable.',
      icon: 'mdiPalette',
    },
    {
      name: 'Adaptive Learning',
      description:
        "Lessons adapt to each student's pace, ensuring a personalized learning experience that caters to individual needs.",
      icon: 'mdiBrain',
    },
    {
      name: 'Comprehensive Curriculum',
      description:
        'Our curriculum covers a wide range of musical concepts, providing a solid foundation for budding musicians.',
      icon: 'mdiBookOpenPageVariant',
    },
  ];

  const testimonials = [
    {
      text: 'Our students absolutely love ${projectName}! The interactive lessons keep them engaged and excited about learning music.',
      company: 'Harmony School of Music',
      user_name: 'Emily Johnson, Music Teacher',
    },
    {
      text: '${projectName} has transformed the way my child learns music. The real-time feedback is incredibly helpful for improvement.',
      company: 'Melody Makers Inc.',
      user_name: 'John Smith, Parent',
    },
    {
      text: "As a teacher, I appreciate how ${projectName} adapts to each student's pace. It's a fantastic tool for personalized learning.",
      company: 'Crescendo Academy',
      user_name: 'Sarah Lee, Music Educator',
    },
    {
      text: 'The visuals in ${projectName} are stunning and make learning music so much fun for my students. Highly recommend!',
      company: 'Symphony Learning Center',
      user_name: 'Michael Brown, Instructor',
    },
    {
      text: 'I love how ${projectName} tracks progress. It motivates my child to keep practicing and improving their skills.',
      company: 'Tune Up Studios',
      user_name: 'Jessica Davis, Parent',
    },
    {
      text: "${projectName} offers a comprehensive curriculum that covers all the basics and more. It's a great resource for young musicians.",
      company: 'Rhythm and Rhyme School',
      user_name: 'David Wilson, Music Teacher',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Us - Music Learning App`}</title>
        <meta
          name='description'
          content={`Learn more about our mission, values, and the team behind our innovative music learning app for elementary students. Discover how we inspire young musicians.`}
        />
      </Head>
      <WebSiteHeader projectName={'Harmony'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Harmony'}
          image={['Team brainstorming in office']}
          mainText={`Meet the Visionaries Behind ${projectName}`}
          subTitle={`Discover the passion and dedication that drive ${projectName}. Learn about our mission to transform music education for young learners everywhere.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Our Story`}
        />

        <AboutUsSection
          projectName={'Harmony'}
          image={['Children learning music together']}
          mainText={`Our Mission and Values at ${projectName}`}
          subTitle={`At ${projectName}, we are committed to nurturing the musical talents of young learners. Our values are rooted in creativity, inclusivity, and innovation, driving us to create an engaging learning experience.`}
          design={AboutUsDesigns.IMAGE_RIGHT || ''}
          buttonText={`Learn More`}
        />

        <FeaturesSection
          projectName={'Harmony'}
          image={['Musical notes and instruments']}
          withBg={1}
          features={features_points}
          mainText={`Innovative Features of ${projectName}`}
          subTitle={`Explore the unique features that make ${projectName} a leading choice for music education among young learners.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'Harmony'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Users Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Harmony'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on laptop']}
          mainText={`Connect with the ${projectName} Team `}
          subTitle={`Have questions or feedback? Reach out to us anytime, and our dedicated team will respond promptly to assist you with your ${projectName} experience.`}
        />
      </main>
      <WebSiteFooter projectName={'Harmony'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
