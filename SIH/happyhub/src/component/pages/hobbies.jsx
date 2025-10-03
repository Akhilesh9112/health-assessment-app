import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// --- MOCK YOUTUBE VIDEO DATA (REPLACES PEXELS) ---
// This data uses YouTube Shorts IDs for a reliable "reels" experience.
const mockVideoData = {
  painting: [
    { id: 'y2L12y_p-3I', user: { name: 'Chloe Art' } },
    { id: 'O-k-89E62sA', user: { name: 'Jay Lee Painting' } },
    { id: '962j4p-GeA4', user: { name: 'Painting with Josh' } },
  ],
  gardening: [
    { id: 'cPo94nPS8nE', user: { name: 'The Frenchie Gardener' } },
    { id: '3iLzB0j5k7Y', user: { name: 'Garden Answer' } },
    { id: 'Jz4p5pZTbwo', user: { name: 'Epic Gardening' } },
  ],
  baking: [
    { id: '2AZfr2w-bJ8', user: { name: 'Sugar Bean' } },
    { id: 's2y2Q_B2w2M', user: { name: 'The Scran Line' } },
    { id: 'T6d88v21yFk', user: { name: 'Baking with GRACE' } },
  ],
  relaxing: [
    { id: 'h7MYJghRWtA', user: { name: 'Calm' } },
    { id: 'ZeE7xVlT9vA', user: { name: 'Nature Relaxation Films' } },
    { id: 'W08A-IIbVIc', user: { name: 'Relaxing White Noise' } },
  ]
};

// --- Helper Components ---

const LoadingSpinner = () => (
  <div className="h-full flex flex-col items-center justify-center text-gray-600">
    <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-[#f4a261]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="mt-2">Loading videos...</p>
  </div>
);

const ErrorMessage = ({ message }) => (
    <div className="h-full flex items-center justify-center p-4 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{message}</span>
        </div>
    </div>
);

const VideoReel = ({ videoData }) => {
  // Construct the YouTube embed URL for shorts/reels
  const embedUrl = `https://www.youtube.com/embed/${videoData.id}?autoplay=1&mute=1&loop=1&playlist=${videoData.id}&controls=0&modestbranding=1`;

  return (
    <div className="relative h-full w-full snap-start flex-shrink-0 bg-black rounded-xl overflow-hidden">
      <iframe
        src={embedUrl}
        title={videoData.user.name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
      <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent w-full pointer-events-none">
        <p className="font-bold text-lg">{videoData.user.name}</p>
        <p className="text-sm opacity-80">on YouTube</p>
      </div>
    </div>
  );
};


// --- Main Page Component ---
const HobbyReelsPage = () => {
  // The hobby is now fetched from the URL, making it dynamic.
  const { hobbyName } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // If hobbyName is not in the URL, default to "relaxing"
    const currentHobby = hobbyName || 'relaxing';
    
    // Simulating an API call with our mock data
    setTimeout(() => {
      const hobbyVideos = mockVideoData[currentHobby.toLowerCase()];
      if (hobbyVideos) {
        setVideos(hobbyVideos);
      } else {
        // This will only trigger if a user types an invalid hobby in the URL
        setError(`No videos found for "${currentHobby}". Try another hobby!`);
      }
      setLoading(false);
    }, 500); // Add a small delay to simulate network loading

  }, [hobbyName]); // This effect re-runs whenever the hobby in the URL changes

  return (
    <div className="bg-gray-100 min-h-screen pt-20 flex flex-col items-center">
      <header className="text-center p-6 w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Your Hobby Break</h1>
        <p className="text-lg text-gray-600 mt-2">
          {hobbyName 
            ? <>Short videos based on your chosen hobby: <span className="font-bold text-[#f4a261] capitalize">{hobbyName}</span></>
            : "Here are some videos to help you relax."
          }
        </p>
      </header>

      {/* The scrollbar-hide class requires the tailwind-scrollbar-hide plugin. If you don't have it, the scrollbar will be visible. */}
      <main className="w-full max-w-sm h-[75vh] bg-gray-300 rounded-2xl shadow-xl overflow-y-auto snap-y snap-mandatory scrollbar-hide">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && videos.map(video => (
          <VideoReel key={video.id} videoData={video} />
        ))}
      </main>
      <footer className="text-center p-4">
        <p className="text-gray-500 text-sm mb-2">Try another hobby:</p>
        <div className="flex justify-center gap-2 flex-wrap">
            <Link to="/hobby-reels/painting" className="text-blue-500 hover:underline">Painting</Link>
            <Link to="/hobby-reels/gardening" className="text-green-500 hover:underline">Gardening</Link>
            <Link to="/hobby-reels/baking" className="text-pink-500 hover:underline">Baking</Link>
        </div>
      </footer>
    </div>
  );
};

export default HobbyReelsPage;

