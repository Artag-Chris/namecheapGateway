import { PrismaClient } from '@prisma/client';
import { getAuth } from '../config/functions';
import { Payment } from '../config/interfaces';


class AptpService extends PrismaClient {
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
  async onLogin(payload: any) {
    const {reference, description, amount,ipAddress } = payload;

    //se enviara un payload a una url y esperaremos de respuesta una url
    const auth = getAuth();
    const payment:Payment = {

    reference,
    description,
    amount

    }
   
    const sendPayload = {
        "locale": "es_CO",
        auth: auth,
        payment,
        "expiration": "2021-12-30T00:00:00-05:00",//debere crear una forma de expiracion
        "returnUrl": "https://artagshop.com",
        ipAddress, //ip del usuario que realiza el pago
        "userAgent": "Artag Shop User Sandbox"
    }
    console.log(sendPayload);
    //despues de enviar el payload se retornara una url processUrl
    //tambien regresa un requestId este tambien se manda al front
    //ya esta la interface de la respuesta de a place to pay con la url
    return sendPayload;
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

const aptpService = new AptpService();

process.on('SIGINT', async () => {
  await aptpService.destroy();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await aptpService.destroy();
  process.exit(0);
});

export default AptpService;