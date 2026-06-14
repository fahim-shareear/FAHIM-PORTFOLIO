import profleImg from "../../assets/Profileimg.jpg";



const About = () => {
    return (
        <div id="about">
            <div>
                <div>
                    <img src={profleImg} alt={profleImg} />
                </div>
                <div>
                    <h1>Hey I am <span>Fahim Shareear</span></h1>
                    <p>Full Stack Developer from Bangladesh. I build fast , scalable web apps using Next.js Ract.js and Node.js. Passionate about bulding clean UI and solid backend architecture.</p>
                </div>
            </div>
        </div>
    );
};

export default About;