import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Components/Signup.jsx';
import Login from './Components/login.jsx';
import Home from './Components/Home.jsx';
import ForgotPassword from './Components/ForgotPassword.jsx';
import Dashboard from './Components/Dashboard.jsx';

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path= "/signup" element= {<Signup />}></Route>
      <Route path= "/login" element= {<Login />}></Route>
      <Route path= "/" element= {<Home />}></Route>
      <Route path= "/forgotPassword" element= {<ForgotPassword />}></Route>
      <Route path = "/dashboard" element={<Dashboard />}></Route>


    </Routes>
    </BrowserRouter>
  )
}

export default App
