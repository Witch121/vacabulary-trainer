import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "./userInfo";

interface Answers {
  sentenceArmor: string;
  dailyCloak: string;
  thoughtTranslation: string;
  threeMonologue: string;
  wordOfTheDAY: string;
  vibePhrase: string;
  memoryMuscle: string;
  date: string;
}

const QuestionsForm: React.FC = () => {
  const { user } = useAuth();
  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [answer, setAnswer] = useState<Answers>({
    sentenceArmor: "",
    dailyCloak: "",
    thoughtTranslation: "",
    threeMonologue: "",
    wordOfTheDAY: "",
    vibePhrase: "",
    memoryMuscle: "",
    date: ""
  });

  const handleChange = (name: keyof Answers, value: string) => {
    setAnswer((prev) => ({ ...prev, [name]: value }));
  };

  const addAnswers = async () => {
    if (!user?.uid) {
      setToastMsg("Please sign in first.");
      setToastType("error");
      setTimeout(() => setToastMsg(""), 4000);
      return;
    }

    if (!answer.date) {
      setToastMsg("Please select a date.");
      setToastType("error");
      setTimeout(() => setToastMsg(""), 4000);
      return;
    }


    try {
      await addDoc(collection(db, "answers"), {
        ...answer,
        uid: user.uid,
        createdAt: new Date()
      });
      console.log("Answers added successfully");
      setToastMsg(`Answers saved for ${answer.date}`);
      setToastType("success");
      resetForm();
    } catch (error) {
      console.error("Error adding answers:", error);
      setToastMsg("Failed to save answers.");
      setToastType("error");
    } finally {
      setTimeout(() => setToastMsg(""), 4000);
    }
  };

  const resetForm = () => {
    setAnswer({
      sentenceArmor: "",
      dailyCloak: "",
      thoughtTranslation: "",
      threeMonologue: "",
      wordOfTheDAY: "",
      vibePhrase: "",
      memoryMuscle: "",
      date: ""
    });
  };

  const fields = [
    { name: "sentenceArmor", label: "Sentence Armor", prompt: "Write one sentence that makes you sound powerful." },
    { name: "dailyCloak", label: "Daily Cloak", prompt: "Pick a vibe word for the day." },
    { name: "thoughtTranslation", label: "Thought Translation", prompt: "Messy thought + poetic/sarcastic/punchy rewrites." },
    { name: "threeMonologue", label: "3-Sentence Monologue", prompt: "Literal, metaphorical, emotional sentence." },
    {   name: "wordOfTheDAY",
        label: "Word of the Day",
        prompt: (
          <>
            New word, your definition, used in a sentence. You can use&nbsp;
            <a
              href="https://www.merriam-webster.com/word-of-the-day"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              this link
            </a>
            &nbsp;for help.
          </>
        )
      },
      { name: "vibePhrase",
        label: "Vibe Phrase Practice",
        prompt: (
          <>
            Use a phrase in a real/fake conversation. For inspiration you can use&nbsp;
            <a
              href="/vibePhrasesList"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              this link
            </a>
            &nbsp;for help.
          </>
        )
      },
      { name: "memoryMuscle", label: "Memory Muscle", prompt: "Write down 3 “boring” words you said today (like “good,” “hard,” “tired”). Write 1 or 2 synonyms or replacements for each that feel like you." }
      ];

  return (
    <>
    {user ? (
     <div className="mx-auto mt-16 max-w-3xl p-6 bg-white shadow rounded">
      {toastMsg && (
        <div className="toast toast-top toast-center z-50">
          <div className={`alert alert-${toastType}`}>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-center">Daily Ritual: Language, Vibes, and Thought Experiments</h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={answer.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {fields.map(({ name, label, prompt }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-semibold text-gray-900">
                {label}
              </label>
              <p className="text-sm text-gray-500 mb-1">{prompt}</p>
              <textarea
                id={name}
                name={name}
                rows={4}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                value={answer[name as keyof Answers]}
                onChange={(e) => handleChange(name as keyof Answers, e.target.value)}
              />
            </div>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              onClick={addAnswers}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Save Today’s Magic
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-md bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-400"
            >
              Wipe the Slate
            </button>
          </div>
        </form>
      </div>
    ) : (
      <div className="mt-20 text-center max-w-2xl mx-auto">
        <blockquote className="italic text-xl text-gray-700">
          “Unclose your mind. You are not a prisoner. You are a bird in flight, searching the skies for dreams.”
        </blockquote>
        <p className="mt-4 text-gray-600">
          — Haruki Murakami, <em>Hard-Boiled Wonderland and the End of the World</em>
        </p>
        <p className="mt-6">
          Please <a href="/signin" className="text-indigo-600 font-medium hover:underline">sign in</a> to fill out your daily questionnaire.
        </p>
      </div>
    )}
    </>
    );
  }
     

export default QuestionsForm;
