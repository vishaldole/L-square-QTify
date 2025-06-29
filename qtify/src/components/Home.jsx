import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import AlbumCard from "./AlbumCard";
import headphoneImg from "../assets/hero_headphones.png";
import Section from "./Section";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div
        style={{
          backgroundColor: "#121212",
          padding: "20px",
        }}
      >
        <Section
          title="Top Albums"
          apiEndpoint="https://qtify-backend-labs.crio.do/albums/top"
        />
      </div>
      <div style={{ backgroundColor: "#121212", padding: "20px" }}>
        <Section
          title="New Albums"
          apiEndpoint="https://qtify-backend-labs.crio.do/albums/new"
        />
      </div>
    </div>
  );
};

export default Home;
