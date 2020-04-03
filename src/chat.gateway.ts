import { WebSocketGateway, SubscribeMessage } from "@nestjs/websockets";

@WebSocketGateway()
export class ChatGateway {

    handleConnection(socket) {
        setInterval(() => socket.send(JSON.stringify({ event: 'message', data: '2/04/2020' })), 3000);
    }

    @SubscribeMessage('event')
    listenMessage(socket, data) {
        console.log(data);
        return {};
    }
}