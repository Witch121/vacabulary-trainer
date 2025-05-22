import { useState } from "react";
import { auth, db } from "../firebase";
import { reload, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import readingCatLogo from "../assets/about_img.jpg";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const lastSession = new Date();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          lastSession: lastSession,
        });
      }
      // reload the page 
      await reload(auth.currentUser!);
      navigate("/");
        } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("auth/invalid-credential")) {
          alert("Invalid credentials. Please check your email and password.");
        } else if (err.message.includes("auth/network-request-failed")) {
          alert("Network error. Please check your internet connection.");
        }
        setError(err.message);
        
      }}
    }

  return (
    <>
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={readingCatLogo}
            className="mx-auto h-30 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
            Sign in to your account <br/>
            Welcome back, word-weaver.
          </h2>
        </div>
        {error && <p>{error}</p>}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm/6 font-medium">
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255} 
                  required
                />
              </div>
            </div>
            {email.length > 255 && <p className="error-message">Email cannot exceed 255 characters.</p>}

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={255} 
                  required                
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={!email || !password}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6">
            Not a member?{' '}
            <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Start today to get your fancy language!
            </a>
          </p>
        </div>
      </div>
    </>
    
  );
};

export default SignIn;