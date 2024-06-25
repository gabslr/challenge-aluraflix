import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './VideoDetail.css';

function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/videos/${id}`);
        setVideo(response.data);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, [id]);

  if (!video) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <main className="video-detail">
        <nav>
          <Link to="/">Home</Link> / <Link to="/nuevo-video">Nuevo Video</Link> / <span>{video.title}</span>
        </nav>
        <h1>{video.title}</h1>
        <div className="video-container">
          <iframe
            width="600"
            height="400"
            src={`https://www.youtube.com/embed/${video.videoUrl}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p>{video.description}</p>
      </main>
      <Footer />
    </div>
  );
}

export default VideoDetail;
