import {BrowserRouter,Routes,Route} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';
import Home from './pages/Home';
import Header from './components/Header';

export default function App() {
  return (
   
    <BrowserRouter>
     <Header/>
    
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Home />} />

    </Routes>
    </BrowserRouter>
  )
}
