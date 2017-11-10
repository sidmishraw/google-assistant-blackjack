/**
* businessLogic.js
* @author Gaurav Gupta and Sidharth Mishra
* @description Business Logic of the Black Jack game. Contains code for the random card generator and game logic.
* @created Wed Nov 08 2017 17:54:59 GMT-0800 (PST)
* @copyright 2017 Sidharth Mishra and Gaurav Gupta
* @last-modified Wed Nov 08 2017 17:54:59 GMT-0800 (PST)
*/

/**
 * Changelog v0.1:
 * • Code tested with Simulator, working fine. Edge cases to be taken care of before publishing :)
 * • Code clean up, documentation added for functions
 * • Added ES6 syntax
 */

//# ES6 import
import { head, last, tail } from "./blackjack-utils.js";
//# ES6 import

//# Card constants
// card value determines the card
const cardFaces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]; // card faces
const cardSuites = ["Spades", "Club", "Hearts", "Diamond"]; // card suites
//# Card constants

//# card
/**
 * A Card object
 */
export class Card {
  /**
   * The constructor of the Card, creates a card for the given face and suite
   * @param {String} face 
   * @param {String} suite 
   */
  constructor(face, suite) {
    this.face = face;
    this.suite = suite;
  }
  /**
   * Tests equality of this card with another Card
   * Both cards are equal if their suites and faces are equal
   * @param {Card} card The other card
   */
  equals(card) {
    return this.face === card.face && this.suite === card.suite;
  }

  /**
   * The string representation of the card
   * @returns {string} The string representation of the card
   */
  toString() {
    switch (this.face) {
      case "A":
        return `Ace of ${this.suite}`;
      case "K":
        return `King of ${this.suite}`;
      case "Q":
        return `Queen of ${this.suite}`;
      case "J":
        return `Jack of ${this.suite}`;
      default:
        return `${this.face} of ${this.suite}`;
    }
  }
}
//# card

/**
 * Generates a random card from the entire deck of cards
 * 
 * @returns {Card} a Card from the deck
 */
const randomCardGenerator = function() {
  return new Card(
    cardFaces[Math.floor(Math.random() * cardFaces.length + 0)],
    cardSuites[Math.floor(Math.random() * cardSuites.length + 0)]
  );
};

//# Random card generator
/**
 * `getRandomCard` function calls `randomCardGenerator` function to generate a randomCard and then checks if that card is already fetched earlier.
 * If the card is already picked, then the function `randomCardGenerator` is called again, the process is repeated untill a unique card is fetched from the deck.
 * @param {Card[]} cardStack The player's card stack to keep track of the card dealt to the player
 * @returns {[Card, Card[]]} the random card and the updated card stack tuple
 */
export const getRandomCard = function(cardStack) {
  let randomCard = randomCardGenerator();
  // console.log(`random card :: ${JSON.stringify(randomCard)}`);
  if (!isCardInStack(randomCard, cardStack)) {
    let updatedCardStack = cardStack.splice(0).concat([randomCard]);
    return [last(updatedCardStack), updatedCardStack];
  } else {
    return getRandomCard(cardStack);
  }
};
//# Random card generator

//# Utility method #1
/**
 * Checks if the randomCard is in the card stack or not. True if yes else false.
 * @param {Card} randomCard The card to check for in the card stack 
 * @param {Card[]} cardStack The stack of cards that have been dealt to the player
 * @returns {boolean} true if card is in the cardStack else false
 */
const isCardInStack = function(randomCard, cardStack) {
  const res = cardStack.filter(card => card.equals(randomCard));
  if (!res || res.length === 0) return false;
  return true;
};
//# Utility method #1

/**
 * Calculates the maximum score that could be achieved for the cards dealt to the player
 * @param {Card[]} stack The stack of cards that have been dealt to the player
 * @returns {number} the score, an Int
 */
export const calculateMaxScore = function(stack) {
  return closestTo21(stack) | 0; // for making it into an Int in case of trouble?
};

/**
 * Gets the corressponding score for the face value
 * @param {string} value The face of the card
 * @returns {number} The score for the particular face value, returns -1 for A
 */
const getFaceValue = function(value) {
  switch (value) {
    case "K":
    case "Q":
    case "J":
      return 10;
    case "A":
      return -1;
    default:
      return parseInt(value); // from 2-10
  }
};

/**
 * Checks if the total score is greater than 21
 * @param {number} score The score of the playe
 * @returns {boolean} true if the score is greater than 21 else false
 */
export const topple = function(score) {
  if (score > 21) return true;
  return false;
};

/**
 * Computes the score after deciding if A or Ace should have value 1 or 11
 * @param {number} countA The number of (A)s in the stack
 * @param {number} score the final score
 * @returns {number} The score after deciding the value of (A)s for the player
 */
const logicToCalculate_A = function(countA, score) {
  if(countA<=0) { //base case: when there are no Aces(A's) in the stack of cards, simply return the current score.
      return score;
  }
  score = score+(countA-1)*1; // Explaination: Aces(A's) with value 11 could be added only once, rest of the Aces(A's) will add up to the score with value 1.
  if (score + 11 > 21) {
    score = score+1;
  } else {
    score = score +11;
  }
  return score;
};

/**
 * Computes the max score that could be achieved by the player that is closer to 21.
 * Note: score is calculated such that, it is closer as closer to 21 as possible.
 * @param {Card[]} stack The player's card stack
 * @returns {number} The max score of the player
 */
const closestTo21 = function(stack) {
  let countA = stack.filter(card => card.face === "A").length; // the number of (A)s or aces in the player's card stack
  let score = logicToCalculate_A(
    countA,
    stack.filter(card => card.face !== "A").reduceRight((acc, card) => getFaceValue(card.face) + acc, 0)
  );
  return score;
};

/**
 * Checks which stack is leading currently and closer to winning
 * @param {Card[]} stack1 The stack of cards of player 1
 * @param {Card[]} stack2 The stack of cards of player 2
 * @returns {boolean} true if player 1 won else false
 */
export const getWinner = function(stack1, stack2) {
  let score1 = calculateMaxScore(stack1);
  let score2 = calculateMaxScore(stack2);
  return getWinnerFromScore(score1, score2);
};

/**
 * Scores of both players are compared. If player 1 wins; i.e score1 > score2 then returns true else false.
 * @param {number} score1 The score of first player 
 * @param {number} score2 The score of the second player
 * @returns {boolean} true if player 1 wins else returns false.
 */
const getWinnerFromScore = function(score1, score2) {
  if (score1 > score2) return true;
  return false;
};
