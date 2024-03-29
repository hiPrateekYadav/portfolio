import { useState } from "react";
import "./works.scss"

export default function Works() {

  const [currentSlide,setCurrentSlide] = useState(0);

  const data = [
    {
      id: 1,
      icon: "/assets/blockchain.png",
      title: "Defi App",
      desc:
        "Full stack Defi website, in simple words a cryptocurrency banking service. In which you can stake your ERC20 coins and also get Interest on it in terms of DAPP coins.",
      img:
        "https://th.bing.com/th/id/OIP.7Ge3qwTbHVdzuRxiRiEo4gHaLH?pid=ImgDet",
      link: "https://github.com/hiPrateekYadav/Defi-App-Full-stack",
    },
    {
      id: 2,
      icon: "/assets/globe.png",
      title: "Email Verification using Django(via OTP)",
      desc:
        "Used HTML,CSS and a bit JS in frontend and Django as backend with functionality such as Create new user, Email verification, User log in and Forget password. ",
      img:
        "https://i.stack.imgur.com/p5LQO.png",
      link: "https://github.com/hiPrateekYadav/website",
    },
    {
      id: 3,
      icon: "/assets/mobile.png",
      title: "CryptoFun",
      desc:
        "Single page WebApp without using React. Uses 2 APIs simultaneously to give CryptoCurrecy prices and news to predict their future prices (with Notes feature). Build by using HTML,CSS and JS",
      img:
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/10/attachment_100040756-e1538485934255.jpeg?auto=format&q=60&fit=max&w=930",
      link: "https://github.com/hiPrateekYadav/Crypto-Fun",
    },
    {
      id: 4,
      icon: "/assets/writing.png",
      title: "To-Do List App",
      desc:
        "A to-do list application to help organize your tasks and manage your time better. Build using Django, Python, Html, CSS.",
      img:
        "https://i.pinimg.com/originals/a9/f6/94/a9f69465d972a004ad581f245d6ad581.jpg",
      link: "https://github.com/hiPrateekYadav/todos",  
    },
    // {
    //   id: 4,
    //   icon: "/assets/writing.png",
    //   title: "Schedule Your Day",
    //   desc:
    //     "A app to always be on time. Build using Html, CSS, JS.",
    //   img:
    //     "https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/10/attachment_100040756-e1538485934255.jpeg?auto=format&q=60&fit=max&w=930",
    // },
  ];

  const handleClick= (way)=>{
    way === "left" ? setCurrentSlide(currentSlide > 0 ? currentSlide-1 : data.length-1) : setCurrentSlide(currentSlide < data.length-1 ? currentSlide+1 : 0);
  }

  return (
    <div className='works' id='works'>
      <div className="slider" style={{transform:`translateX(-${currentSlide * 100}vw)`}}>
        {data.map(d =>(
        <div className="container">
          <div className="item">
            <div className="left">
              <div className="leftContainer">
                <div className="imgContainer">
                  <img src={process.env.PUBLIC_URL + d.icon} alt="" />
                </div>
                <h2>{d.title}</h2>
                <p>{d.desc}</p>
                <span><a target="_blank" rel="noopener noreferrer" href={d.link}>View Project</a></span>
              </div>
            </div>
            <div className="right">
              <img src={d.img} alt=""
              />
            </div>
          </div>
        </div>))}
      </div>
      <img src={process.env.PUBLIC_URL + '/assets/arrow.png'} className="arrow left" alt="" onClick={()=>handleClick("left")}/>
      <img src={process.env.PUBLIC_URL + '/assets/arrow.png'} className="arrow right" alt="" onClick={()=>handleClick("right")}/>
    </div>
  );
}
