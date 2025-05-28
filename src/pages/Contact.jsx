import React from 'react';
import Formulario from '../components/Form';


const Contact = () => {

  return (
    <>

      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto'}}>
        <br />
        <h1 style={{ color: '#333', textAlign: 'center' }}>Contacto</h1><br/>
        <p style={{ textAlign: 'center', color: '#555' }}>
          Si tienes alguna consulta, no dudes en escribirnos a través del siguiente formulario.
        </p>
        <Formulario />
      </div>

    </>
  )
}

export default Contact;