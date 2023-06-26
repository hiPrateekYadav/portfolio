import { useEffect, useState } from "react";
import PortfolioList from "../portfolioList/PortfolioList";
import "./portfolio.scss"
import {
  languagesPortfolio,
  webPortfolio,
  dsAlgoPortfolio,
  othersPortfolio,
  learningPortfolio,
  devOpsPortfolio
} from "../../data";

export default function Portfolio() {
  const [selected,setSelected] = useState("languages");
  const [data,setData] = useState([]);

  const list = [
    {
      id: "languages",
      title: "Languages",
    },
    {
      id: "web",
      title: "Web Dev",
    },
    {
      id: "dsAlgo",
      title: "DS-Algo",
    },
    // {
    //   id: "learning",
    //   title: "Learning",
    // },
    {
      id: "devops",
      title: "DevOps",
    },
    {
      id: "others",
      title: "Others",
    },
  ];

  useEffect(()=>{

    switch (selected) {
      case "languages":
        setData(languagesPortfolio);
        break;

      case "web":
        setData(webPortfolio);
        break;

      case "dsAlgo":
        setData(dsAlgoPortfolio);
        break;
        
      case "learning":
        setData(learningPortfolio);
        break;

      case "devops":
        setData(devOpsPortfolio);
        break;

      case "others":
        setData(othersPortfolio);
        break;

      default:
        setData(languagesPortfolio);
    }

  },[selected])

  return (
    <div className="portfolio" id="portfolio">
      <h1>Skills</h1>
      <ul>
        {list.map(item=>(
          <PortfolioList title={item.title} 
          active={ selected === item.id}
          setSelected = {setSelected}
          id={item.id}
          />
        ))}
      </ul>
      <div className="container">
        {data.map((d)=>(
          <div className="item">
          <img src={d.img} alt="" />
          <h3>{d.title}</h3>
        </div>
        ))}
      </div>
    </div>
  )
}
