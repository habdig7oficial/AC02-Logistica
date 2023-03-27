import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { TabelaTempo, TabelaPreco } from './tabela.tempo';

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
  tempo_final: number = this.tempo
  valor_final?: number;
  massa?: any
  dev?: any

  constructor(public allertController: AlertController) {

  }

   async exibirEnvio(){

    this.tipo_envio?.detail?.value == 'Comum' ? this.tempo = TabelaTempo.Comum: null
    this.tipo_envio?.detail?.value == 'Expressa' ? this.tempo = TabelaTempo.Expresso: null
    this.tipo_envio?.detail?.value == 'Same Day' ? this.tempo = TabelaTempo.SameDay: null
    this.tipo_envio?.detail?.value == 'Fornecedor' ? this.tempo = TabelaTempo.SameDay: null


    const alerta = await this.allertController.create({
      header:  `Tipo de Envio ${this.tipo_envio?.detail?.value}`,
      message: `Seu pedido chegará em até ${this.tempo} horas`,
      buttons:[`OK`]
    })
    await alerta.present()
   }

   async Calcular(){
      this.valor_final = 1
      return this.valor_final;
   }

}
