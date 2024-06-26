import React, { useState, useEffect } from 'react';
import './Modal.css';

function Modal({ isOpen, video, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Frontend',
    thumbnail: '',
    videoUrl: '',
    description: '',
  });

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title,
        category: video.category,
        thumbnail: video.thumbnail,
        videoUrl: video.videoUrl,
        description: video.description,
      });
    }
  }, [video]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave({ ...video, ...formData });
  };

  const handleClear = () => {
    setFormData({
      title: '',
      category: 'Frontend',
      thumbnail: '',
      videoUrl: '',
      description: '',
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>EDITAR CARD:</h2>
        <button className="close-button" onClick={onClose}>X</button>
        <form>
          <label>
            Título:
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </label>
          <label>
            Categoría:
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Innovación y Gestión">Innovación y Gestión</option>
            </select>
          </label>
          <label>
            Imagen URL:
            <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
          </label>
          <label>
            Video URL:
            <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} />
          </label>
          <label>
            Descripción:
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </label>
          <div className='botones'>
          <button type="button" onClick={handleSave}>GUARDAR</button>
          <button type="button" onClick={handleClear}>LIMPIAR</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
