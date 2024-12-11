let allQuotes;
let randomQuote;
let randomIndex;
var selectedQuoteObject;
var selectedQuote;
var documentFragment;
var formattedWord;
var arrayOfSplitWords;
var divWords;
let game = document.getElementById('game');
let timer = document.getElementById('timer')
let count;
var words;
let currentWord;
let currentLetter;
let expected;
let appended;
let started = false;
let correctLetters=[];


//define display result//
function displayResult(){
    letters=document.querySelectorAll('.letter')
    numberOfLetters=letters.length;
    correctLetters=document.querySelectorAll('.correct')
    numberOfCorrectLetters=correctLetters.length;
    typedWords=numberOfCorrectLetters/5;
    wpm=Math.floor(typedWords/(timer.innerText/60));
    accuracy=Math.floor((numberOfCorrectLetters/numberOfLetters)*100)
    game.innerHTML=" "
    result=document.createElement("div");
    source=document.createElement("div");
    restart=document.createElement("div");
    source.classList.add("source")
    result.classList.add('result');
    sourceName=selectedQuoteObject.source;
    authorName=selectedQuoteObject.author;
    result.innerText=`Your typing speed is ${wpm} WPM with an accuracy of ${accuracy}%`
    source.innerText=`The text was an excerpt from ${sourceName} by ${authorName}`
    restart.innerText="Press the TAB key to restart!"
    game.appendChild(result);
    game.appendChild(source);


}

//define switchCurrentClass
function switchCurrentClass(current, next){
    current.classList.remove('current');
    next.classList.add('current');
   
}

function startGame(){
    currentWord = document.querySelector('#word')
    nextWord = currentWord.nextSibling
    currentLetter = currentWord.firstChild
    currentWord.classList.add('current')
    currentLetter.classList.add('current')
    expected = currentLetter.innerHTML;

    //handle keys//
    document.addEventListener('keydown', (e) => {
        nextWord=currentWord.nextSibling;
        let nextSpan = currentLetter.nextSibling
        if(e.key && started == false && e.key.length == 1){
            started = true;
            
        if(started){
          count=setInterval(() => {
              timer.innerText++  
            }, 1000);
        }

        }
        if(!nextWord){
            if(!nextSpan){
                currentLetter.classList.remove('current');
                currentLetter.classList.add('correct');
                clearInterval(count);
                displayResult();
            }
            if(e.key == " "){
                currentLetter.classList.remove('current');
                currentLetter.classList.add('correct');
                clearInterval(count);
                displayResult();
            }
           
      }

      
        //defining backspace//
        if(e.key === 'Backspace'){
            previous = currentLetter.previousSibling;
            if(previous){
                appended = currentWord.lastChild.classList.contains('appended')            
                if(!appended){
                    currentLetter.classList.remove('current');
                    currentLetter.classList.remove('correct');
                    currentLetter.classList.remove('incorrect');
                    currentLetter = currentLetter.previousSibling;
                    currentLetter.classList.remove('correct');
                    currentLetter.classList.remove('incorrect')
                    expected = currentLetter.innerHTML;
                } 
               if(appended){
                currentLetter = currentLetter.previousSibling;
                currentLetter.classList.add('current')
                currentWord.removeChild(currentWord.lastChild)

            }
            }
          
        }

          // wrong key is pressed in the middle or end of a word//
          if(e.key != expected ){
            if(e.key.length == 1 && e.key != " " && nextSpan){
                currentLetter.classList.add('incorrect')
                currentLetter.classList.remove('current');
                currentLetter = currentLetter.nextSibling;
                currentLetter.classList.add('current');
                expected = currentLetter.innerHTML;
            }else if(e.key.length == 1 && e.key != " " && !nextSpan){
                currentLetter.classList.remove('current');
                if(currentLetter.classList.contains('incorrect')){
                   incorrect = e.key;
                   appended = document.createElement('span')
                   appended.classList.add('appended');
                   appended.classList.add('current')
                   appended.classList.add('incorrect')
                   appended.textContent = incorrect;
                   currentWord.appendChild(appended) 
                   currentLetter = appended;
                    expected = " ";
                }else {
                    if(!currentLetter.classList.contains('correct'))
                    currentLetter.classList.add('incorrect')
                }
              
            }
        }

        if(e.key == expected && e.key != " "){
            console.log(e.key)
            
            nextSpan = currentLetter.nextSibling
            

            if(nextSpan){
                nextLetter = nextSpan.innerHTML
                currentLetter.classList.add('correct')
                switchCurrentClass(currentLetter, nextSpan)
                currentLetter = nextSpan;
                expected = currentLetter.innerHTML
                currentLetter.classList.add('current')

                
                
            } else if(nextWord){
                currentLetter.classList.add('correct')
                expected = " ";
               
            }
                   
        }
        if(e.key == " " && !nextSpan){
            if(expected != " "){
                currentLetter.classList.remove('current');
                currentLetter.classList.add('incorrect')
                currentWord.classList.remove('current');
                currentWord = currentWord.nextSibling;
                currentLetter = currentWord.firstChild;
                currentWord.classList.add('current');
                currentLetter.classList.add('current');
                expected = currentLetter.innerHTML;            }
            if(expected == " "){
                switchCurrentClass(currentWord, currentWord.nextSibling);
                switchCurrentClass(currentLetter, currentWord.nextSibling.firstChild);
                currentWord = currentWord.nextSibling
                currentLetter = currentWord.firstChild
                expected = currentWord.firstChild.innerHTML;
            }
           
        }

       
         if(e.key == " " && nextSpan){
                currentLetter.classList.remove('current');
                invalidate = currentWord.querySelectorAll(".letter:not(.correct)")
                invalidate.forEach(letter => {
                 letter.classList.add('incorrect')
                }) 
                currentWord.classList.remove('current');
                currentWord = currentWord.nextSibling;
                currentLetter = currentWord.firstChild;
                currentWord.classList.add('current');
                currentLetter.classList.add('current');
                expected = currentLetter.innerHTML;
           
        }

       
           })
}

//define handleSelectedQuote
function handleSelectedQuote(selectedQuote){
    words = selectedQuote.split(" ");
    for(let i=0; i<words.length; i++){
        individualWord = words[i];
        divWords = document.createElement('div');
        divWords.id = 'word'

        for(let j=0; j<individualWord.length; j++){
            spanLetters = document.createElement('span')
            spanLetters.textContent = individualWord[j];
            spanLetters.id = 'letter';
            spanLetters.classList.add('letter')         
            divWords.appendChild(spanLetters);
        }
        game.appendChild(divWords)
    }
    startGame()
}

function handleAllQuotes(array){
    //generate random index
    let randomIndex = Math.floor(Math.random()*array.length);
    //select a random quote
    selectedQuoteObject = array[randomIndex];
    selectedQuote = selectedQuoteObject.quote;
    handleSelectedQuote(selectedQuote)    
}



fetch('quotes.json')
.then(response => response.json())
.then(data => {
    allQuotes=data;
    handleAllQuotes(allQuotes)
}) 

 handleAllQuotes(allQuotes)
