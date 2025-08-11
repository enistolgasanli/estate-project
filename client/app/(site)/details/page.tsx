import Footer from "../components/Footer";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import DetailsHeader from "./components/DetailsHeader";

export default function Details() {
    return (
        <div>
            <Navbar normal={false} />
            <DetailsHeader />
            <Map />
            <Footer />
        </div>
    );
}