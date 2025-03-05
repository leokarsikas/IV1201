import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import "../styling/Hero.css"
import heroImage from '../assets/hero-test.png'; // Adjust path to the image
import Button from '../components/button';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuthLogin';
//import { useAuth } from "../hooks/useAuthLogin";



export default  function LandingPage() {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false)

  const {role, userName} = useAuth();
  function goToApplication(){
    if(!userName){
      setShowWarning(true)
      return 
    }
    setShowWarning(false)
    navigate('/application')
  }

  function goToApplicationAsAdmin(){
    navigate('/recruiter')
  }

  return (
    <>
    {role === 1 ? (
      <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <Navbar></Navbar>
       <div className="hero-items">
        <div className='submit-container'>
        <h2>Välkommen</h2>
        <p>Granska och redigera ansökningar genom att trycka på knappen nedan</p>
        <Button className='submit-container-button' text="Granska ansökningar" onClick={goToApplicationAsAdmin} padding='15px 100px' borderRadius='99px'></Button>
        </div>
       </div>
      </div>)
      :(<div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <Navbar></Navbar>
       <div className="hero-items">
        <div className='submit-container'>
        <h2>Drömjobbet väntar</h2>
         <p>👉 Sök nu och ta chansen att bli en del av vår framgångssaga!</p>
       
        <Button className='submit-container-button' text="Ansök nu" onClick={goToApplication} padding='15px 100px' borderRadius='99px'></Button>
        {showWarning && <p style={{color:'white', fontWeight:'500', fontSize:'16px'}}>För att ansöka till våra tjänser måste du vara registrerad</p>}
        </div>
       </div>
      </div>)
      }
      </>
  )
}

