import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [mood, setMood] = useState("😊");
  const [stress, setStress] = useState(5);
  const [severity, setSeverity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Personalized Section state
  const [selectedGameUrl, setSelectedGameUrl] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  // Sample personalized games
  const personalizedGames = [
    { title: "Color Weave", url: "https://www.online-solitaire.com/" },
    { title: "Zen Blocks", url: "https://tetris.com/play-tetris" },
    { title: "Pixel Painter", url: "https://www.pixilart.com/draw" }
  ];

  // Sample personalized videos
  const personalizedVideos = [
    { title: "Mindfulness Exercise", url: "https://www.youtube.com/embed/1vx8iUvfyCY" },
    { title: "Breathing Technique", url: "https://www.youtube.com/embed/tEmt1Znux58" },
    { title: "Guided Meditation", url: "https://www.youtube.com/embed/inpok4MKVLM" }
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.severity) {
              setSeverity(data.severity);

              // AI-driven Mood & Stress
              if (data.severity === "High") {
                setMood("😢");
                setStress(9);
              } else if (data.severity === "Moderate") {
                setMood("😐");
                setStress(6);
              } else {
                setMood("😊");
                setStress(3);
              }
            }
            if (data.recommendation) setRecommendation(data.recommendation);
          }
        } catch (error) {
          console.error("Error fetching AI analysis:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100">
        <p className="text-purple-700 font-medium text-lg">Loading Dashboard...</p>
      </div>
    );
  }

  if (!user)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200 relative">
        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center transform transition hover:scale-105">
          <h2 className="text-4xl font-bold text-purple-700">Welcome to MindEase</h2>
          <p className="text-gray-600 mt-3">
            Login to access your personalized mental wellness dashboard
          </p>
          <Link to="/login">
            <button className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-2xl shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all w-full font-semibold">
              Login / Sign Up
            </button>
          </Link>
        </div>

        <div className="fixed bottom-10 w-full flex justify-center">
          <nav className="bg-white shadow-xl rounded-full px-8 py-4 flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 font-medium">Contact</Link>
          </nav>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-green-100 to-purple-100 relative pb-32">
      <div className="mt-24 p-6 max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-purple-700">
          Hello, {user.displayName || user.email}!
        </h1>

        {/* AI Stress Decision Section */}
        {severity && (
          <div
            className={`p-6 rounded-3xl shadow-2xl text-center transition transform hover:scale-105 ${
              severity === "High"
                ? "bg-gradient-to-r from-red-400 to-red-600 text-white"
                : severity === "Moderate"
                ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                : "bg-gradient-to-r from-green-400 to-green-600 text-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">AI Stress Analysis</h3>
            <p className="text-2xl font-bold">Your Stress Level: {severity}</p>
            {recommendation && (
              <p className="mt-2 text-white/90">{recommendation}</p>
            )}
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mood */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-3xl shadow-2xl text-center transform hover:scale-105 transition-all">
            <h3 className="font-semibold text-lg">Mood</h3>
            <div className="text-4xl my-3">{mood}</div>
            <p className="text-sm text-white/80">AI Selected</p>
          </div>

          {/* Stress */}
          <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-3xl shadow-2xl text-center transform hover:scale-105 transition-all">
            <h3 className="font-semibold text-lg">AI Stress Level</h3>
            <p className="text-2xl my-2">{stress}</p>
            <p className="text-sm text-white/80">Set by AI analysis</p>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-3xl shadow-2xl text-center transform hover:scale-105 transition-all">
            <h3 className="font-semibold text-lg">Quick Actions</h3>
            <div className="flex flex-col gap-3 mt-3">
              <Link to="/cbt">
                <button className="bg-white text-green-600 w-full py-2 rounded-2xl hover:bg-green-100 transition font-medium">
                  CBT Therapy
                </button>
              </Link>
              <Link to="/memory">
                <button className="bg-white text-green-600 w-full py-2 rounded-2xl hover:bg-green-100 transition font-medium">
                  Memory Journal
                </button>
              </Link>
              <Link to="/audio">
                <button className="bg-white text-green-600 w-full py-2 rounded-2xl hover:bg-green-100 transition font-medium">
                  Community Audio
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Personalized Section */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all">
          <h2 className="font-semibold text-xl mb-4 text-purple-700">Personalized Section</h2>

          {/* Games */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Games</h3>
            <div className="flex flex-wrap gap-4">
              {personalizedGames.map(game => (
                <button
                  key={game.title}
                  onClick={() => setSelectedGameUrl(game.url)}
                  className="bg-[#f4a261] text-white py-2 px-4 rounded-lg hover:bg-[#e76f51] transition font-medium"
                >
                  {game.title}
                </button>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Videos</h3>
            <div className="flex flex-wrap gap-4">
              {personalizedVideos.map(video => (
                <button
                  key={video.title}
                  onClick={() => setSelectedVideoUrl(video.url)}
                  className="bg-[#4dabf7] text-white py-2 px-4 rounded-lg hover:bg-[#1971c2] transition font-medium"
                >
                  {video.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Tips</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Take short breaks every hour to reset your mind.</li>
              <li>Practice deep breathing to reduce stress.</li>
              <li>Stay hydrated and maintain a healthy routine.</li>
            </ul>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all">
          <h2 className="font-semibold text-xl mb-3 text-purple-700">Insights</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Track your mood & stress daily to identify patterns</li>
            <li>AI-generated severity reflects your assessment form</li>
            <li>Use CBT, journaling & audio based on AI suggestions</li>
          </ul>
        </div>

        <p className="text-sm text-center text-gray-500 mt-4">
          Last login: {user.metadata.lastSignInTime}
        </p>
      </div>

      {/* Game Modal */}
      {selectedGameUrl && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50" onClick={() => setSelectedGameUrl(null)}>
          <div className="relative w-[90%] h-[90%] max-w-6xl bg-white rounded-xl p-2 md:p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#f4a261] text-white text-2xl font-bold cursor-pointer z-50 flex items-center justify-center transition-transform hover:scale-110" 
              onClick={() => setSelectedGameUrl(null)}
            >
              &times;
            </button>
            <iframe src={selectedGameUrl} title="Game" className="w-full h-full rounded-lg" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideoUrl && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50" onClick={() => setSelectedVideoUrl(null)}>
          <div className="relative w-[90%] h-[90%] max-w-4xl bg-white rounded-xl p-2 md:p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#4dabf7] text-white text-2xl font-bold cursor-pointer z-50 flex items-center justify-center transition-transform hover:scale-110" 
              onClick={() => setSelectedVideoUrl(null)}
            >
              &times;
            </button>
            <iframe src={selectedVideoUrl} title="Video" className="w-full h-full rounded-lg" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )}

      {/* Bottom Navbar */}
      <div className="fixed bottom-10 w-full flex justify-center">
        <nav className="bg-white shadow-xl rounded-full px-8 py-4 flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600 font-medium">Contact</Link>
        </nav>
      </div>
    </div>
  );
}
