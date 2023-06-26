import { useState } from 'react';
import './contact.scss'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [message, setMessage] = useState(false);

  const handleSubmit=(e)=>{
    e.preventDefault();

    emailjs.sendForm('service_on9jxpl', 'template_7v5vhir', e.target, 'amKeh3bS85YjLquPn'); 
    setMessage(true);
  }

  return (
    <div className='contact' id='contact'>
      <div className="left">
        <img src={process.env.PUBLIC_URL + '/assets/shake.svg'} alt="" />
      </div>
      <div className="right">
        <h2>Contact.</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name='email_from' placeholder='Your Email'/>
          <textarea name='message' placeholder='Your Message'></textarea>
          <button type='submit'>Send</button>
          {message && <span>Thanks, I'll reply ASAP :)</span>}
        </form>
      </div>
    </div>
  )
}
