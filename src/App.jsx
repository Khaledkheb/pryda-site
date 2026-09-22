import AnnouncementBar from "./components/layout/AnnouncementBar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/home/Hero";
import FeaturedWorks from "./components/home/FeaturedWorks";
import Services from "./components/home/Services";
import FinalCTA from "./components/home/FinalCTA";

function App() {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main id="home">
        <Hero />
        <FeaturedWorks />
        <Services />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}

export default App;
