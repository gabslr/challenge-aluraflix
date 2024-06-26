import React from 'react';
import { Link } from 'react-router-dom';
import './CategorySection.css';

function CategorySection({ title, videos, onEdit, onDelete }) {
  // Determine the class based on the title
  const titleClass = title.replace(/\s+/g, '-').toLowerCase();

  return (
    <section className="category-section">
      <h2 className={`category-title ${titleClass}`}>{title}</h2>
      <div className="videos">
        {videos.map(video => (
          <div key={video.id} className="video-card">
            <Link to={`/video/${video.id}`}>
              <img src={video.thumbnail} alt={video.title} className="thumbnail" />
            </Link>
            <div className="video-actions">
              <button onClick={() => onDelete(video.id, video.category)} className="delete-button">
                <i className="fas fa-trash-alt"></i> BORRAR
              </button>
              <button onClick={() => onEdit(video)} className="edit-button">
                <i className="fas fa-edit"></i> EDITAR
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
