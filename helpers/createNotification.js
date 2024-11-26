import { PrismaClient } from '@prisma/client';
import { io } from '../socket/socket.js';



const prisma = new PrismaClient();

export const createNotification = async ({ subject, message }) => {
    try {
      // Save the notification in the database
      const notification = await prisma.notification.create({
        data: { subject, message },
      });
  
      // Emit the notification to all connected clients
      io.emit('new-notification', notification);
  
    } catch (error) {
      console.error('Error creating notification:', error);
    } finally {
      // Optionally disconnect the Prisma client if no other operations are ongoing
      await prisma.$disconnect();
    }
  };