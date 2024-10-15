import { server } from "./app.js";
import { IP_SERVER, PORT } from "./constants.js";

server.listen(PORT, ()=> {
    console.log("###########################");
    console.log("######### API REST ########");
    console.log("###########################");
    console.log(`http://${IP_SERVER}/:${PORT}/api`);
});
