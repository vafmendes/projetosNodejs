const palavras = [
    { palavra: "abacaxi", pista: "Fruta tropical" },
    { palavra: "elefante", pista: "Animal de grande porte com tromba longa" },
    { palavra: "computador", pista: "Dispositivo eletrônico" },
    { palavra: "girafa", pista: "Animal alto, com pescoço longo" },
    { palavra: "chocolate", pista: "Doce feito de cacau" },
    { palavra: "piano", pista: "Instrumento musical com teclas" },
    { palavra: "tigre", pista: "Felino selvagem" },
    { palavra: "esmeralda", pista: "Tipo de pedra preciosa" },
    { palavra: "navio", pista: "Embarcação no mar" },
    { palavra: "telefone", pista: "Dispositivo de comunicação" },
    { palavra: "floresta", pista: "Área com muitas árvores" },
    { palavra: "quadrado", pista: "Figura geométrica de quatro lados" },
    { palavra: "foguete", pista: "Veículo espacial" },
    { palavra: "sorvete", pista: "Doce gelado" },
    { palavra: "bicicleta", pista: "Veículo de duas rodas" },
    { palavra: "avião", pista: "Meio de transporte aéreo" },
    { palavra: "macaco", pista: "Primate arbóreo" },
    { palavra: "raios", pista: "Descargas elétricas na atmosfera" },
    { palavra: "montanha", pista: "Elevação natural da terra" },
    { palavra: "vela", pista: "Objeto para iluminação" },
    { palavra: "akira toriyama", pista: "Criador de Dragon ball" },
  ];

  export default function getPalavra() {
    const index = Math.floor(Math.random() * palavras.length);
    return palavras[index];
  }
  