let card = document.getElementsByClassName("card");
let cards = [...card];
let deck = document.querySelector(".deck");
let stars = document.querySelector(".stars");
let firstStar = document.getElementById("3rd");
let secondStar = document.getElementById("2nd");
let moves = document.querySelector(".moves");
let restart = document.querySelector(".restart");
let time = document.querySelector(".timer");
let moveCounter = 0;
let seconds = 0;
let minutes = 0;
let timerRun = false;
let checkArr = [];
let winCondition = 0;
let endContainer = document.querySelector(".end");
let finalT = document.getElementById("finalTimer");
let finalM = document.getElementById("finalMoves");
let finalR = document.getElementById("finalRank");
let finalStars = document.querySelector(".fstars");
let fStar1 = document.getElementById("f3rd");
let fStar2 = document.getElementById("f2nd");
let playAgain = document.getElementById("playA");
//console.log();//for tests


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// function to active the shuffle for the new game and restart
function shuffled() {
    
    var shuffling =  shuffle(cards);
    deck.innerHTML = "";
    for (var i = 0; i < shuffling.length; i++) {
      [].forEach.call(cards, function(i){
        deck.appendChild(i);
      });
        cards[i].classList.remove("open");
        cards[i].classList.remove("show");
        cards[i].classList.remove("match");
        checkArr = [];
        moveCounter = 0;
        seconds = 0;
        minutes = 0;
        timerRun = false;
        winCondition = 0;
        
        time.textContent = "0" + minutes + " " + ":" + " " + "0" + seconds; //rest time content
        moves.textContent = moveCounter; //rest moves content
        firstStar.style.color = "#ffd700"; // rest stars rank
        secondStar.style.color = "#ffd700";// rest stars rank
    }
};

restart.addEventListener("click",shuffled);//restart button

//time counter
 setInterval (function timer() {
       
    if (timerRun === true) {
        seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++; 
        }
    time.textContent = "0" + minutes + " " + ":" + " " + "0" + seconds;
        
    if (seconds >= 10) {
        time.textContent = "0" + minutes + " " + ":" + " " + seconds; 
    }
        
    if (minutes >= 10) {
        time.textContent =  minutes + " " + ":" + " " + seconds;
    }
 }
          
}, 1000);

//run time , count moves and start game
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click",test);
};



function test() {
    let check = checkArr.push(this);
        //console.log(); //for tests
        
        //start timer
        timerRun = true;     
    
        //count moves and rank
        if (checkArr.length === 2) {
           // debugger; //for debug
            
            for(var i = 0; i < cards.length; i++)
             {
                 var Obj =  cards[i];
                Obj.classList.add("stop");
             }
            //moves
            moveCounter++;
            moves.textContent = moveCounter;
            //rank
            if (moveCounter == 11) {
            firstStar.style.color = "#000";
            }
            else if (moveCounter == 16) {
            secondStar.style.color = "#000";
            }
            //check cards
        if (checkArr[0].type === checkArr[1].type) {
            matchCard();
        } else {
            unmatchCard();
        }
        }
    
    };

//display class
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", function() {
        this.classList.add("show");
        this.classList.add("open");
    });
};

//match and unmatch Cards
function matchCard() {
  checkArr[0].classList.add("match");  
  checkArr[1].classList.add("match");
  checkArr[0].classList.remove("show");
  checkArr[0].classList.remove("open");
  checkArr[1].classList.remove("show");
  checkArr[1].classList.remove("open");
  checkArr = [];
  winCondition++;
  final();
    // to delay opening card
     setTimeout(function(){
               //debugger;//for debug
     for( var i = 0 ; i < cards.length ; i++  ) {
            var Obj =  cards[i];
            Obj.classList.remove("stop");
         }
        }, 1000);
};


function unmatchCard() {
    checkArr[0].classList.add("wrong");
    checkArr[1].classList.add("wrong");
    setTimeout(function () {
      checkArr[0].classList.remove("show");
      checkArr[0].classList.remove("open");
      checkArr[0].classList.remove("wrong");
      checkArr[1].classList.remove("show");
      checkArr[1].classList.remove("open");
      checkArr[1].classList.remove("wrong");
      checkArr = [];
    },1000);
    // to delay opening card
     setTimeout(function(){
               //debugger;//for debug
     for( var i = 0 ; i < cards.length ; i++  ) {
            var Obj =  cards[i];
            Obj.classList.remove("stop");
         }
        }, 1000);
};


//end message
function final(){

  if (winCondition == 8) {
      timerRun = false; //stop the timer
      endContainer.classList.add("apper"); //show the final message
      
      finalT.textContent = " " + minutes + " " + "minute(s)" + " " + "and" + " " + seconds + " " + "second(s)"; //time score
      
      finalM.textContent = " " + moveCounter + " " + "move(s)"; //move score
      
      //rank score
      if (moveCounter >= 11 && moveCounter < 16) {
        fStar1.style.color = "#000";
        }
      if (moveCounter >= 16) {
        fStar1.style.color = "#000";
        fStar2.style.color = "#000";
        }
  }   
//console.log();//for testing
};

// play again button
playAgain.addEventListener("click",function () {
    endContainer.classList.remove("apper");//remove the final message
    shuffled();
}); 

