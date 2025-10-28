const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { connectToDatabase } = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const port = process.env.PORT || 4000;

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Luxury Stay HMS API',
      version: '1.0.0',
    },
    servers: [
      { url: process.env.API_BASE_URL || `http://localhost:${port}` }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: [
    './routes/*.js',
    './controllers/*.js',
    './models/*.js'
  ]
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Luxury Stay HMS API', 
    version: '1.0.0',
    docs: '/api-docs',
    health: '/health'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/rooms', require('./routes/rooms.routes'));
app.use('/api/bookings', require('./routes/bookings.routes'));
app.use('/api/housekeeping', require('./routes/housekeeping.routes'));
app.use('/api/maintenance', require('./routes/maintenance.routes'));
app.use('/api/invoices', require('./routes/invoices.routes'));
app.use('/api/feedback', require('./routes/feedback.routes'));
app.use('/api/services', require('./routes/services.routes'));
app.use('/api/settings', require('./routes/settings.routes'));
app.use('/api/notifications', require('./routes/notifications.routes'));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  });


