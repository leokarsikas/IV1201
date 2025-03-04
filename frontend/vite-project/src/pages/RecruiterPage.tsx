import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import "../styling/Hero.css"
import heroImage from '../assets/hero-best.png'; // Adjust path to the image
import Button from '../components/button';

export default  function RecruiterPage() {
    const navigate = useNavigate();
    
      function goToApplication(){
        navigate('/')
      }
  
    return (
        <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <Navbar></Navbar>
         <div className="hero-items">
          <div className='submit-container'>
          </div>
         </div>
        </div>
      
    )
  }