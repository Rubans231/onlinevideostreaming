import React, { useState, useEffect } from 'react';
import './App.css';

// Mock data for videos - in a real app, this would come from an API
const mockVideos = [
  { id: 1, title: 'Introduction to React', author: 'React Master', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', thumbnail: 'https://via.placeholder.com/300x200?text=React+Tutorial', views: 1200 },
  { id: 2, title: 'Building a Video Platform', author: 'Code Ninja', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', thumbnail: 'https://via.placeholder.com/300x200?text=Video+Platform', views: 850 },
  { id: 3, title: 'Advanced CSS Techniques', author: 'Style Guru', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', thumbnail: 'https://via.placeholder.com/300x200?text=CSS+Techniques', views: 2300 },
  { id: 4, title: 'JavaScript Fundamentals', author: 'JS Expert', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', thumbnail: 'https://via.placeholder.com/300x200?text=JavaScript', views: 1750 },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setVideos(mockVideos);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredVideos = mockVideos.filter(video => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setVideos(filteredVideos);
  };

  const handleLogin = () => {
    // Mock login
    setUser({ name: 'Demo User', email: 'demo@example.com' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (isLoading) {
    return <div className="loading">Loading videos...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>StreamVid</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            placeholder="Search videos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="user-section">
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
        </div>
      </header>

      <main className="content">
        {selectedVideo ? (
          <div className="video-player-container">
            <div className="video-player">
              <video controls src={selectedVideo.url} width="100%"></video>
              <h2>{selectedVideo.title}</h2>
              <p className="video-info">
                <span className="author">{selectedVideo.author}</span>
                <span className="views">{selectedVideo.views} views</span>
              </p>
            </div>
            <button className="back-button" onClick={() => setSelectedVideo(null)}>
              Back to videos
            </button>
          </div>
        ) : (
          <div className="video-grid">
            {videos.map(video => (
              <div 
                key={video.id} 
                className="video-card" 
                onClick={() => handleVideoSelect(video)}
              >
                <img src={video.thumbnail} alt={video.title} />
                <h3>{video.title}</h3>
                <p>{video.author}</p>
                <span>{video.views} views</span>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2023 StreamVid. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;