import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('NotificationsGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);

    // In a real app we'd verify JWT token here via client.handshake.auth.token
    // client.join(\`user_\${userId}\`); // Join specific user room
    // client.join(\`role_\${role}\`); // Join role-based room (e.g. role_ADMIN)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // --- Utility methods for cross-module notifications ---

  /**
   * Broadcast an event to a specific user
   */
  sendToUser(userId: string, event: string, payload: any) {
    this.server.to(`user_${userId}`).emit(event, payload);
  }

  /**
   * Broadcast an event to all users with a specific role
   */
  sendToRole(role: string, event: string, payload: any) {
    this.server.to(`role_${role}`).emit(event, payload);
  }

  /**
   * Broadcast a general event to everybody
   */
  broadcast(event: string, payload: any) {
    this.server.emit(event, payload);
  }
}
