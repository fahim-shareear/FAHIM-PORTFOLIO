import About from "./components/About";
import Banner from "./components/Banner";

const Home = () => {
    return (
        <div className="w-full h-screen">
            <div>
                <Banner></Banner>
                <About></About>
            </div>
        </div>
    );
};

export default Home;