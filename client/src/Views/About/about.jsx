import { Link } from "react-router-dom";

import myPhoto from "../../assets/perfil.png";
import github from "../../assets/logo-GitHub.svg";
import instagram from "../../assets/logo-Intagram.svg";
import linkedIn from "../../assets/logo-Linkedin.svg";

import style from "./About.module.css";

const About = () => {
  return (
    <div className={style.about}>
      <div className={style.main}>
        <img src={myPhoto} />
        <div className={style.aboutText}>
          <h1>About me ↴</h1>
          <h5>
            Full-Stack <span>Developer</span>
          </h5>
          <p>
            "Hello, my name is Aaron Aroma, and I'm originally from Utah, United
            States, but I've been living in Argentina since I was 4 years old.
            I'm passionate about web development and have been studying at
            SoyHenry. In my free time, I enjoy engaging in sports and furthering
            my studies. I firmly believe in hard work and always strive to be
            the best at what I do. I am constantly on the lookout for
            opportunities to grow personally and professionally. If you have any
            opportunities or just want to chat, feel free to get in touch with
            me!"
          </p>
          <h4>Follow me on social media!</h4>
          <div className={style.social}>
            <Link to="https://github.com/AaronAroma" target="_blank">
              <img src={github} />
            </Link>
            <Link to="https://www.linkedin.com/in/aaron-aroma/" target="_blank">
              <img src={linkedIn} />
            </Link>
            <Link to="https://www.instagram.com/aaronaroma/" target="_blank">
              <img src={instagram} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
