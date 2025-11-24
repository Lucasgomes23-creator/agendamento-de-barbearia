const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Data File Path
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Helper to read data
const readData = () => {
    if (!fs.existsSync(DB_PATH)) {
        // Initialize with default data if not exists
        const initialData = {
            services: [
                { id: 1, name: "Corte de Cabelo", price: 30, duration: 30 },
                { id: 2, name: "Barba", price: 20, duration: 20 },
                { id: 3, name: "Corte + Barba", price: 45, duration: 50 },
                { id: 4, name: "Pezinho", price: 10, duration: 10 }
            ],
            appointments: []
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
        return initialData;
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Routes

// Get all services
app.get('/api/services', (req, res) => {
    const data = readData();
    res.json(data.services);
});

// Get all appointments
app.get('/api/appointments', (req, res) => {
    const data = readData();
    res.json(data.appointments);
});

// Create appointment
app.post('/api/appointments', (req, res) => {
    const { customerName, serviceId, date, time } = req.body;
    
    if (!customerName || !serviceId || !date || !time) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const data = readData();
    
    // Simple validation: check if slot is taken
    const isTaken = data.appointments.some(appt => appt.date === date && appt.time === time);
    if (isTaken) {
        return res.status(409).json({ error: "Horário indisponível." });
    }

    const newAppointment = {
        id: Date.now(),
        customerName,
        serviceId,
        date,
        time,
        createdAt: new Date().toISOString()
    };

    data.appointments.push(newAppointment);
    writeData(data);

    res.status(201).json(newAppointment);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Initialize DB on start
    readData();
});
