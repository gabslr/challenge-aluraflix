import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import NuevoVideoModal from './components/NuevoVideoModal';
import VideoDetail from './pages/VideoDetail';
import './App.css';
import axios from 'axios';

function App() {
  const [videos, setVideos] = useState({
    frontend: [],
    backend: [],
    innovacionYGestion: [],
  });

  const [modal, setModal] = useState({ isOpen: false, video: null });
  const [nuevoVideoOpen, setNuevoVideoOpen] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/videos');
        const data = response.data;

        const categorizedVideos = {
          frontend: data.filter(video => video.category === 'Frontend'),
          backend: data.filter(video => video.category === 'Backend'),
          innovacionYGestion: data.filter(video => video.category === 'Innovación y Gestión'),
        };

        setVideos(categorizedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleEdit = (video) => {
    setModal({ isOpen: true, video });
  };

  const handleClose = () => {
    setModal({ isOpen: false, video: null });
    setNuevoVideoOpen(false);
  };

  const handleSave = async (updatedVideo) => {
    try {
      await axios.put(`http://localhost:5000/videos/${updatedVideo.id}`, updatedVideo);
      const updatedVideos = { ...videos };
      const categoryKey = updatedVideo.category.toLowerCase().replace(/\s/g, 'YGestion');
      updatedVideos[categoryKey] = updatedVideos[categoryKey].map(v =>
        v.id === updatedVideo.id ? updatedVideo : v
      );
      setVideos(updatedVideos);
      handleClose();
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  const handleDelete = async (id, category) => {
    try {
      await axios.delete(`http://localhost:5000/videos/${id}`);
      const updatedVideos = { ...videos };
      const categoryKey = category.toLowerCase().replace(/\s/g, 'YGestion');
      if (updatedVideos[categoryKey]) {
        updatedVideos[categoryKey] = updatedVideos[categoryKey].filter(v => v.id !== id);
        setVideos(updatedVideos);
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <Header onNuevoVideoClick={() => setNuevoVideoOpen(true)} />
            <Banner />
            <CategorySection
              title="Frontend"
              videos={videos.frontend}
              onEdit={handleEdit}
              onDelete={(id) => handleDelete(id, 'Frontend')}
            />
            <CategorySection
              title="Backend"
              videos={videos.backend}
              onEdit={handleEdit}
              onDelete={(id) => handleDelete(id, 'Backend')}
            />
            <CategorySection
              title="Innovación y Gestión"
              videos={videos.innovacionYGestion}
              onEdit={handleEdit}
              onDelete={(id) => handleDelete(id, 'Innovación y Gestión')}
            />
            <Footer />
            <Modal
              isOpen={modal.isOpen}
              video={modal.video}
              onClose={handleClose}
              onSave={handleSave}
            />
            <NuevoVideoModal
              isOpen={nuevoVideoOpen}
              onClose={handleClose}
              setVideos={setVideos}
              videos={videos}
            />
          </div>
        } />
        <Route path="/video/:id" element={<VideoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
