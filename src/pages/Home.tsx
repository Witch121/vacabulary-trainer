import React, { type FormEvent } from "react";
import { useAuth} from "./userInfo";
import { useNavigate } from "react-router-dom";
import bookshelfBackground from "../assets/bookshelf.jpg";

const Home: React.FC = () => {
  const { user, userData  } = useAuth();
  const navigate = useNavigate();
  console.log(userData?.nickname)

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    navigate("/questions");
  };

  return (
    <>
      <div className="container home">
        <section className="hero relative min-h-screen overflow-hidden" data-theme="dark">
          <div
            className="absolute inset-0 bg-cover bg-center blur-[8px] brightness-60 transition-transform duration-500"
            style={{
              backgroundImage: `url(${bookshelfBackground})`,
              zIndex: 0,
            }}
          />
          {user  && userData ? (
            <div className="hero-content relative z-10 text-center text-white px-4">
              <div className="textToBtnMinimalVibe">
                <div className="user-greeting">
                    <h2 className="text-5xl font-bold">
                    👋 Hello, <strong>{userData.nickname || "User"}</strong>!
                    </h2>
                  <p className="py-6 text-xl">
                    This quiet little word sanctuary exists because I needed it to. Now it exists for you, too.
                  </p>
                  <button className="btn btn-secondary" onClick={handleClick}>
                    Go to Questions
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hero-content relative z-10 text-center text-white px-4">
                <div className="hero-content text-center">
                  <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1> <br/>
                    <h2 className="text-xl">
                      “Unclose your mind. You are not a prisoner. You are a bird in flight, searching the skies for dreams.” <br/>
                      ― Haruki Murakami, <em>Hard-Boiled Wonderland and the End of the World</em><br/>
                      To enter the library, please <a href="/signin" className="link link-secondary">sign in</a>.
                    </h2>
                    <div className=" psText">
                      <p className="text-sm text-info">P.S. Don’t worry—I don’t collect your personal data. Signing in simply helps keep each user’s responses separate.</p>
                    </div>
                  </div>
                </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;