import dotenv from "dotenv";
dotenv.config();

import http, { Server } from "http";
import app from './app';
import { ENV } from './config/env';

let server: Server | null = null;



async function startServer() {
  try {
    server = http.createServer(app);
    server.listen(ENV.PORT, () => {
      console.log(`🚀 Server is running on port ${ENV.PORT}`);
    });

    handleProcessEvents();
  } catch (error) {
    console.error('❌ Error during server startup:', error);
    process.exit(1);
  }
}




async function gracefulShutdown(signal: string) {
  console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      console.log('✅ HTTP server closed.');

      try {
        console.log('Server shutdown complete.');
      } catch (error) {
        console.error('❌ Error during shutdown:', error);
      }

      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}


function handleProcessEvents() {
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
    gracefulShutdown('uncaughtException');
  });

  process.on('unhandledRejection', (reason) => {
    console.error('💥 Unhandled Rejection:', reason);
    gracefulShutdown('unhandledRejection');
  });
}


startServer();
