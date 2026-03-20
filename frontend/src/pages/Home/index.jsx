import React from "react";
import Header from "../../components/Header";
import TopHeader from "../../components/TopHeader";
import HeroSlider from "../../components/HeroSection";
import ContactForm from "../../components/ContactForm";

const Home = () => {
  return (
    <div>
      <TopHeader />
      <Header />
      {/* <HeroSlider /> */}
      <ContactForm />
    </div>
  );
};

export default Home;
