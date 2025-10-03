import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

// Chatbot Quiz Component
const StressBot = ({ onFinish, userName }) => {
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const chatAreaRef = useRef(null);

  const quizQuestions = [
    {
      question: "Hi there! I'm here to help you check in with yourself. First, how has your sleep quality been over the last week?",
      options: [
        { text: "Excellent, I feel rested.", score: 0 },
        { text: "Fair, some tossing and turning.", score: 1 },
        { text: "Poor, I often wake up tired.", score: 2 },
        { text: "Very poor, I can barely sleep.", score: 3 }
      ]
    },
    {
      question: "Have you noticed any significant changes in your appetite recently?",
      options: [
        { text: "No change, it's been normal.", score: 0 },
        { text: "A little more or less than usual.", score: 1 },
        { text: "My appetite has clearly increased/decreased.", score: 2 },
        { text: "I have no appetite or I'm overeating constantly.", score: 3 }
      ]
    },
    {
      question: "How would you describe your general mood lately?",
      options: [
        { text: "Positive and cheerful.", score: 0 },
        { text: "A bit down or irritable at times.", score: 1 },
        { text: "Mostly anxious or sad.", score: 2 },
        { text: "Feeling overwhelmed and hopeless.", score: 3 }
      ]
    },
    {
      question: "And your ability to focus on tasks?",
      options: [
        { text: "Sharp and focused.", score: 0 },
        { text: "I get distracted sometimes.", score: 1 },
        { text: "It's been hard to concentrate.", score: 2 },
        { text: "I can't focus on anything at all.", score: 3 }
      ]
    },
    {
      question: "How much interest or pleasure have you felt in doing things you normally enjoy?",
      options: [
        { text: "My usual high level of interest.", score: 0 },
        { text: "A little less than usual.", score: 1 },
        { text: "Noticeably less interest.", score: 2 },
        { text: "Almost no interest in anything.", score: 3 }
      ]
    },
    {
      question: "How often have you been bothered by feeling nervous, anxious, or on edge?",
      options: [
        { text: "Rarely or never.", score: 0 },
        { text: "On several days.", score: 1 },
        { text: "More than half the days.", score: 2 },
        { text: "Nearly every single day.", score: 3 }
      ]
    }
  ];

  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  const handleOptionSelect = (text, score) => {
    if (isQuizFinished) return;
    addMessage(text, 'user');
    setTotalScore(prev => prev + score);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const restartQuiz = () => {
    setMessages([]);
    setCurrentQuestionIndex(0);
    setTotalScore(0);
    setIsQuizFinished(false);
  };

  useEffect(() => {
    if (currentQuestionIndex < quizQuestions.length) {
      const currentQuestion = quizQuestions[currentQuestionIndex];
      setTimeout(() => addMessage(currentQuestion.question, 'bot'), 500);
    } else if (currentQuestionIndex === quizQuestions.length && !isQuizFinished) {
      setIsQuizFinished(true);
      let resultMessage = '';
      let advice = '';

      if (totalScore <= 6) {
        resultMessage = "Based on your answers, it seems your stress levels are likely low. That's great!";
        advice = "Keep up your healthy habits and continue prioritizing self-care!";
      } else if (totalScore <= 12) {
        resultMessage = "It appears you might be experiencing a moderate level of stress.";
        advice = "Consider relaxation techniques, short walks, or talking to friends/family.";
      } else {
        resultMessage = "Your responses suggest a high level of stress.";
        advice = "Please consider reaching out to a mental health professional or support network.";
      }

      setTimeout(() => addMessage(resultMessage, 'bot'), 500);
      setTimeout(() => addMessage(advice, 'bot'), 1500);
      setTimeout(() => addMessage("<strong>Disclaimer:</strong> This is not a medical diagnosis. Consult a professional if concerned.", 'bot'), 2500);

      onFinish(totalScore); // Send score to parent dashboard
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const currentOptions = !isQuizFinished && quizQuestions[currentQuestionIndex]?.options;

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl flex flex-col h-[90vh] font-sans mt-10">
      <div className="p-4 border-b bg-blue-600 text-white rounded-t-2xl">
        <h1 className="text-xl font-bold text-center">Mental Wellness Check-in</h1>
        <p className="text-sm text-center text-blue-100">A quick quiz to check on you</p>
      </div>

      <div ref={chatAreaRef} className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`rounded-lg p-3 max-w-xs md:max-w-md animate-fadeIn ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
        {isQuizFinished ? (
          <button
            onClick={restartQuiz}
            className="w-full bg-blue-600 text-white rounded-lg p-3 text-sm font-semibold hover:bg-blue-700"
          >
            Take the Quiz Again
          </button>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentOptions ? currentOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option.text, option.score)}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-400"
              >
                {option.text}
              </button>
            )) : <p className="text-center text-gray-500 text-sm animate-pulse">Thinking...</p>}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};

// Dashboard Component
export default function StressDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async currentUser => {
      if (currentUser) setUser(currentUser);
      else setUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleQuizFinish = (quizScore) => {
    let rec = "";
    if (quizScore <= 6) rec = "Low stress detected. Enjoy games & videos!";
    else if (quizScore <= 12) rec = "Moderate stress detected. Try CBT & relaxation.";
    else rec = "High stress detected. Professional support recommended.";
    setScore(quizScore);
    setRecommendation(rec);
    setSubmitted(true);
  };

  const handleRefill = () => {
    setSubmitted(false);
    setRecommendation(null);
    setScore(null);
  };

  if (loading) return <p className="p-6 mt-24 text-center text-purple-700 font-medium">Loading...</p>;

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-purple-800">Access Restricted</h2>
        <p className="text-purple-600 mt-2">Please login to access the Stress Dashboard</p>
        <Link to="/login">
          <button className="mt-6 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg transition w-full">
            Login / Sign Up
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 px-4 pb-28 bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50">
      {!submitted ? (
        <StressBot onFinish={handleQuizFinish} userName={user.displayName || user.email} />
      ) : (
        <div className="p-6 mt-6 max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold text-center text-purple-800">
            Welcome, {user.displayName || user.email}!
          </h2>

          {recommendation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl text-center">
                <h3 className="text-xl font-semibold mb-4 text-purple-800">Recommended for you</h3>
                <p className="text-gray-700 mb-6">{recommendation}</p>
                <button
                  onClick={() => setRecommendation(null)}
                  className="bg-purple-700 text-white px-6 py-2 rounded-xl hover:bg-purple-800 transition font-medium"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {/* Refill Quiz Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleRefill}
              className="bg-purple-700 text-white py-2 px-6 rounded-xl shadow-md hover:bg-purple-800 transition font-medium"
            >
              Refill Quiz
            </button>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div
              onClick={() => navigate("/cbt-therapy")}
              className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl flex flex-col items-center justify-center h-40 cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">CBT Therapy</h3>
              <p className="text-sm text-white/90 text-center">
                Personalized Cognitive Behavioral Therapy videos.
              </p>
            </div>

            <div
              onClick={() => navigate("/modules")}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl flex flex-col items-center justify-center h-40 cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">Psychology Modules</h3>
              <p className="text-sm text-white/90 text-center">
                Explore mental health exercises and modules.
              </p>
            </div>

            <div
              onClick={() => navigate("/expert-charts")}
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl flex flex-col items-center justify-center h-40 cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">Expert Charts</h3>
              <p className="text-sm text-white/90 text-center">
                Track your stress and mood patterns with charts.
              </p>
            </div>

            <div
              onClick={() => navigate("/games")}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl flex flex-col items-center justify-center h-40 cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">Games & Videos</h3>
              <p className="text-sm text-white/90 text-center">
                Relax and relieve stress with interactive content.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
