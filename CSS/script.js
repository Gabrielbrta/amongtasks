const inputName =  document.querySelector('.nome input')
const buttonSection = document.querySelectorAll('.button-section');

console.log(buttonSection)
let nome
let personagem;
let index = 0;
const imagens = [
  "./assets/SVG/character/Black.svg",
  "./assets/SVG/character/Blue.svg",
  "./assets/SVG/character/Brown.svg",
  "./assets/SVG/character/Green.svg",
  "./assets/SVG/character/Light-Blue.svg",
  "./assets/SVG/character/Lime.svg",
  "./assets/SVG/character/Orange.svg",
  "./assets/SVG/character/Red.svg",
  "./assets/SVG/character/Rose.svg",
  "./assets/SVG/character/Violet.svg",
  "./assets/SVG/character/White.svg",
  "./assets/SVG/character/Yellow.svg",
] 

function nextStage(){
  const sections = Array.from(document.querySelectorAll('section'))
  const body =  document.querySelector('body');

  buttonSection.forEach((item) =>{
    item.addEventListener('click', () =>{
      if(item.id === 'character'){
        body.replaceChild(sections[1], sections[0]);
        sections[1].style.display = 'block'; 
      }
      else if(item.id === 'apresentacao' && inputName.value != ''){
        body.replaceChild(sections[2], sections[1])
        sections[2].style.display = 'block'; 
      }
      else if (inputName.value == ''){
        inputName.classList.add("verifique")
      }
      else if(item.id === 'sequencia'){
        body.replaceChild(sections[3], sections[2]);
        sections[3].style.display = 'flex';
      }
      else if(item.id === 'escudo'){
        sections[3].style.display = 'none';
      }
    })
  })
}
nextStage()


function selectChar(){
  const img = document.querySelector('.char-lista img');
  const arrows = Array.from(document.querySelectorAll('.arrow'));
  let character = document.querySelector('.personagem img');
  function next(){
    img.src = imagens[++index];
    if(index > imagens.length - 1){
      img.src = imagens[index = 0];
    }
    personagem = document.querySelector('.char-lista img').src;
    character.src = personagem;
   }
   
   function previous(){
     img.src = imagens[--index];
     if(index < 0){
       img.src = imagens[index = imagens.length -1];
     }
     personagem = document.querySelector('.char-lista img').src;
     character.src = personagem;
   }
   
   arrows.forEach((item) =>{
     item.addEventListener('click', (event) =>{
       const target = event.target.id;
       if(target === 'right'){
         next();
       }else{
         previous();
       }
     })
   })
  }
selectChar();

function scan(){
  const informacaoNome =  document.querySelector('[data-nome="nome"] span');
  informacaoNome.style.color = 'lime';

  const informacaoPeso =  document.querySelector('[data-nome="peso"] span')
  informacaoPeso.style.color = 'lime'
  const peso = Array.from(Math.round(Math.random() *(120 - 50 + 1) + 50) + 'kg');
  
  const launchpad =  document.querySelector('.launchpad img');
  const dataActive = Array.from(document.querySelectorAll('[data-scan="active"]'));

  const scanAudio = new Audio('./assets/audios/scan-sound.ogg');
  scanAudio.volume = .2;
  
  const writeAudio =  new Audio('./assets/audios/teclar.mp3')
  writeAudio.volume = .1;
  
  const nextTaskButton =  document.querySelector('#sequencia');
  const contagem =  document.querySelector('.contagem-regressiva p');
  const contador = document.querySelector('.contador');

  
  function nextTask(){
    nextTaskButton.style.display = 'block';
  }

  function contagemRegressiva(duration, element){
    let second = duration;
   const timer =  setInterval(function(){
      element.innerHTML = second;
      if(second < 0){
        contagem.style.color = 'lime';
        contagem.innerHTML = 'Status: Complete';
        clearInterval(timer)
      }else{
        second--
      }
    }, 1000);
  }
  
  function screenWriter(array, index, element){
    const nome = Array.from(array.value);
    const write = setInterval(() => {
      if(index < nome.length){
        element.innerHTML += nome[index]
        writeAudio.play();
        index++
      }else{
        clearInterval(write);
      }
    }, Math.random() * (500 - 300 + 1) + 300).toFixed(2)
  }

  function screenWriterPeso(array, index, element){
    const peso = array
    const write = setInterval(() => {
      if(index < peso.length){
        element.innerHTML += peso[index]
        writeAudio.play();
        index++
      }else{
        clearInterval(write);
      }
    }, Math.random() * (500 - 300 + 1) + 300).toFixed(2)
  }

  function initScan(){
    dataActive.forEach(item => item.classList.add('active'));
    setTimeout(nextTask, 13000)
    screenWriter(inputName, 0, informacaoNome);
    setTimeout(() =>{
      screenWriterPeso(peso, 0, informacaoPeso)
    }, 6000)
    scanAudio.play();
    contagem.style.display = 'block';
    contagemRegressiva(12, contador)
  }
  
  launchpad.addEventListener('click', () => {
   const haveActive = dataActive[0].classList.contains('active');
    if(!haveActive){
      initScan()
    }
  })
}
scan();

function initVerifySequence(){

  function generateCode(number){
    const generatorCode = +Math.random(number * 1000000).toFixed(5).replace('0.', '');
    return generatorCode;
  }
  const code = document.querySelector('.code').innerText = generateCode(10000);
  const teclado = document.querySelectorAll('.numero');
  const inputCode = document.querySelector('#codigo');
  const apagar = document.querySelector('.apagar');
  const confirmar = document.querySelector('.confirmar');
  const correctAudio = new Audio('./assets/audios/correct-code.ogg');
  const wrongCodeAudio = new Audio('./assets/audios/wrong-code.ogg')
  
  function writeCode(event){
    const audioClick = new Audio('./assets/audios/som-tecla-code.ogg');
    const codeText = +event.target.innerText;
    const correctCode = code;

    if(event.target.classList.contains('tecla')){
      if(inputCode.value.length < 5){
        inputCode.value += codeText;
        audioClick.play();
      }
    }
    
    apagar.addEventListener('click', () =>{
      inputCode.value = '';
    })

    confirmar.addEventListener('click', () =>{
      if(inputCode.value == correctCode){
        correctAudio.play()
        correctAudio.volume = .3;
        buttonSection[3].style.display = 'block';
        nextStage();
      }
      else{
        wrongCodeAudio.play()
        wrongCodeAudio.volume = .3;
        inputCode.value = '';
      }
    })    
    
  }
  teclado.forEach(teclas => {
    teclas.addEventListener('click', writeCode)
  })
}
initVerifySequence();







