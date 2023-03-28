import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { TabelaTempo, TabelaPreco, TabelaDesconto } from './tabela.tempo';

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
  ValorComDesconto?: number;
  massa: number = 0
  dev: number = 0
  desconto: number = 0

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
    this.tipo_envio?.detail?.value == 'Fornecedor' ? this.tempo = TabelaTempo.Fornecedor: null

    this.tempo = this.tempo + (this.dev * 0.3)
   }

   async Calcular(){
    let comissao: number = 0
    let Vmul: number = 0
    if (this.tipo_envio?.detail?.value == 'Comum')  {comissao = TabelaPreco.Comum.comissao; Vmul = TabelaPreco.Comum.multiplicador}
    else if (this.tipo_envio?.detail?.value == 'Expressa') {comissao = TabelaPreco.Expresso.comissao; Vmul = TabelaPreco.Expresso.multiplicador}
    else if (this.tipo_envio?.detail?.value == 'Same Day')  {comissao = TabelaPreco.SameDay.comissao; Vmul = TabelaPreco.SameDay.multiplicador}
    else if (this.tipo_envio?.detail?.value == 'Fornecedor') {comissao = TabelaPreco.Fornecedor.comissao; Vmul = TabelaPreco.Fornecedor.multiplicador}


    if(this.massa >= 100){
      this.desconto = TabelaDesconto.kg100
    }
    else if (this.massa >= 50){
      this.desconto = TabelaDesconto.kg50
    }
    else if(this.massa >= 10){
      this.desconto = TabelaDesconto.kg10
    }
    this.desconto = (this.desconto * this.massa) / 100
  
    this.valor_final = (this.massa * Vmul * (this.dev * 0.6)) + comissao

    this.ValorComDesconto = this.valor_final - this.desconto

    const alerta = await this.allertController.create({
      header:  `Tipo de Envio ${this.tipo_envio?.detail?.value}`,
      message: `Seu pedido chegará em até ${this.tempo} horas`,
      buttons:[`OK`]
    })
    await alerta.present()

      return this.valor_final;
   }

}
