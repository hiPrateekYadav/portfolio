import "./testimonials.scss"

export default function Testimonials() {
  const data = [
    {
      id: 1,
      name: "Full Stack Developer",
      title: "at Embifi",
      img:
        "https://i.tracxn.com/logo/company/embifi.in_Logo_f11aed95-4a39-4ab8-a572-8f84d350f240.jpg?height=120&width=120",
      icon: "/assets/linkedin.png",
      desc:
        "Worked on React and Node with MongoDb. Designed Architecture for Loan Collection and Credit Rule Engine. Handled all DevOps tasks also. ",
      link: "https://in.linkedin.com/company/embifi",
      wb: "https://embifi.in/"
    },
    {
      id: 2,
      name: "Assistant Teacher",
      title: "at Coding Blocks",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSskwe0XTRraSKilXCfbRPZAqX2zx0OA0C2xA&usqp=CAU",
      icon: "/assets/youtube.png",
      desc:
        " Solving doubts and helping 50+ students enrolled in Data Structures and Algorithms course in offline as well as online mode. ",
      featured: true,
      link: "https://www.youtube.com/c/CodingBlocksIndia/featured",
      wb: "https://codingblocks.com/"
    },
    {
      id: 3,
      name: "Web Developer Intern",
      title: "at EnR Consultancy",
      img:
        "https://engagenreap.com/wp-content/uploads/2023/02/cropped-enr.png",
      icon: "/assets/twitter.png",
      desc:
        " Developed various websites for startups. Worked on React, Django. Created design on client request. ",
      link: "https://twitter.com/services_enr?lang=en",
      wb: "https://www.fiverr.com/"
    },
  ];
  return (
    <div className="testimonials" id="testimonials">
      <h1>Work Experience / Internships</h1>
      <div className="container">
        {data.map(d => (
          <div className={d.featured ? "card featured" : "card"}>
            <div className="top">
            <a target="_blank" rel="noopener noreferrer" href={d.wb}><img src={process.env.PUBLIC_URL + '/assets/right-arrow.png'} className="left" alt="" /></a>
              <img className="user" src={d.img} alt="" />
              <a target="_blank" rel="noopener noreferrer" href={d.link}><img className="right" src={process.env.PUBLIC_URL + d.icon} alt="" /></a>
            </div>
            <div className="center">
              {d.desc}
            </div>
            <div className="bottom">
              <h3>{d.name}</h3>
              <h4>{d.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
