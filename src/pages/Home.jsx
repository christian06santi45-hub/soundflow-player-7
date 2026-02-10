import react from "react";
import Landing from "../components/Landing"
import Pricing from "../components/Pricing";
import Featured from "../components/Featured";
import Explore from "../components/Explore";
import Footer from "../components/Footer";


const Home = () => {
    return (
        <>
        <Landing />
        <Pricing />
        <Featured />
        <Explore />
        <Footer />
        </>
    )
}   
export default Home;