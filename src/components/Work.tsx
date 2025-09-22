import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  // 🔹 Replace this array with your own projects
  const projects = [
    {
      id: 1,
      name: "Project One",
      category: "Web Development",
      tools: "React, Node.js, MongoDB",
      image: "/images/project1.webp",
    },
    {
      id: 2,
      name: "Project Two",
      category: "AI/ML",
      tools: "Python, TensorFlow, OpenCV",
      image: "/images/project2.webp",
    },
    {
      id: 3,
      name: "Project Three",
      category: "Mobile App",
      tools: "React Native, Firebase",
      image: "/images/project3.webp",
    },
    {
      id: 4,
      name: "Project Four",
      category: "Game Dev",
      tools: "Unity, C#",
      image: "/images/project4.webp",
    },
    {
      id: 5,
      name: "Project Five",
      category: "EdTech",
      tools: "Next.js, PostgreSQL",
      image: "/images/project5.webp",
    },
    {
      id: 6,
      name: "Project Six",
      category: "AR/VR",
      tools: "Three.js, WebXR",
      image: "/images/project6.webp",
    },
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
