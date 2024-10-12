import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { createServer } from 'http';



(async()=> {
  main();
})();


function main() {
 console.log("Starting Server...");
  const server = new Server({
    port: envs.PORT,
  });
  const httpServer= createServer(server.app);

  
server.setRoutes(AppRoutes.routes);

httpServer.listen(envs.PORT, () => {
  console.log(`Server corriendo en el puerto ${ envs.PORT }`);
});
}