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
    innovacion: [],
  });

  const [modal, setModal] = useState({ isOpen: false, video: null });
  const [nuevoVideoOpen, setNuevoVideoOpen] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/videos');
      const data = response.data;

      const categorizedVideos = {
        frontend: data.filter(video => video.category.toLowerCase() === 'frontend'),
        backend: data.filter(video => video.category.toLowerCase() === 'backend'),
        innovacion: data.filter(video => video.category.toLowerCase() === 'innovacion'),
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

    // Eliminar el video de la categoría anterior
    Object.keys(updatedVideos).forEach(category => {
      updatedVideos[category] = updatedVideos[category].filter(v => v.id !== updatedVideo.id);
    });

    // Agregar el video a la nueva categoría
    const categoryKey = updatedVideo.category.toLowerCase();
    if (!updatedVideos[categoryKey]) {
      updatedVideos[categoryKey] = [];
    }
    updatedVideos[categoryKey] = [...updatedVideos[categoryKey], updatedVideo];

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
    const categoryKey = category.toLowerCase();
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
            onDelete={(id) => handleDelete(id, 'frontend')}
          />
          <CategorySection
            title="Backend"
            videos={videos.backend}
            onEdit={handleEdit}
            onDelete={(id) => handleDelete(id, 'backend')}
          />
          <CategorySection
            title="Innovación"
            videos={videos.innovacion}
            onEdit={handleEdit}
            onDelete={(id) => handleDelete(id, 'innovacion')}
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
