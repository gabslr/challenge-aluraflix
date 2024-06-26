import React, { useState } from 'react';
import './NuevoVideo.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function NuevoVideoModal({ isOpen, onClose, setVideos, videos }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    videoUrl: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    category: '',
    videoUrl: '',
    description: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const extractYouTubeVideoId = (url) => {
    const regExp = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return (match && match[1]) ? match[1] : null;
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: '',
      category: '',
      videoUrl: '',
      description: '',
    };

    if (!formData.title) {
      newErrors.title = 'El título es obligatorio';
      valid = false;
    }
    if (!formData.category) {
      newErrors.category = 'La categoría es obligatoria';
      valid = false;
    }
    if (!formData.videoUrl) {
      newErrors.videoUrl = 'El enlace es obligatorio';
      valid = false;
    } else if (!extractYouTubeVideoId(formData.videoUrl)) {
      newErrors.videoUrl = 'Por favor, ingrese una URL de YouTube válida';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const youtubeVideoId = extractYouTubeVideoId(formData.videoUrl);

    const newVideoData = {
      ...formData,
      id: uuidv4(),
      videoUrl: youtubeVideoId,
      thumbnail: `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`,
    };

    try {
      const response = await axios.post('http://localhost:5000/videos', newVideoData);
      const createdVideo = response.data;
      const updatedVideos = { ...videos };
      const categoryKey = createdVideo.category.toLowerCase();
      if (!updatedVideos[categoryKey]) {
        updatedVideos[categoryKey] = [];
      }
      updatedVideos[categoryKey] = [...updatedVideos[categoryKey], createdVideo];
      setVideos(updatedVideos);
      setFormData({
        title: '',
        category: '',
        videoUrl: '',
        description: '',
      });
      onClose();
    } catch (error) {
      console.error('Error creating video:', error);
    }
  };

  const handleClear = () => {
    setFormData({
      title: '',
      category: '',
      videoUrl: '',
      description: '',
    });
    setErrors({
      title: '',
      category: '',
      videoUrl: '',
      description: '',
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Nuevo Video</h2>
        <button className="close-button" onClick={onClose}>X</button>
        <p>Complete el formulario para crear una nueva tarjeta de video</p>
        <form>
          <div className="form-group">
            <label>
              Título:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ingrese el título"
              />
              {errors.title && <div className="error">{errors.title}</div>}
            </label>
          </div>
          <div className="form-group">
            <label>
              Categoría:
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Seleccione una categoría"
              >
                <option value="">Seleccione una categoría</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="innovacion">Innovación</option>
              </select>
              {errors.category && <div className="error">{errors.category}</div>}
            </label>
          </div>
          <div className="form-group">
            <label>
              Video URL (YouTube):
              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="Ingrese el enlace del video"
              />
              {errors.videoUrl && <div className="error">{errors.videoUrl}</div>}
            </label>
          </div>
          <div className="form-group">
            <label>
              Descripción:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="¿De qué se trata este video?"
              ></textarea>
            </label>
          </div>
          <div className="form-buttons">
            <button type="button" onClick={handleSave}>Guardar</button>
            <button type="reset" onClick={handleClear}>Limpiar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NuevoVideoModal;
