import io from 'socket.io-client';


class SocketService {

  connect(path) {
    return new Promise((resolve, reject) => {
      let socket = io('', {path, 'force new connection': true});
      socket.on('connect', () => resolve(socket));
    });
  }

  sendMessage(socket) {
    socket.emit('message', 'asdsasd')
  }

}


export default new SocketService();