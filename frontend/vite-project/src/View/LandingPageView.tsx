import { useNavigate } from 'react-router-dom';
import '../App.css'


export default  function LandingPageView() {
  const navigate = useNavigate();

  function goToApplication(){
    navigate('/application')
    console.log('go to application')
  }

  return (
      <div>
       <div className="center-div"> Welcome to the recruting system </div>
        <button onClick={goToApplication}>Start your application</button>
      </div>
    
  )
}

