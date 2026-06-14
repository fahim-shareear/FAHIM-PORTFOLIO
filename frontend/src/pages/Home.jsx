import About from "./components/About";
import Banner from "./components/Banner";

const Home = () => {
    return (
        <main className="w-full" id="home">
            <section id="home" className="min-h-screen">
                <Banner />
            </section>

            <section id="about" className="min-h-screen px-6 py-16">
                <About />
            </section>

            <section id="tech-stack" className="min-h-screen px-6 py-16 flex items-center justify-center bg-base-200/30">
                <div className="max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Tech Stack</h2>
                    <p className="text-lg text-base-content/80">Add your technologies and tools here.</p>
                </div>
            </section>

            <section id="projects" className="min-h-screen px-6 py-16 flex items-center justify-center">
                <div className="max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Projects</h2>
                    <p className="text-lg text-base-content/80">Add your featured projects here.</p>
                </div>
            </section>

            <section id="certification" className="min-h-screen px-6 py-16 flex items-center justify-center bg-base-200/30">
                <div className="max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Certification</h2>
                    <p className="text-lg text-base-content/80">Add your certifications and courses here.</p>
                </div>
            </section>

            <section id="contact" className="min-h-screen px-6 py-16 flex items-center justify-center">
                <div className="max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-lg text-base-content/80">Add your contact details or form here.</p>
                </div>
            </section>
        </main>
    );
};

export default Home;