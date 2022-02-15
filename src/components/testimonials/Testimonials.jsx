import "./testimonials.scss"

export default function Testimonials() {
  const data = [
    {
      id: 1,
      name: "Python Mentor",
      title: "as Home Tutions",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7e3ptfTfB3nPgnrSF9nFt1hlaL6axta_srQ&usqp=CAU",
      icon: "assets/globe.png",
      desc:
        "Worked as a mentor, given tutions for beginer students in Python, DSA. ",
      link: "https://www.python.org",
      wb: "https://www.python.org"
    },
    {
      id: 2,
      name: "Assistant Teacher",
      title: "at Coding Blocks",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSskwe0XTRraSKilXCfbRPZAqX2zx0OA0C2xA&usqp=CAU",
      icon: "assets/youtube.png",
      desc:
        " Solving doubts and helping 50+ students enrolled in Data Structures and Algorithms course in offline as well as online mode. ",
      featured: true,
      link: "https://www.youtube.com/c/CodingBlocksIndia/featured",
      wb: "https://codingblocks.com/"
    },
    {
      id: 3,
      name: "Freelancer",
      title: "at Fiverr",
      img:
        "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/5c837aac7c42de1f9f125cff37ab2c70-1612076004546/fiverr-og-logo.png",
      icon: "assets/twitter.png",
      desc:
        "I have done many work on fiverr like Website Building, Bug Fixing etc.",
      link: "https://twitter.com/fiverr",
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
            <a target="_blank" rel="noopener noreferrer" href={d.wb}><img src="assets/right-arrow.png" className="left" alt="" /></a>
              <img className="user" src={d.img} alt="" />
              <a target="_blank" rel="noopener noreferrer" href={d.link}><img className="right" src={d.icon} alt="" /></a>
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
