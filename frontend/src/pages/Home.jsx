import About from "./components/About";
import Banner from "./components/Banner";

const Home = () => {
    return (
        <main className="w-full" id="home">
            <section id="home" className="min-h-screen">
                <Banner />
            </section>

            <section id="about" className="w-full h-200 bg-[#010202]">
                <About></About>
            </section>
        </main>
    );
};

export default Home;