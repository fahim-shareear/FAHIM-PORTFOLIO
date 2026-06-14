import About from "./components/About";
import Banner from "./components/Banner";
import TeckStack from "./components/TeckStack";

const Home = () => {
    return (
        <main className="w-full" id="home">
            <section id="home" className="min-h-screen">
                <Banner />
            </section>

            <section id="about" className="w-full h-200 bg-[#010202]">
                <About></About>
            </section>

            <section id="tech-stack" className="w-full h-150 flex items-center  bg-[#010202] border border-red-500">
                <TeckStack></TeckStack>
            </section>
        </main>
    );
};

export default Home;