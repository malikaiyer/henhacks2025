/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-template-curly-in-string */

import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useEffect, useRef } from "react";

const stats = [
  {
    id: "stat1",
    number: 1,
    suffix: " in 11",
    description: "people suffer from hunger worldwide.",
    bgImage: "https://cdn.pixabay.com/photo/2019/12/31/13/45/crowd-4731930_1280.jpg",
  },
  {
    id: "stat2",
    number: 2.3,
    suffix: "B",
    description: "people experience severe food insecurity.",
    bgImage: "https://cdn.pixabay.com/photo/2017/08/10/07/20/grocery-store-2619380_1280.jpg",
  },
  {
    id: "stat3",
    number: 582,
    suffix: "M",
    description: "people are projected to be chronically undernourished by 2030",
    bgImage: "https://cdn.pixabay.com/photo/2021/08/14/18/01/people-6545894_1280.jpg",
  },
  {
    id: "stat4",
    number: "RescueBites", 
    description: "connects surplus food with those in need—because no one should go hungry.", 
    bgImage: "https://cdn.pixabay.com/photo/2020/05/24/23/44/hands-5216585_1280.jpg"
}
];

interface StatSectionProps {
  number: string | number;
  suffix?: string;
  description: string;
  bgImage: string;
}

const StatSection: React.FC<StatSectionProps> = ({ number, suffix, description, bgImage }) => {
  return (
    <motion.div
      className="stat-section"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "white",
        padding: "20px",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <motion.h1
        style={{ fontSize: "5rem", fontWeight: "bold" }}
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {number}
        </motion.span>
        {suffix}
      </motion.h1>
      <motion.p
        style={{ fontSize: "2rem", maxWidth: "700px" }}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const ProductOverview = () => (
  <motion.div
    className="product-overview"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      style={{ fontSize: "3rem", fontWeight: "bold" }}
    >
      How we Help
    </motion.h2>
      <div className="d-flex justify-content-center gap-3">
        <motion.div className="card p-4" whileHover={{ scale: 1.1 }}>
          <h3>CommunityBites</h3>
          <p>A revolutionary way to connect surplus food with communities.</p>
          <img src="https://cdn.pixabay.com/photo/2020/04/27/15/00/friends-5100219_1280.jpg" alt="CommunityBites" width='200px' height='200px' text-align='center' />
        </motion.div>
        <motion.div className="card p-4" whileHover={{ scale: 1.1 }}>
          <h3>MealBites</h3>
          <p>Advanced logistics to ensure no food goes to waste.</p>
          <img src="https://cdn.pixabay.com/photo/2023/03/13/11/13/scallions-7849575_1280.jpg" alt="MealBites" width='300px' height='200px' text-align='center' />
        </motion.div>
      </div>
  </motion.div>
);
  
  interface ProductDetailProps {
    title: string;
    description: string;
    image: string;
  }
  
  const ProductDetail: React.FC<ProductDetailProps> = ({ title, description, image }) => (
    <motion.div className="product-detail d-flex align-items-center justify-content-around p-5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div>
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        {description}
      </motion.p>
      </div>
      <img src={image} alt={title} style={{ width: "40%", borderRadius: "10px" }} />
    </motion.div>
  );
  
  const StatsPage = () => {
    // const scrollRef = useRef<LocomotiveScroll | null>(null);
    // const currentSectionRef = useRef(0);
    // const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    // const sections = [...stats, { id: 'overview' }, { id: 'communityBites' }, { id: 'mealBites' }];
  
    // useEffect(() => {
    //   const scroll = new LocomotiveScroll({
    //     el: document.querySelector("[data-scroll-container]") as HTMLElement,
    //     smooth: true,
    //   });
    //   scrollRef.current = scroll;
  
    //   const resetAutoScrollTimeout = () => {
    //     if (autoScrollTimeoutRef.current) {
    //       clearTimeout(autoScrollTimeoutRef.current);
    //     }
    //     autoScrollTimeoutRef.current = setTimeout(() => {
    //       autoScroll();
    //     }, 6000); // Resume auto-scroll after 6 seconds
    //   };
  
    //   const handleUserScroll = () => {
    //     if (autoScrollTimeoutRef.current) {
    //       clearTimeout(autoScrollTimeoutRef.current);
    //     }
    //     resetAutoScrollTimeout();
    //   };
  
    //   const autoScroll = () => {
    //     if (currentSectionRef.current < sections.length) {
    //       const sectionElements = document.querySelectorAll('.stat-section, .product-overview, .product-detail');
    //       if (sectionElements[currentSectionRef.current]) {
    //         scroll.scrollTo(sectionElements[currentSectionRef.current] as HTMLElement, {
    //           duration: 1000,
    //           disableLerp: false,
    //         });
    //         currentSectionRef.current++;
    //       }
    //     } else {
    //       scroll.scrollTo(0, { duration: 1000, disableLerp: false });
    //       currentSectionRef.current = 0;
    //     }
    //     resetAutoScrollTimeout();
    //   };
  
    //   // Start initial auto-scroll
    //   const initialScrollTimeout = setTimeout(() => {
    //     autoScroll();
    //   }, 3000);
  
    //   // Add scroll event listener
    //   window.addEventListener('wheel', handleUserScroll);
    //   window.addEventListener('touchmove', handleUserScroll);
  
    //   return () => {
    //     if (autoScrollTimeoutRef.current) {
    //       clearTimeout(autoScrollTimeoutRef.current);
    //     }
    //     clearTimeout(initialScrollTimeout);
    //     window.removeEventListener('wheel', handleUserScroll);
    //     window.removeEventListener('touchmove', handleUserScroll);
    //     scroll.destroy();
    //   };
    // }, [sections.length]);
  
    return (
      <div data-scroll-container style={{ paddingTop: '20px' }}>
        {stats.map((stat) => (
          <StatSection key={stat.id} {...stat} />
        ))}
        <ProductOverview />
        <ProductDetail 
          title="CommunityBites" 
          description="CommunityBites is a transformative initiative designed to bridge the gap between surplus food from various sources (like restaurants, grocery stores, and food vendors) and underserved communities facing food insecurity. By leveraging cutting-edge technology and a robust logistics network, CommunityBites connects donors - whether large food establishments, individual households, or farms—with local non-profit organizations, food banks, and direct beneficiaries. The goal of CommunityBites is to ensure that surplus food does not go to waste but is instead redirected to those who need it the most. It operates as a seamless platform where both donors and recipients can easily coordinate the exchange of food." 
          image="community-resources.png" 
        />
        <ProductDetail 
          title="MealBites" 
          description="MealBites is an innovative AI-driven meal recommendation platform designed to tackle food insecurity by helping individuals make the most of what they already have in their pantry. By providing personalized meal suggestions based on available ingredients, MealBites empowers people to reduce food waste, maximize their pantry resources, and minimize the need for external food support. Food insecurity is not only about lack of access to food, but also the inability to make nutritious meals from available resources. Many households, particularly in underserved communities, face challenges in meal planning and utilizing their pantry staples efficiently. This leads to food waste, unbalanced meals, and the need for external food assistance. MealBites addresses this issue by using cutting-edge AI algorithms to recommend easy-to-make meals based on the ingredients users already have. Whether it's a can of beans, a few fresh veggies, or some leftover rice, MealBites analyzes these items and suggests recipes that are both nutritious and easy to prepare, ensuring that no food goes unused." 
          image="whats-in-my-kitchen.png" 
        />
      </div>
    );
  };
  
  export default StatsPage;
  

