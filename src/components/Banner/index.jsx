import React from 'react';
import './Banner.css';

function Banner() {
  return (
    <section className="banner">
      <div className='banner-background'>
      <img src='https://img.freepik.com/vector-gratis/fondo-azul-degradado_23-2149347096.jpg' />
      </div>
      <div className="banner-content">
        <div className="banner-text">
          <h2 className='front'>FRONT END</h2>
          <h2>Challenge React</h2>
          <p>Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.</p>
        </div>
        <div className="banner-image">
          <img src="https://i.ytimg.com/vi/ov7vA5HFe6w/hqdefault.jpg" alt="Thumbnail" />
        </div>
      </div>
    </section>
  );
}

export default Banner;
