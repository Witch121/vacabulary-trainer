import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "./userInfo";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Answers {
  uid: string;
  sentenceArmor: string;
  dailyCloak: string;
  thoughtTranslation: string;
  threeMonologue: string;
  wordOfTheDAY: string;
  vibePhrase: string;
  memoryMuscle: string;
  date: string;
}

const getISODate = (date: Date) => {
  // Get local date in YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const PrevAnswers: React.FC = () => {
  const { user } = useAuth();
  const [answersMap, setAnswersMap] = useState<Map<string, Answers>>(new Map());
  const [selectedAnswer, setSelectedAnswer] = useState<Answers | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchDates = async () => {
      if (!user) return;
      const q = query(collection(db, "answers"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);

      const map = new Map<string, Answers>();
      snapshot.docs.forEach((doc) => {
        const data = doc.data() as Answers;
        map.set(data.date, data);
      });
      setAnswersMap(map);
    };

    fetchDates();
  }, [user]);

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month" && answersMap.has(getISODate(date))) {
      return "highlight";
    }
    return null;
  };

  const handleDateClick = (value: Date) => {
    const answer = answersMap.get(getISODate(value));
    if (answer) setSelectedAnswer(answer);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setSelectedAnswer(null);
    }
  };

  useEffect(() => {
    if (selectedAnswer) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedAnswer]);

  return (
    <div className="calendar-container ">
      <h2 className="text-2xl font-bold mb-4">📆 Answer Calendar</h2>
    <div className="flex flex-row gap-8 min-h-screen items-start">
      <div className="space-y-6 text-center">
        <Calendar
          tileClassName={tileClassName}
          onClickDay={handleDateClick}
          calendarType="iso8601"
        />
      </div>

      {selectedAnswer && (
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl relative"
            style={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setSelectedAnswer(null)}
              aria-label="Close"
              type="button"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">
              🗓️ Archive Entry — {new Date(selectedAnswer.date).toDateString()}: Echoes from that day 
              
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900">Sentence Armor</label>
                <textarea
                  readOnly
                  className="block w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 border border-gray-300"
                  value={selectedAnswer.sentenceArmor}
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Daily Cloak</label>
                <textarea
                  readOnly
                  className="block w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 border border-gray-300"
                  value={selectedAnswer.dailyCloak}
                  rows={1}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Thought Translation</label>
                <textarea
                  readOnly
                  className="block w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 border border-gray-300"
                  value={selectedAnswer.thoughtTranslation}
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Three Monologue</label>
                <textarea
                  readOnly
                  className="block w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 border border-gray-300"
                  value={selectedAnswer.threeMonologue}
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Word of the Day</label>
                <textarea
                  readOnly
                  className="block w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 border border-gray-300"
                  value={selectedAnswer.wordOfTheDAY}
                  rows={1}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Vibe Phrase</label>
                <textarea
                  readOnly
                  className="block w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 border border-gray-300"
                  value={selectedAnswer.vibePhrase}
                  rows={1}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Memory Muscle</label>
                <textarea
                  readOnly
                  className="block w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 border border-gray-300"
                  value={selectedAnswer.memoryMuscle}
                  rows={2}
                />
              </div>
            </form>
          </div>
      )}
    </div>
  </div>
  );
};

export default PrevAnswers;