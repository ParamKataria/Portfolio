import { MdArrowOutward} from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:example@mail.com" data-cursor="disable">
                paramkataria2808@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+9199999999" data-cursor="disable">
                +1 902-452-2808
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/ParamKataria"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/param-kataria-b59934346/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            
            
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Param Kataria</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
