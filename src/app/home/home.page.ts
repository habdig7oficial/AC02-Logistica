import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';

import TabelaTempo from './tabela.tempo';

interface IonSel extends Event {
  detail?: {
      value: string;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  tipo_envio: IonSel | undefined;
  tempo: number = 0 

  constructor(public allertController: AlertController) {

  }

  Calcular(){
    
   }

   async exibirEnvio(){

    this.tipo_envio?.detail?.value == 'Comum' ? this.tempo = TabelaTempo.Comum: null
    this.tipo_envio?.detail?.value == 'Expresso' ? this.tempo = TabelaTempo.Expresso: null
    this.tipo_envio?.detail?.value == 'Same Day' ? this.tempo = TabelaTempo.SameDay: null
    this.tipo_envio?.detail?.value == 'Fornecedor' ? this.tempo = TabelaTempo.SameDay: null


    const alerta = await this.allertController.create({
      header:  `Tipo de Envio ${this.tipo_envio?.detail?.value}`,
      message: `Seu pedido chegará em até ${this.tempo} horas`,
    })
    await alerta.present()
   }

}
