import express, { Application } from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRoutes from './app/user/user.route';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


dotenv.config();

const app: Application = express();

// Swagger Configuration
const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation', // Title of the API
      version: '1.0.0',           // API version
      description: 'API documentation for user registration and login', // Description of the API
    },
    servers: [
      {
        url: 'http://localhost:5000', // URL of your API server
      },
    ],
  },
  apis: ['./app/user/user.route.ts'], // Path to the route files (glob pattern)
};

// Initialize Swagger docs
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Use Swagger UI to serve the docs on a route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err: Error) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process on MongoDB connection failure
  });

// API Routes
app.use('/api/users', userRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
