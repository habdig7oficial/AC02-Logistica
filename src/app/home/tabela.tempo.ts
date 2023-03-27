interface Tempo_Entrega {
  Comum: number;
  Expresso: number;
  SameDay: number;
  Fornecedor: number;
}

interface Preco_Entrega {
  Comum: { comissao: number; multiplicador: number };
  Expresso: { comissao: number; multiplicador: number };
  SameDay: { comissao: number; multiplicador: number };
  Fornecedor: { comissao: number; multiplicador: number };
}

/* Tempo em  horas */

export let TabelaTempo: Tempo_Entrega = {
  Comum: 120,
  Expresso: 48,
  SameDay: 12,
  Fornecedor: 240,
};

/* Commisao Em Reais, Multiplicar Distância */
export let TabelaPreco: Preco_Entrega = {
  Comum: { comissao: 0, multiplicador: 1 },
  Expresso: { comissao: 10, multiplicador: 1.2 },
  SameDay: { comissao: 12.99, multiplicador: 1.4 },
  Fornecedor: { comissao: 0, multiplicador: 0.7 },
};
