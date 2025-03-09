import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import "../styling/Hero.css"
import heroImage from '../assets/hero-test.png'; // Adjust path to the image
import Button from '../components/button';
import { useState} from 'react';
import { useAuth } from '../hooks/useAuthLogin';
import { useTranslation } from 'react-i18next';



export default  function LandingPage() {
/* navigate() accesses the navigation object, to move between endpoints . */
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false)

  const { t} = useTranslation();
  const {role, userName} = useAuth();
 /**
  * The function `goToApplication` checks if a `userName` is provided, shows a warning if not, and
  * navigates to the '/application' route if the `userName` is present.
  * @returns If the `userName` is not set, the function will return and set the warning to be shown.
  * Otherwise, it will navigate to the '/application' route.
  */
  function goToApplication(){
    if(!userName){
      setShowWarning(true)
      return 
    }
    setShowWarning(false)
    navigate('/application')
  }

  /**
   * The function `goToApplicationAsAdmin` navigates to the '/recruiter' page.
   */
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
        <h2>{t("welcome")}</h2>
        <p>{t("landing-recruiter-granskning")}</p>
        <Button className='submit-container-button' text="Granska ansökningar" onClick={goToApplicationAsAdmin} padding='15px 100px' borderRadius='99px'></Button>
        </div>
       </div>
      </div>)
      :(<div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <Navbar></Navbar>
       <div className="hero-items">
        <div className='submit-container'>
        <h2>{t("dreamjob")}</h2>
         <p>{t("welcome-subtext")}</p>
       
        <Button className='submit-container-button' text={t("apply now")} onClick={goToApplication} padding='15px 100px' borderRadius='99px'></Button>
        {showWarning && <p style={{color:'white', fontWeight:'500', fontSize:'16px'}}>{t("welcome-error")}</p>}
        </div>
       </div>
      </div>)
      }
      </>
  )
}

