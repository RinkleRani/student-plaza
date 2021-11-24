import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Navigate to ="/home" />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
