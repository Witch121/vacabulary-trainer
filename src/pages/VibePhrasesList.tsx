import React from "react";
import { useAuth } from "./userInfo";

const VibePhrasesList: React.FC = () => {
    const { user } = useAuth();

const vibePhrases = [
    "It makes sense in my head. Unfortunately, I live outside it.",
    "Words fail, which is rude of them.",
    "Imagine a sentence that means exactly what I mean. That’s what I meant.",
    "Everyone’s on airplane mode with no instructions.",
    "Brains in freezers, souls on standby.",
    "It’s like I’m speaking Morse code in a silent film.",
    "My thoughts are pacing barefoot across glass.",
    "I feel like a song cut off mid-chorus.",
    "It’s not bad, just… blue-gray, like rain in an empty cathedral.",
    "I am entirely here, just not necessarily in the same dimension as you.",
    "Processing… please hold.",
    "I heard you. I just need to reassemble myself before replying.",
    "I exist mostly on caffeine and spite.",
    "Sorry, I was lost in an internal monologue. What were we saying?",
    "That sounds like the beginning of a short story I don’t want to be in.",
    "I’m not ignoring you. I’m just buffering.",
    "I’m emotionally available but poorly indexed.",
    "I feel like a bookshelf that’s lost its anchor.",
    "My brain is pacing in circles like a caged poet.",
    "Somewhere between a scream and a sigh.",
    "Today is giving ghost-in-the-library energy.",
    "My serotonin fell down a manhole. We’re looking for it.",
    "I’d love to talk about that, but my bandwidth just blue-screened.",
    "Let’s circle back to that thought when my soul isn’t leaking.",
    "Wow. That’s aggressively normal. Fascinating.",
    "I’m nodding, but only about 30% of me is here.",
    "I don’t disagree, but I do feel haunted now.",
    "Is this wisdom or just well-dressed dread?",
    "I’m always chasing the aesthetic of functional melancholy.",
    "Language is a fragile lie we’ve all agreed to tell.",
    "Everything’s fine, but in a postmodern, metaphorical way.",
    "It’s not a crisis, it’s character development.",
    "Ah, the protagonist arrives.",
    "May your coffee be strong and your existential dread manageable.",
    "Goodbye, I vanish like a subplot unresolved.",
    "Nice to see you. Let’s pretend time is real.",
    "Farewell. Tell the crows I said hello."
]

return (
    user ? (
        <>
            <ul className="list bg-base-100 shadow-md">
                <li className="p-4 pb-2 text-lg opacity-60 tracking-wide">Vibe phrases for daily use</li>
                {vibePhrases.map((phrase, idx) => (
                    <li key={idx} className="list-row px-4 py-2 border-b last:border-b-0 text-base text-gray-800">
                        {phrase}
                    </li>
                ))}
            </ul>
        </>
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
    )
)

}

export default VibePhrasesList;
