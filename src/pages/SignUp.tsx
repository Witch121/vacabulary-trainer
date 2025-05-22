import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import readingCatLogo from "../assets/about_img.jpg";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
        createdAt: new Date().toISOString(),
        allowedToUseLibrary: true,
        nickname: nickname,
      });
      navigate("/");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={readingCatLogo}
            className="mx-auto h-30 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">
            Sign up to create an account <br/>
            Summon your new self.
          </h2>
        </div>
        {error && <p>{error}</p>}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignUp} className="space-y-6">
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
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={255} 
                  required                
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="nickname" className="block text-sm/6 font-medium">
                  Nickname
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={255} 
                  required                
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 text-white font-semibold shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={!email || !password}
              >
                Sign 
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6">
            Aready a member?{' '}
            <a href="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign in!
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
