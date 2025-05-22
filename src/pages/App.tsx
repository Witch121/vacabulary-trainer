import '../styles/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./userInfo";
import NavBar from "./NavBar";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import SignUp from "./SignUp";
import QuestionsForm from './QuestionsForm';
import Home from './Home';
import PrevAnswers from './PrevAnswers';
import VibePhrasesList from './VibePhrasesList'



function App() {

  return (
    <>
    <Router>
      <AuthProvider>

        <main className="MainSpace">
        <NavBar />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questions" element={<QuestionsForm />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/prevAnswers" element={<PrevAnswers />} />
            <Route path="/vibePhrasesList" element={<VibePhrasesList />} />

          </Routes>
        </main>
          <footer className="footer sm:footer-horizontal footer-center text-base-content p-4">
            <aside>
              <p>© {new Date().getFullYear()} — All rights reserved by Unicorn’s Soul & Me.</p>
              <p>Crafted in cooperation with insomnia, stubbornness, and whatever free resources I could conjure.</p>
            </aside>

          </footer>   
      </AuthProvider>
    </Router>
    </>
  )
}

export default App
