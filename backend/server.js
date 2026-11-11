import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

const clientOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

const io = new Server(server, {
  cors: {
    origin: clientOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

app.set('io', io);

// Middleware
app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Health check endpoint
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Socket connection
io.on('connection', (socket) => {
  console.log(`Socket Client Connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Socket Client Disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));