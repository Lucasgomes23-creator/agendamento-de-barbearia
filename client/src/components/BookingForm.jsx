import React, { useState, useEffect } from 'react';

const BookingForm = () => {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        customerName: '',
        serviceId: '',
        date: '',
        time: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar serviços:", err);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    serviceId: parseInt(formData.serviceId)
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Agendamento realizado com sucesso!');
                setFormData({ customerName: '', serviceId: '', date: '', time: '' });
            } else {
                setMessage(`Erro: ${data.error}`);
            }
        } catch (error) {
            setMessage('Erro ao conectar com o servidor.');
        }
    };

    if (loading) return <p>Carregando serviços...</p>;

    return (
        <div className="card animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Agende seu Horário</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome Completo</label>
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                        placeholder="Ex: João Silva"
                    />
                </div>

                <div>
                    <label>Serviço</label>
                    <select
                        name="serviceId"
                        value={formData.serviceId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione um serviço</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name} - R$ {service.price},00
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <label>Data</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>Horário</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Confirmar Agendamento
                </button>

                {message && (
                    <p style={{
                        marginTop: '1rem',
                        textAlign: 'center',
                        color: message.includes('Sucesso') ? 'var(--success-color)' : 'var(--error-color)'
                    }}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default BookingForm;
