import { Component, inject, OnInit, signal } from '@angular/core';
import { GatitosService } from '../../services/gatitos.service';

export interface cats {
  nombre: string,
  raza: string,
  fecha_nacimiento: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public gatisService = inject(GatitosService);
  catsList = signal<cats[]>([]);

  async ngOnInit() {
    const gatos = await this.gatisService.getGatitos();
    console.log("aaaaaaaaaaaaa", gatos)
    this.catsList.set(gatos as cats[])
  }
}
