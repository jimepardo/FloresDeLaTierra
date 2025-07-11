import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Form() {

    const [request, setRequest] = useState({
        name: '',
        email: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequest({ ...request, [name]: value });
    };

    function handleSubmit(event) {
        event.preventDefault();
        Swal.fire({
                title: "Formulario enviado",
                text: "En breve se pondrán en contacto con el mail que proporcionaste: " + `${request.email}`,
                icon: "success"
            });

    }

    return (
        <form style={{
            marginLeft: '60px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '400px',
            margin: 'auto',
        }} onSubmit={handleSubmit} >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ color: '#344E41', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Nombre: </label>
                <input
                    className='form-control '
                    type="text"
                    name="name"
                    value={request.name}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre"
                    style={{
                        padding: '0.5rem',
                        border: '1px solid #ced4da',
                        borderRadius: '0.25rem',
                    }}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ color: '#344E41', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Correo electrónico</label>
                <input
                    className='form-control '
                    type="email"
                    name="email"
                    value={request.email}
                    onChange={handleChange}
                    placeholder="Ingresa tu correo electrónico"
                    style={{
                        padding: '0.5rem',
                        border: '1px solid #ced4da',
                        borderRadius: '0.25rem',
                    }}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ color: '#344E41', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Consulta</label>
                <textarea
                    className='form-control '
                    type="text"
                    name="description"
                    value={request.description}
                    onChange={handleChange}
                    placeholder="Ingresa tu consulta"
                    style={{
                        padding: '0.5rem',
                        border: '1px solid #ced4da',
                        borderRadius: '0.25rem',
                    }}
                />
            </div>
            <button className='btnSession btn' style={{ color: '#fff' }} type="submit">Enviar</button>
        </form>

    );
}

export default Form;