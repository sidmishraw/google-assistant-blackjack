

const visibleFunctions = require('visibleFunctions');
// card value determines the card
var cardFace = [2,3,4,5,6,7,8,9,10,'J', 'Q', 'K','A'];
var cardSuite = ['Spades', 'Club', 'Hearts', 'Diamond'];

var cardStack= [];


/* @Depricated

This functions are valid in the scenario if the suite is not taken into consideration and only the face value of card is taken into account.
var RandomCardGenerator = function(){

    return Math.floor(Math.random()*cardFace.length+0);
}

var GetRandomCard= function(){
    while(true){
        var tempVal = RandomCardGenerator();
        if(checkIfValueInCardStack(cardFace[tempVal])){
            cardStack.push(cardFace[tempVal]);
            break;
        }
    }
    return cardStack[cardStack.length-1];
}


var checkIfValueInCardStack = function(tempCardValue){
    for(var i=0; i<cardStack.length; i++){
        if(tempCardValue == cardStack[i]){
            return false;
        }
    }
    return true;
}


var printCardStack= function(){
    var tempVal = ""
    for(var i=0; i<cardStack.length; i++){
        tempVal = tempVal+" "+cardStack[i];
    }
}

var closestTo21 = function(stack){
    var countA = 0;
    var score = 0;
    for(var i=0; i<stack.length; i++){
        if(stack[i]=='A'){
            countA = countA+1;
        }else{
            score = score + getFaceValue(stack[i]);
        }
    }
    if(countA>0){
        score = logicToCalculate_A(countA, score);
    }
    return score;
}

*/

// Function is used to generate a random card from the entire deck of cards
var RandomCardGenerator = function(){
    var temp = [cardFace[Math.floor(Math.random()*cardFace.length+0)],cardSuite[Math.floor(Math.random()*cardSuite.length+0)]];
    // document.getElementById("randomCard").innerHTML = temp[0]+" " +[temp[1]; //Test Using the removing the comment from the line
    return temp;
}

// GetRandomCard function calls RandomCardGenerator function to generate a randomCard and then checks if that card is already fetched earlier.
// if the card is already picked, then the function RandomCardGenerator is called again, the process is repeated untill a unique card is fetched
// from the deck
var GetRandomCard= function(){
    while(true){
        var tempVal = RandomCardGeneratorTemp();
        if(checkIfValueInCardStackTemp(tempVal)){
            cardStack.push(tempVal);
            break;
        }
    }
    return cardStack[cardStack.length-1];
}

//This function helps in checking whether the card picked using the RandomCardGenerator is already picked or not
var checkIfValueInCardStack = function(tempCardValue){
    for(var i=0; i<cardStack.length; i++){
        if(tempCardValue[0] == cardStack[i][0] && tempCardValue[1] == cardStack[i][1]){
            return false;
        }
    }
    return true;
}

// calculateMaxScore is used to calculate the maximum score that could be acheived for the provided cards that have been dealt to the user or the computer.
var calculateMaxScore = function(stack){ // stack over here as an argument could refer to the card stack that are dealt to user of computer
    var score = 0;
    score = closestTo21(stack);
    return score;
}

// fetFaceValue function is used to get the face value of the card
var getFaceValue=function(value){
    if(value =='K' || value =='Q' ||value =='J')
        return 10;
    else if(value =='A'){
        return 'A';
    }
    else{
        return value;
    }
}

//topple function checks if the total score is greater than value 21
var topple = function(score){
    if(score>21){
        return true; // returns true if the total value of score is greater then 21
    }
    return false; // returns false if the total vale of score is not greater than 21
}

// logicToCalculate_A is implemented such that it utilizes the fact whether the value of A shall be used as 11 or 1
var logicToCalculate_A = function(countA, score){
    for(var i = countA; i>0; i--){
            if(score+11>21){
                score = score +1;
            }else{
                score = score+11;
            }
    }
}

// closestTo21 function is implemented to calculate the max score that could be achieved that is closer to value 21.
var closestTo21 = function(stack){ // stack over here as an argument could refer to the card stack that are dealt to user of computer
    var countA = 0;
    var score = 0;
    for(var i=0; i<stack.length; i++){
        if(stack[i][0]=='A'){
            countA = countA+1;
        }else{
            score = score + getFaceValue(stack[i][0]); // getFaceValue returns the value of a given card.
        }
    }
    if(countA>0){
        score = logicToCalculate_A(countA, score);
    }
    return score; // score is calculated such that, it is closer as closer to 21 as possible.
}

// function is used to check which stack is leading currently and closer to winning.
var getWinner =function(userStack, computerStack){
    var scoreUser = calculateMaxScore(userStack);
    var scoreComputer = calculateMaxScore(computerStack);
    return getWinnerFromScore(scoreUser,scoreComputer )

}
// getWinnerFromScore function could be utilized in the scenario, if scores for both the user and computer are known and decision is supposed
//to be made in order to decide, whom shall be the winner.
var getWinnerFromScore = function(userScore, computerScore){
    if(userScore>computerScore)
        return true;
    return false;
}

module.exports = visibleFunctions({
    GetRandomCard,
    topple,
    calculateMaxScore
});