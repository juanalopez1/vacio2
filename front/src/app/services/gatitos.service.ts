import { Injectable, signal } from '@angular/core';

export interface cats {
  nombre: string,
  raza: string,
  fecha_nacimiento: string
}

@Injectable({
  providedIn: 'root'
})
export class GatitosService {

  async getGatitos() {
    const result = await fetch(`http://localhost/back/gatitos/all`);
    const gatitos = await result.json();
    console.log(gatitos)
    return gatitos
  }
}
