import { useNavigate } from 'react-router-dom';
import '../App.css'


function App() {
  const navigate = useNavigate();

  function goToApplication(){
    navigate('/users')
  }

  return (
      <div>
       <div className="center-div"> Welcome to the recruting system </div>
        <button onClick={goToApplication}>Start your application</button>
      </div>
    
  )
}

export default App
