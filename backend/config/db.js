const mongoose = require('mongoose');

let isConnected = false;

async function connectToDatabase(uri, options = {}) {
  if (isConnected) return mongoose.connection;

  const mongoUri = uri || process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined. Please set it in your environment.');
  }

  const defaultOptions = {
    autoIndex: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10000,
  };

  await mongoose.connect(mongoUri, { ...defaultOptions, ...options });
  isConnected = true;

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
  });

  return mongoose.connection;
}

module.exports = { connectToDatabase };


  