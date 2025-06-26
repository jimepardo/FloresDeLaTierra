import React from 'react';

const About = () => {

  return (
    <div id='main-content-wrapper'>
      <br />
      <div style={{ padding: '20px', maxWidth: '80%', margin: '0 auto'}}>
        <h1 style={{ color: '#344E41', textAlign: 'center' }}>Acerca de Nosotros</h1><br />
        <p style={{ color: '#344E41', marginBottom: '20px' }}>
          Bienvenido a nuestra tienda en línea. Nos dedicamos a ofrecer los mejores productos a nuestros clientes,
          garantizando calidad y satisfacción. Nuestro equipo trabaja arduamente para brindarte una experiencia de compra única.
        </p>
        <h2 style={{ color: '#344E41', marginTop: '20px' }}>Nuestra Misión</h2>
        <p style={{ color: '#344E41', marginBottom: '20px' }}>
          Proveer productos de alta calidad mientras fomentamos la confianza y la lealtad de nuestros clientes.
          Creemos en la innovación y en el compromiso con la excelencia. Contamos con cultivo propio, logística interna y un
          equipo especializado en ejecutar proyectos de forma eficiente, cumpliendo plazos y adaptándonos a cada necesidad.
        </p>
        <h2 style={{ color: '#344E41', marginTop: '20px' }}>Contacto</h2>
        <p style={{ color: '#344E41'}}>
          Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos a través de nuestro correo electrónico:&nbsp;
          <a href="mailto:contacto@tienda.com" style={{ color: '#344E41', textDecoration: 'none' }}>contacto@floresdelatierra.com</a>&nbsp;
          o llamando al <span style={{ fontWeight: 'bold' }}>+123 456 7890</span>.
        </p>
      </div>
    </div>

  )
}

export default About;