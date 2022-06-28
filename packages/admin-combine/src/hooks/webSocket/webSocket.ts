//TODO: 소켓테스트진행중

const { REACT_APP_SOCKET_DOMAIN: SOCKET_DOMAIN } = process.env;

export let socket: WebSocket | null;

export const initSocket = () => {
  console.log('[INFO] initSocket ');
  socket = new WebSocket(SOCKET_DOMAIN!);
  console.log(socket);
};

export const runSocket = () => {
  console.log('[INFO] runSocket ');

  if (!socket) return errorSocket();

  socket.onopen = async (event) => {
    console.group('[SUCCESS] runSocket connect onopen');
    console.log(event);
    console.groupEnd();
  };

  socket.onerror = async (event) => {
    console.group('[ERROR] runSocket connect onerror');
    console.error(event);
    console.groupEnd();
  };
  socket.onclose = async (event) => {
    const errorCode = event.code;
    console.group('[ERROR] runSocket connect onclose');
    console.error(errorCode);
    console.groupEnd();
  };

  socket.onmessage = async (message) => {
    console.log('[INFO] socket onmessage');
    const parsedMessage = JSON.parse(message.data);
    const type = parsedMessage.type;
    console.log(parsedMessage);

    switch (type) {
      case 'REQUEST_TREATMENT': {
        console.warn('[INFO] REQUEST_TREATMENT ============');
        console.log(parsedMessage);
        return true;
      }
      case 'CHANGE_TREATMENT_STATUS': {
        console.warn('[INFO] CHANGE_TREATMENT_STATUS ============');
        console.log(parsedMessage);
        return true;
      }
      default:
        console.error('Unrecognized type: ', type);
        throw Error(`[ERROR] Socket onmessage Unrecognized type ===> ${type}`);
    }
  };
};

export const disconnectSocket = () => {
  console.group('[SUCCESS] disconnectSocket connect onopen');
  if (!socket) return errorSocket();
  socket.close();
  socket = null;
};

export const errorSocket = () => {
  console.error('[ERROR] Socket connect error');
};
