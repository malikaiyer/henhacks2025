import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useEffect } from "react";

const stats = [
  {
    id: "stat1",
    number: 1,
    suffix: "in 11",
    description: "people suffer from hunger worldwide.",
    bgImage: "https://cdn.pixabay.com/photo/2019/12/31/13/45/crowd-4731930_1280.jpg",
  },
  {
    id: "stat2",
    number: 2.3,
    suffix: "B",
    description: "people experience severe food insecurity.",
    bgImage: "https://cdn.pixabay.com/photo/2016/11/21/15/45/man-1846050_960_720.jpg",
  },
  {
    id: "stat3",
    number: 582,
    suffix: "M",
    description: "people are projected to be chronically undernourished by 2030",
    bgImage: "https://source.unsplash.com/1600x900/?children,malnutrition",
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

// const StatsPage = () => {
//   return (
//     <div>
//       {stats.map((stat) => (
//         <StatSection
//           key={stat.id}
//           number={stat.number}
//           suffix={stat.suffix}
//           description={stat.description}
//           bgImage={stat.bgImage}
//         />
//       ))}
//     </div>
//   );
// };

// export default StatsPage;

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
    <motion.div className="product-detail d-flex align-items-center justify-content-around p-5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}
    style={{ height: "100vh" }}>
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
      <motion.img 
      src={image} 
      alt={title} 
      style={{ width: "40%", borderRadius: "10px" }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.9 }}
    />
    </motion.div>
  );
  
  const StatsPage = () => {
    // return (
    //   <div>
    //     {stats.map((stat) => (
    //       <StatSection key={stat.id} {...stat} />
    //     ))}
    //     <ProductOverview />
    //     <ProductDetail title="Product 1" description="Connecting restaurants with food banks to redistribute excess food." image="https://source.unsplash.com/600x400/?food,donation" />
    //     <ProductDetail title="Product 2" description="Using AI-powered logistics to optimize food distribution and reduce waste." image="https://source.unsplash.com/600x400/?logistics,truck" />
    //   </div>
    useEffect(() => {
        const scroll = new LocomotiveScroll({
          el: document.querySelector("[data-scroll-container]") as HTMLElement,
          smooth: true,
        });
    
        return () => {
          scroll.destroy();
        };
      }, []);
    
      return (
        <div data-scroll-container>
          {stats.map((stat) => (
            <StatSection key={stat.id} {...stat} />
          ))}
          <ProductOverview />
          <ProductDetail title="Product 1" description="Connecting restaurants with food banks to redistribute excess food." image="https://source.unsplash.com/600x400/?food,donation" />
          <ProductDetail title="Product 2" description="Using AI-powered logistics to optimize food distribution and reduce waste." image="https://source.unsplash.com/600x400/?logistics,truck" />
        </div>
    );
  };
  
  export default StatsPage;
  

