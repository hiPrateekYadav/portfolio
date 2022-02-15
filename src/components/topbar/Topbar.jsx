import "./topbar.scss"
import {Person,Mail,LinkedIn} from "@material-ui/icons"

export default function Topbar({ menuOpen , setMenuOpen }) {
  return (
    <div className={"topbar " + (menuOpen && "active")}>
      <div className="wrapper">
        <div className="left">
          <a href="#intro" className="logo">genius.</a>
          <div className="itemContainer">
            <Person className="icon"/>
            <span><a target="_blank" rel="noopener noreferrer" href="tel:+91 9318378389">+91 9318378389</a></span>
          </div>
          <div className="itemContainer">
            <Mail className="icon"/>
            <span><a target="_blank" rel="noopener noreferrer" href = "mailto: myselfraoo@gmail.com">myselfraoo@gmail.com</a></span>
          </div>
          <div className="itemContainer">
            <LinkedIn className="icon"/>
            <span><a target="_blank" rel="noopener noreferrer" href = "https://www.linkedin.com/in/prateek-yadav-99a689209">prateek-yadav-99a689209</a></span>
          </div>
        </div>
        <div className="right">
          <div className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>
            <span className="line1"></span>
            <span className="line2"></span>
            <span className="line3"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
