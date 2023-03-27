import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { TabelaTempo, TabelaPreco } from './tabela.tempo';

interface IonSel extends Event {
  detail?: {
      value: string;
  };
}

interface IonIn{
  target?: {
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
  massa?: string | number
  dev?: string | number

  constructor(public allertController: AlertController) {

  }

  getValue(event: any , type: 'm' | 'd'){
    if(type === 'm' && event.target?.value != undefined){
      this.massa = parseFloat(event.target?.value)
    }
    else if(type === 'd' && event.target?.value != undefined){
      this.dev = parseFloat(event.target?.value)
    }
  }


   async exibirEnvio(){

    this.tipo_envio?.detail?.value == 'Comum' ? this.tempo = TabelaTempo.Comum: null
    this.tipo_envio?.detail?.value == 'Expressa' ? this.tempo = TabelaTempo.Expresso: null
    this.tipo_envio?.detail?.value == 'Same Day' ? this.tempo = TabelaTempo.SameDay: null
    this.tipo_envio?.detail?.value == 'Fornecedor' ? this.tempo = TabelaTempo.SameDay: null

    //this.tempo = parseFloat(this.dev.detail.value) * 0.5
   }

   async Calcular(){
    
    const alerta = await this.allertController.create({
      header:  `Tipo de Envio ${this.tipo_envio?.detail?.value}`,
      message: `Seu pedido chegará em até ${this.tempo} horas`,
      buttons:[`OK`]
    })
    await alerta.present()

      return this.valor_final;
   }

}
