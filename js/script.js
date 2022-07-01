const inputs = document.querySelector('.inputs'),
resetbtn = document.querySelector('.button-btn'),
hint = document.querySelector('.hint span'),
guesleft = document.querySelector('.gues-left span'),
letterwrong = document.querySelector('.wrong-letter span'),
tinput = document.querySelector('.typing-input');

let word, maxguess, correct = [], incorrect = [];

function randomWord(){
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    maxguess = 8; correct = []; incorrect = [];
    console.log(word);

// hint content
    hint.innerText = ranObj.hint;
    guesleft.innerText = maxguess;
    letterwrong.innerText = incorrect;

    let html= "";
    for (let i=0; i < word.length; i++){
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord();

function initgame(e){
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrect.includes(` ${key}`) && !correct.includes(` ${key}`)){ // cheking if word or not
        if(word.includes(key)){ // if user letter found in word
            for(let i = 0; i < word.length; i++){
                if(word[i] === key){
                    correct.push(key);
                    inputs.querySelectorAll('input')[i].value = key;
                }
            }
        }else{
            maxguess--;
            incorrect.push(`${key}`);
        }
    }
    guesleft.innerText = maxguess;
    letterwrong.innerText = incorrect;
    tinput.value = "";

    setTimeout(()=>{
        if(correct.length === word.length){
            alert(`Congratulation you win ${word.toUpperCase()}`);
            randomWord();
        }else if(maxguess < 1){
            alert("game over!");
            for(let i = 0; i < word.length; i++){
                correct.push(key);
                inputs.querySelectorAll('input')[i].value = word[i];
            }
            randomWord();
        }
    });
}
resetbtn.addEventListener("click", randomWord);
tinput.addEventListener("input", initgame);
inputs.addEventListener("click", () => tinput.focus());
document.addEventListener("keydown", () => tinput.focus());