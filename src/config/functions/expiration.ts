export function sumar24Horas() {
    const fechaActual = new Date();
    const fechaSumada = new Date(fechaActual.getTime() + 24 * 60 * 60 * 1000);
    return fechaSumada.toISOString()
  }
  

