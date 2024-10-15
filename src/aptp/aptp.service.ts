import { PrismaClient } from '@prisma/client';
import { getAuth, sumar24Horas } from '../config/functions';
import { Amount, Payment } from '../config/interfaces';
import { envs } from '../config/envs';


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
  async onRequestLogin(reference: string, description: string, amount:Amount,ipAddress:string,userAgent:string) {
   

    //se enviara un payload a una url y esperaremos de respuesta una url
    const auth = getAuth();
    const fechaSumada = sumar24Horas();

    const payment:Payment = {

    reference,
    description,
    amount

    }
   
    const sendPayload = {
        "locale": "es_CO",
        auth: auth,
        payment,
        "expiration": fechaSumada,
        "returnUrl": `${envs.RETURNURL}`,
        ipAddress,
        userAgent 
       
    }
    console.log(sendPayload);
    //despues de enviar el payload se retornara una url processUrl
    //tambien regresa un requestId este tambien se manda al front
    //ya esta la interface de la respuesta de a place to pay con la url
    
   
    return {paymentUrl: 'https://google.com'};
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