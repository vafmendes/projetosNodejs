import getPalavra from "./palavras.js";

const contentBtns = document.querySelector(".btns");
const contentGuessWord = document.querySelector(".guess-word");
const img = document.querySelector("img");
const contentClue = document.querySelector(".clue");
const btnNew = document.querySelector(".new");
const btnExit = document.querySelector(".exit");
btnNew.onclick = () => init();
btnExit.onclick = () => sair();
let indexImg;

init();

function init(){
    indexImg = 1;
    img.src = `./assets/img/img1.png`;

    generateGuessSection();
    generateButtons();
}

function sair(){
    window.location.href='index.html';
}


function generateGuessSection(){
    contentGuessWord.textContent = "";

    const {palavra, pista} = getPalavra();
    const palavraSemAcento = palavra.normalize("NFD").replace(/[\s+\u0300-\u036f]/g, "");
    
    Array.from(palavraSemAcento).forEach((letter) =>{
        const span = document.createElement("span");
        span.textContent = "_";
        span.setAttribute("palavra", letter.toUpperCase());
        contentGuessWord.appendChild(span);
    });

    contentClue.textContent = `Dica: ${pista}`;
}

function wrongAnswer(){
    indexImg++;
    img.src = `./assets/img/img${indexImg}.png`;

    if(indexImg === 7){
        setTimeout(()=>{
            alert("Você perdeu!");
            init();
        }, 100);

    }
}

function verifyLetter(letra){
    const arr = document.querySelectorAll(`[palavra="${letra}"]`);


    if(!arr.length) wrongAnswer();

    arr.forEach((e)=>{
        e.textContent = letra;
    });

    const spans = document.querySelectorAll(`.guess-word span`);
    const ganhou = !Array.from(spans).find((span) => span.textContent === "_");

    if(ganhou){
     setTimeout(()=>{
       alert("Parabéns!! Você venceu!!!");
       init();
      }, 100);
    }
}


function generateButtons(){
    contentBtns.textContent = "";

    for(let i = 97; i < 123; i++){
        const btn = document.createElement("button");
        const letra = String.fromCharCode(i).toUpperCase();
        btn.textContent = letra;

        btn.onclick = () =>{
            btn.disabled = true;
            btn.style.backgroundColor = "gray";
            verifyLetter(letra);
        }

        contentBtns.appendChild(btn);
    }
}