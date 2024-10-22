import { PrismaClient } from '@prisma/client';




class DecevalGatewayService extends PrismaClient {
  constructor() {
   // const dbHost = envs.DB_HOST;
    //const dbPort = envs.DB_PORT;
    //const dbUser = envs.DB_USER;
    //const dbPassword = envs.DB_PASSWORD;
    //const database = envs.DATABASE;

    super( );

    this.init(); 
  }
  
   ///se cambiara los metodos 
  async onRequestLogin() {
   

    
  }

  async onRequestConsult(payload: any) {
      console.log(payload);
  }

 
  
  async init() {
    try {
      await this.$connect();
      console.log(`Conexión a la base de datos establecida correctamente.`);
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }

  async destroy() {
    await this.$disconnect();
  }
}

const decevalGatewayService = new DecevalGatewayService();

process.on('SIGINT', async () => {
  await decevalGatewayService.destroy();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await decevalGatewayService.destroy();
  process.exit(0);
});

export default DecevalGatewayService;