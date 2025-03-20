import { BrowserRouter as Router , Routes , Route, Navigate} from "react-router-dom";
import LandingPage from "./pages/Register/LandingPage";
import Login from "./pages/Register/Login";
import Signup from "./pages/Register/Signup";
import EmailVerification from "./pages/Register/EmailVerification";
import ResetPassword from "./pages/Register/ResetPassword";
import Home from "./pages/Home/Home";
import Story from "./pages/Home/Story";
import Summarization from "./pages/Home/Summarziation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="email-verify" element={<EmailVerification />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="home" element={<Home />} />
        <Route path="story" element={<Story />} />
        <Route path="summarization" element={<Summarization />} />
      </Routes>
    </Router>
  );
}

export default App;