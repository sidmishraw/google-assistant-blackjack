/**
* blackjack.js
* @author Sidharth Mishra
* @description BlackJack using Google Assitant and Actions on Google and DialogFlow
* @created Tue Nov 07 2017 13:25:06 GMT-0800 (PST)
* @copyright 2017 Sidharth Mishra and Gaurav Gupta
* @last-modified Tue Nov 07 2017 13:25:06 GMT-0800 (PST)
*/

"use strict";

//# ES6 styled imports
import { DialogflowApp } from "actions-on-google";
import * as functions from "firebase-functions";
import { sprintf } from "sprintf-js";
//# ES6 styled imports

//# Internal imports
import * as bjlogic from "./businessLogic.js";
//# Internal imports

//# Actions for BlackJack
const ACTIONS = {
  DEFAULT_WELCOME_INTENT: "input.welcome",
  HIT: "blackjack.hit", // the is the action for a `hit` intent
  PASS: "blackjack.pass" // the action for a `pass` intent
};
//# Actions for BlackJack

//# Default no input received or couldn't understand responses
const NO_RESPONSES = [
  `Oh dear! May be I missed it, could you say that again?`,
  `Pardon`,
  `Could you please repeat your response`
];
//# Default no input received or couldn't understand responses

//# Black Jack player card stacks
/**
 * The cards dealt to the first player - will be the user
 * @type {bjlogic.Card[]} 
 */
let player1CardStack = [];

/**
 * The cards dealt to the second player - will be the PC
 * @type {bjlogic.Card []}
 */
let player2CardStack = [];
//# Black Jack player card stacks

//# Black Jack player scores
/**
 * The score of the first player
 * @type {number}
 */
let player1Score = 0;

/**
 * The score of the second player
 * @type {number}
 */
let player2Score = 0;

/**
 * @Dirty
 * Resets the player scores at the end of a round
 */
const resetPlayers = () => {
  player1CardStack = [];
  player2CardStack = [];
  player1Score = 0;
  player2Score = 0;
  console.log("Player scores and card stacks have been reset!");
};
//# Black Jack player scores

//# Action Handlers
//# Welcome Handler
/**
 * The welcome handler handles the Welcome Intent
 * ACTION :: ACTIONS.DEFAULT_WELCOME_INTENT :: "input.welcome"
 * @param {DialogflowApp} app The app instance
 * @return {any} The response to the consumer's device
 */
const welcomeHandler = app => {
  //# reset the player scores just in case of residual stuff
  resetPlayers();
  //# reset the player scores just in case of residual stuff

  //# raw input
  /**
   * The user's raw input string
   * @type {string}
   */
  const rawInput = app.getRawInput();
  //# raw input

  let card = null; // the card dealt to the user

  //# get random card
  [card, player1CardStack] = bjlogic.getRandomCard(player1CardStack);
  //# get random card

  //# response
  const response = `Black Jack time! You have been dealt the card ${card.toString()}. Now, your score is ${bjlogic.calculateMaxScore(
    player1CardStack
  )}. Hit or Pass?`;
  //# response

  //# check if consumer's device(surface) has screen
  const hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
  //# check if consumer's device(surface) has screen
  //# No screen surface
  if (!hasScreen) return app.ask(response, NO_RESPONSES);
  //# No screen surface
  return app.ask(app.buildRichResponse().addSimpleResponse(response), NO_RESPONSES);
};
//# Welcome Handler

//# Hit Handler
/**
 * The hit handler handles the Hit Intent
 * ACTION :: ACTIONS.HIT = "blackjack.hit"
 * @param {DialogflowApp} app The app instance
 * @returns {any} The response to consumer's device
 */
const hitHandler = app => {
  //# raw input
  /**
   * The user's raw input string
   * @type {string}
   */
  const rawInput = app.getRawInput();
  //# raw input

  let card = null; // the card dealt to the user

  //# get random card
  [card, player1CardStack] = bjlogic.getRandomCard(player1CardStack);
  //# get random card

  //# base cases
  if (bjlogic.calculateMaxScore(player1CardStack) > 21) {
    resetPlayers();
    return app.tell(`Sorry you toppled, I win haha...`);
  }

  if (bjlogic.calculateMaxScore(player1CardStack) === 21) {
    resetPlayers();
    return app.tell(`Holy Smokes! Black Jack! You beat me..`);
  }
  //# base cases

  //# response
  const response = `Daring choice! You have been dealt the card ${card.toString()}. Now, your score is ${bjlogic.calculateMaxScore(
    player1CardStack
  )}. Do you wanna deal again?`;
  //# response

  //# check if consumer's device(surface) has screen
  const hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
  //# check if consumer's device(surface) has screen
  //# No screen surface
  if (!hasScreen) return app.ask(response, NO_RESPONSES);
  //# No screen surface
  return app.ask(app.buildRichResponse().addSimpleResponse(response), NO_RESPONSES);
};
//# Hit Handler

//# Pass Handler
/**
 * The pass handler handles the Pass Intent
 * ACTION :: ACTIONS.PASS = "blackjack.pass"
 * @param {DialogflowApp} app The app instance
 * @returns {any} The response to the consumer's device
 */
const passHandler = app => {
  //# raw input
  /**
   * The user's raw input string
   * @type {string}
   */
  const rawInput = app.getRawInput();
  //# raw input

  //# Player2's turn
  for (let i = 0; i < player1CardStack.length; i++) {
    let card = null; // the card dealt to the user
    //# get random card
    [card, player2CardStack] = bjlogic.getRandomCard(player2CardStack);
    //# get random card
  }
  //# Player2's turn

  //# base cases
  if (bjlogic.calculateMaxScore(player2CardStack) > 21) {
    resetPlayers();
    return app.tell(`Oh dear! I toppled. You win!`);
  }

  if (bjlogic.calculateMaxScore(player2CardStack) === 21) {
    resetPlayers();
    return app.tell(`Holy Smokes! Black Jack! I win!`);
  }
  //# base cases

  //# response
  const response = `I played the same number of times. My score was ${bjlogic.calculateMaxScore(
    player2CardStack
  )}. Your score was ${bjlogic.calculateMaxScore(player1CardStack)}. Hence, ${bjlogic.getWinner(
    player1CardStack,
    player2CardStack
  )
    ? "You win, congrats!"
    : "I win! Better luck next time!"}`;
  //# response

  //# reset player scores now
  resetPlayers();
  //# reset player scores now

  //# check if consumer's device(surface) has screen
  const hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
  //# check if consumer's device(surface) has screen
  //# No screen surface
  if (!hasScreen) return app.tell(response, NO_RESPONSES);
  //# No screen surface
  return app.tell(app.buildRichResponse().addSimpleResponse(response), NO_RESPONSES);
};
//# Pass Handler
//# Action Handlers

//# Action Map
/**
 * @type {Map<string, () => void>}
 */
const actionMap = new Map();
actionMap.set(ACTIONS.DEFAULT_WELCOME_INTENT, welcomeHandler);
actionMap.set(ACTIONS.HIT, hitHandler);
actionMap.set(ACTIONS.PASS, passHandler);
//# Action Map

/**
 * The entry point for the incoming request to the app.
 */
export const blackjackApp = functions.https.onRequest((req, res) => {
  const app = new DialogflowApp({ request: req, response: res });
  console.log(`Request headers: ${JSON.stringify(req.headers)}`);
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  app.handleRequest(actionMap);
});
