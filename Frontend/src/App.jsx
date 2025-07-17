import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/DashBoard';
import Donar from './Pages/Doner';
import Receive from './Pages/Receive';
import MyDonations from './Components/MyDonation';
import Profile from './Pages/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/donar' element={<Donar />} />
        <Route path='/receive' element={<Receive />} />
        <Route path='/Mydonations' element={<MyDonations />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
