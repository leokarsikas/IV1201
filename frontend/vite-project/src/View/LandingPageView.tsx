import { useNavigate } from 'react-router-dom';
import Navbar from '../Custom Components/navbar';
import "../styling/Hero.css"
import heroImage from '../assets/hero-best.png'; // Adjust path to the image
import Button from '../Custom Components/button';



export default  function LandingPageView() {
  const navigate = useNavigate();

  function goToApplication(){
    navigate('/application')
  }

  return (
      <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <Navbar></Navbar>
       <div className="hero-items">
        <div className='submit-container'>
        <h2>Drömjobbet väntar</h2>
        <p>👉 Sök nu och ta chansen att bli en del av vår framgångssaga!</p>
        <Button text="Ansök nu" onClick={goToApplication} padding='15px 100px' borderRadius='99px'></Button>
        <p style={{color:'white', fontWeight:'600', fontSize:'12px'}}>För att ansöka till våra tjänser måste du vara registrerad</p>
        </div>
       </div>
      </div>
    
  )
}

