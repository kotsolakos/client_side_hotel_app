import './App.css'
import 'tachyons/css/tachyons.min.css';
import { Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import Navigation from './components/Navigation/navigation.component'
import SignIn from './components/Signin/signin.component.jsx';
import SignUp from './components/SignUp/signup.component';
import Home from './components/Home/home.component';
import Reserved from './components/Reserved/reserved.component';

        


function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigation isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}/>}>
          <Route path='home' element={<Home isSignedIn={isSignedIn}/>} />
          <Route path='reserved' element={<Reserved isSignedIn={isSignedIn}/>} />
          <Route index element={<SignIn setIsSignedIn={setIsSignedIn}/>} />
          <Route path='signup' element={<SignUp setIsSignedIn={setIsSignedIn}/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
