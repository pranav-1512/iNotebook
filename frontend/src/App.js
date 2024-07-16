import './App.css';
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteState from './context/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Alert from './components/Alert';
import Profile from './components/Profile';

function App() {
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({name:"", email:"", date:""});

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <Routes className="container">
            <Route path='/' element={<Home showAlert={showAlert} />} />
            <Route path='/about' element={<About />} />
            <Route path='/profile' element={<Profile user={user}  />} />
            <Route path='/login' element={<Login showAlert={showAlert} user={user} setUser={setUser} />} />
            <Route path='/signup' element={<Signup showAlert={showAlert} />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
