const visibleFunctions = require('visibleFunctions');
// card value determines the card
var cardFace = [2,3,4,5,6,7,8,9,10,'J', 'Q', 'K','A'];
var cardSuite = ['Spades', 'Club', 'Hearts', 'Diamond'];

var cardStack= [];
var RandomCardGenerator = function(){
    return Math.floor(Math.random()*cardFace.length+0);
}
var GetRandomCard= function(){
    while(true){
        let tempVal = RandomCardGenerator();
        if(checkIfValueInCardStack(cardFace[tempVal])){
            cardStack.push(cardFace[tempVal]);
            break;
        }
    }
}
var checkIfValueInCardStack = function(tempCardValue){
    for(var i=0; i<cardStack.length; i++){
        if(tempCardValue == cardStack[i]){
            return false;
        }
    }
    return true;
}
var calculateMaxScore = function(stack){
    let score = 0;
    score = closestTo21(stack);
    return score;
}
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
var printCardStack= function(){
    let tempVal = ""
    for(let i=0; i<cardStack.length; i++){
        tempVal = tempVal+" "+cardStack[i];
    }
}
var topple = function(score){
    if(score>21){
        return false;
    }
    return true;
}
var logicToCalculate_A = function(countA, score){
    for(let i = countA; i>0; i--){
            if(score+11>21){
                score = score +1;
            }else{
                score = score+11;
            }
    }
}
var closestTo21 = function(stack){
    let countA = 0;
    let score = 0;
    for(let i=0; i<stack.length; i++){
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

module.exports = visibleFunctions({
    GetRandomCard,
    topple,
    calculateMaxScore
});