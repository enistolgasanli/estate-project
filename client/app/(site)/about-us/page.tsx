import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AboutUsHeader from "./components/AboutUsHeader";
import AboutUsMain from "./components/AboutUsMain";
import StatsSection from "./components/StatsSection";

export default function AboutUs() {
    return (
        <div className="w-full">
            <Navbar normal={false} />
            <AboutUsHeader />
            <AboutUsMain />
            <StatsSection />
            <Footer />
        </div>
    );
}