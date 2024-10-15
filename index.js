import { server } from "./app.js";
import { IP_SERVER, PORT } from "./constants.js";
import { io } from "./utils/index.js";

server.listen(PORT, () => {
  console.log("###########################");
  console.log("######### API REST ########");
  console.log("###########################");
  console.log(`http://${IP_SERVER}/:${PORT}/api`);

  io.sockets.on("connection", (socket) => {
    console.log("NUEVO USUARIO CONECTADO");

    socket.on("disconnect", () => {
      console.log("USUARIO DESCONECTADO");
    });

    socket.on("subscribe", (room) => {
      socket.join(room);
    });

    socket.on("unsubscribe", (room) => {
      socket.leave(room);
    });
  });
});
