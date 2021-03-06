import io from 'socket.io-client';


class SocketService {

  connect(path) {
    return new Promise((resolve, reject) => {
      let socket = io('', {path, 'force new connection': true});
      socket.on('connect', () => resolve(socket));
    });
  }

  sendMessage(socket, message) {
    socket.emit('message', message)
  }

  sendNewName(socket, newName) {
    socket.emit('new name', newName)
  }

}

export default new SocketService();
