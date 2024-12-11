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

/* 

fetch('quotes.json')
.then(response => response.json())
.then(data => {
    allQuotes=data;
    handleAllQuotes(allQuotes)
}) */
allQuotes = [
    {
     "quote": "It is a curious thing, the death of a loved one. We all know that our time in this world is limited. And yet it is always a surprise when it happens to someone we know. It is like walking up the stairs to your bedroom in the dark, and thinking there is one more stair than there is. Your foot falls down, through the air, and there is a sickly moment of dark surprise as you try to readjust the way you thought of things.",
     "author": "Lemony Snicket",
     "source": "The Reptile Room"
    },
    {
     "quote": "It seems to me that if you or I must choose between two courses of thought or action, we should remember our dying and try so to live that our death brings no pleasure to the world.",
     "author": "John Steinbeck",
     "source": "East Of Eden"
    },
    {
     "quote": "Words do not express thoughts very well. They always become a little different immediately they are expressed, a little distorted, a little foolish. And yet it also pleases me and seems right that what is of value and wisdom to one man seems nonsense to another.",
     "author": "Hermann Hesse",
     "source": "Siddhartha"
    },
    {
     "quote": "A person who has good thoughts cannot ever be ugly. You can have a wonky nose and a crooked mouth and a double chin and stick-out teeth, but if you have good thoughts they will shine out of your face like sunbeams and you will always look lovely.",
     "author": "Roald Dahl",
     "source": "The Twits"
    },
    {
       "quote": "A person who has good thoughts cannot ever be ugly. You can have a wonky nose and a crooked mouth and a double chin and stick-out teeth, but if you have good thoughts they will shine out of your face like sunbeams and you will always look lovely.",
       "author": "Roald Dahl",
       "source": "The Twits"
      },
      {
       "quote": "Most people are other people. Their thoughts are someone else's opinions, their lives a mimicry, their passions a quotation.",
       "author": "Oscar Wilde",
       "source": "De Profundis (1905)"
      },
      {
       "quote": "A reader lives a thousand lives before he dies;the man who never reads lives only one.",
       "author": "George RR Martin",
       "source": "A Dance With Dragons"
      },
      {
       "quote": "Nothing of me is original. I am the combined effort of everyone I've ever known.",
       "author": "Chuck Palahniuk",
       "source": "Invisible Monsters"
      },
      {
       "quote": "I fell in love the way you fall asleep: slowly, then all at once.",
       "author": "John Green",
       "source": "The fault in our stars"
      },
      {
       "quote": "None of us are all of who we are to any one person.",
       "author": "John Scalzi",
       "source": "The God Engines"
      },
      {
       "quote": "People are strange, when you're a stranger. Faces look ugly, when you're alone. Women seem wicked, when you're unwanted. Streets are uneven when you are down.",
       "author": "The doors",
       "source": "The song People are strange"
      },
      {
       "quote": "Don't cry when I die. When it's my time I probably won't die. I'll just lie down and close my eyes and think about stuff.",
       "author": "Pat Monahan, lead singer of Train",
       "source": "A quote said"
      },
      {
       "quote": "I believe in music the same way some people believe in fairy tales",
       "author": "Freddie Highmore",
       "source": "The Movie August Rush"
      },
      {
       "quote": "Nothing that is worth knowing can be taught",
       "author": "Oscar Wilde",
       "source": "A Few Maxims For The Instruction Of The Over-Educated (1894)"
      },
      {
       "quote": "After a while you learn to grow your own garden and decorate your own soul...instead of waiting for someone to bring you flowers",
       "author": "Jorge Luis Borges",
       "source": "You learn"
      },
      {
       "quote": "Don't think you are, know you are",
       "author": "Morpheous",
       "source": "the movie The Matrix"
      },
      {
       "quote": "I see now that the circumstances of one's birth are irrelevant; it is what you do with the gift of life that determines who you are.",
       "author": "Mewtwo",
       "source": " Pokemon: The First Movie to Detective Pikachu"
      },
      {
       "quote": "Now I am become Death, the destroyer of worlds.",
       "author": "J. Robert Oppenheimer",
       "source": "The movie Oppenheimer"
      },
      {
       "quote": "All women become like their mothers. That is their tragedy. No man does. That's his.",
       "author": "Oscar Wilde",
       "source": "The Importance of Being Earnest (1895) act 1"
      },
      {
       "quote": "We are all in the gutter, but some of us are looking at the stars.",
       "author": "Oscar Wilde",
       "source": "Lady Windermere's Fan (1892) act 3"
      },
      {
       "quote": "Experience is the name every one gives to their mistakes.",
       "author": "Oscar Wilde",
       "source": "Lady Windermere's Fan (1892) act 3"
      },
      {
       "quote": "It is only shallow people who do not judge by appearances.",
       "author": "Oscar Wilde",
       "source": "The Picture of Dorian Gray (1891) ch. 2"
      },
      {
       "quote": "A thing is not necessarily true because a man dies for it.",
       "author": "Oscar Wilde",
       "source": "The Portrait of Mr W. H. (1901)"
      },
      {
       "quote": "If you live to be a hundred, I want to live to be a hundred minus one day so I never have to live without you",
       "author": "A.A Milne",
       "source": "Winnie the Pooh"
      },
      {
       "quote": "All you need is love. But a little chocolate now and then doesn't hurt.",
       "author": " Charles M. Schulz",
       "source": "The comic strip Peanuts"
      },
      {
       "quote": "The more often we see the things around us, even the beautiful and wonderful things, the more they become invisible to us",
       "author": "Joseph B. Wirthlin",
       "source": "I have no idea where this is from :)"
      },
      {
       "quote": "A woman whose smile is open and whose expression is glad has a kind of beauty no matter what she wears.",
       "author": "Anne Roiphe",
       "source": "Even chatGPT doesn't know what book this is from :)"
      },
      {
       "quote": "And those who were seen dancing were thought insane by those who could not hear the music.",
       "author": "Friedrich Nietzsche",
       "source": "I couldn't find the book"
      },
      {
       "quote": "Nay though I walk through the valley of the shadow of death I shall fear no evil for thou art with me",
       "author": "David",
       "source": "...that's right. The Bible"
      },
      {
       "quote": "I'd rather be hated for who I am rather than loved for who I am not",
       "author": "Kurt Cobain",
       "source": "The life of Kurt Cobain"
      },
      {
       "quote": "How lucky I am to have something that makes saying goodbye so hard",
       "author": "Pooh",
       "source": "Winnie the Pooh"
      },
      {
       "quote": "Human beings, who are almost unique in having the ability to learn from the experience of others, are also remarkable for their apparent disinclination to do so.",
       "author": "Douglas Adams",
       "source": "Last Chance to See"
      },
      {
       "quote": "Early bird gets the worm, but the second mouse gets the cheese",
       "author": "Willie Nelson",
       "source": "...I don't have the slightest idea"
      },
      {
       "quote": "They've promised that dreams can come true - but forgot to mention that nightmares are dreams, too.",
       "author": "Tim Burton",
       "source": "The Melancholy Death of Oyster Boy"
      },
      {
       "quote": "Expecting the world to treat you fair because you are a good person, is like expecting a bull not to charge at you because you are vegetarian.",
       "author": "Dennis Wholey",
       "source": "???"
      },
      {
       "quote": "Sometimes, the best way to solve your own problems is to help someone else",
       "author": "Uncle Iroh",
       "source": "Avatar: The last Air bender"
      },
      {
       "quote": "5 years ago today, I asked a beautiful girl out on a date. Today, I asked her to marry me. She said no both times.",
       "author": "Some random dude...",
       "source": "reddit"
      },
      {
       "quote": "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.",
       "author": "Earl Nightingale",
       "source": "..."
      },
      {
       "quote": "If you wish to make an apple pie from scratch, you must first invent the universe.",
       "author": "Carl Sagan",
       "source": "Cosmos"
      },
      {
       "quote": "Keep your head up in failure, and your head down in success.",
       "author": "Jerry Seinfeld",
       "source": "..."
      },
      {
       "quote": "A smooth sea never made a skilled sailor.",
       "author": "Franklin D. Roosevelt",
       "source": "...I don't know"
      },
      {
       "quote": "Honesty is a very expensive gift, Don't expect it from cheap people.",
       "author": "Warren Buffett",
       "source": "Just a random thing he said"
      },
      {
       "quote": "Wake up to reality! Nothing ever goes as planned in this world. The longer you live, the more you realize that in this reality only pain, suffering and futility exist.",
       "author": "Madara Uchiha",
       "source": "Naruto Shippuden"
      },
      {
       "quote": "A place where people think of you is a place that you can call home",
       "author": "Jiraya Sensei",
       "source": "Naruto"
      },
      {
       "quote": "Why should I bear any hatred towards someone who's obviously weaker tham myself all I feel is pity.",
       "author": "The Lion Sin of Pride Escanor",
       "source": "Seven Deadly Sins"
      },
      {
       "quote": "The good guys always win, because the winner writes the history",
       "author": "Dofflamingo",
       "source": "One Piece"
      },
      {
       "quote": "Did you know that I'm afraid of a future where I can't have you but am still able to smile?",
       "author": "A side character",
       "source": "Sakurada Reset"
      },
      {
       "quote": "No matter how many people you may lose, you have no choice but to go on living. No matter how devastating the blows may be.",
       "author": "Kamado Tanjiro",
       "source": "Demon Slayer"
      }
 
 ]

 handleAllQuotes(allQuotes)