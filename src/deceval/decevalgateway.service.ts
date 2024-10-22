

class DecevalGatewayService  {
  constructor() {
   

  }
  
   ///se cambiara los metodos 
  async onRequestLogin() {
   console.log("login");

    
  }

  async onRequestConsult(payload: any) {
      console.log(payload);
  }

 
  
}
export default DecevalGatewayService;