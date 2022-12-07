import "./intro.scss"
import { init } from 'ityped'
import { useEffect, useRef } from "react"

export default function Intro() {
  const textRef = useRef();

  useEffect(()=>{
    init(textRef.current, { 
      showCursor: false, 
      backSpeed:  60,
      backDelay:  1500,
      strings: ['Computer Science Engineer', 'Developer',  'Freelancer' ] ,
    });
  }, []);

  return (
    <div className="intro" id="intro">
      <div className="left">
        <div className="imageContainer">
          <img src="assets/man.png" alt="" />
        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <h2>Hi There, I'm</h2>
          <h1>Prateek Yadav</h1>
          <h3>. <span ref={ textRef }></span></h3>
          <a href="assets/Resume.pdf" download>Download CV</a>
        </div>
        <a className="linkk" href="#portfolio">
          <img src="assets/down.png" alt="" />
        </a>
      </div>
    </div>
  )
}