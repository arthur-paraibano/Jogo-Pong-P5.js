// Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// Velocidade da bolinha
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;

// Variáveis da raquete
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Variáveis da minha raquete
let xRaquete = 5;
let yRaquete = 150;

// Variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

// Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.wav");
  ponto = loadSound("ponto.wav");
  raquetada = loadSound("raquetada.wav");
}

// Tamanho da tela
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

// Execulta as funções
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  bolinhaNaoFicaPresa();
  verificaColisaoBordas();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaqute();
  VerificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  VerificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

// Diametro da bolinha 
function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

// Velocidade da bolinha
function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function bolinhaNaoFicaPresa() {
  if (xBolinha - raio < -2){
    xBolinha = 23;
  }
}

// Verificação de bordas
function verificaColisaoBordas() {
    if (xBolinha + raio > width || 
      xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio > height || 
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
 if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
}

function verificaColisaoRaqute() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura && 
      yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function VerificaColisaoRaquete(x,y) {
  colidiu= 
collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

// -- PARA ATIVAR A OUTRA FUNÇÃO TIRE DE "//" UM E COLOQUE O OUTRO COMO 
// COMENTARIO. -- "movimentaRaqueteOponente" --

// --- Função abaixo é para dois jogadores

//function movimentaRaqueteOponente() {
//    if (keyIsDown(DOWN_ARROW)){
//    yRaqueteOponente += 10;
//  }
// if (keyIsDown(UP_ARROW)){
//   yRaqueteOponente -= 10;
//  }
//}

// --- Função abixo é do jogo- de forma altomatica ---
function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 80;
  yRaqueteOponente += velocidadeYOponente;
}

function incluiPlacar() {
  stroke(260);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(150, 9, 50, 20);
  fill(255);
  text(meusPontos, 173, 26);
  fill(color(255, 140, 0));
  rect(450, 9, 50, 20);
  fill(255);
  text(pontosDoOponente, 473, 26);
}

function marcaPonto() {
  if (xBolinha > 590){
    meusPontos+= 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}
