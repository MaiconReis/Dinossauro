const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

// função criada que recebe um evento
function handleKeyUp(event) {
  // .keyCode = código do caractere, se pressionou o 32 o dinossauro vai pular
  // http://javascriptkeycode.com/ site com .keyCode
  if (event.keyCode === 32) {
    // se o dinossauro não estiver pulando, ele vai pular
    if (!isJumping) {
      jump();
    }
  }
}

// função responsável pelo pulo do dinossauro
function jump() {
  isJumping = true;

  // intervalo de subida
  let upInterval = setInterval(() => {
    // se a posição for maior ou igual a 150 px
    if (position >= 150) {
      // o dinossauro vai descer
      clearInterval(upInterval);

      // intervalo de descida
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          // descendo
          position -= 20;
          dino.style.bottom = position + 'px';
        }

        // o código vai ser executado a cada 20 milisegundos
      }, 20);
    } else {
      // subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

// função que cria os cactos
function createCactus() {

  // cria uma div com o javascript
  const cactus = document.createElement('div');
  let cactusPosition = 1000;

  // gera um número aleatório
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  // adiciona uma classe cactus
  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // saiu da tela
      clearInterval(leftTimer);
      // quando sair da tela o cacto vai desaparecer
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">✨Game Over✨</h1>';
    } else {
      // velocidade que se move para a esquerda
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  // cria cactos de maneira aleatória
  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
