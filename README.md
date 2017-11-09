# google-assistant-blackjack
A simple BlackJack game using google assistant.

### Description:
The game always allows the user to start first. At the begining of the game, the user is dealt a card. Then, the user has two choices:

1. The user could be dealt a new card from the deck - which could be requested with the help of the command like "Hit" or "deal" or "yes" or "of course".

2. The user could stop pass and allow the PC to play the same number of turn and compute their scores.

> Note: The user and PC(Google Assistant app) are the two players of this game.

Following scenarios might occur when the cards are being dealt from the deck:

* The score of the cards reaches 21; in such a case, the player playing the game is declared as "Winner".

* The current score for the player could exceed the value 21; in such a case, that player is declared the "Loser" for that game immediately.

* If both the players have scores below 21, the player with score closest to 21 wins the game.


Once, the User stops playing (pass intent is fired), the PC intitiates its game and plays for the same number of times that the user played - We plan to update the logic to match the real BlackJack game soon!

### A sample script from the simulation:

> Legend: User, Google Assistant(GA), PC(Google Assistant app)

Game#1
```
User: talk to my test app
GA: Alright. Here's the test version of my test app.
PC: Black Jack time! You have been dealt the card Queen of Diamond. Now, your score is 10. Hit or Pass?
User: hit it
PC: Daring choice! You have been dealt the card 6 of Diamond. Now, your score is 16. Do you wanna deal again?
User: nah
PC: I played the same number of times. My score was 12. Your score was 16. Hence, You win, congrats!
GA: my test app left the conversation
```

Game#2
```
User: talk to my test app
GA: Okay. Getting the test version of my test app.
PC: Black Jack time! You have been dealt the card 2 of Hearts. Now, your score is 2. Hit or Pass?
User: who did
PC: Sorry, can you say that again?
User: hit it
PC: Daring choice! You have been dealt the card Ace of Spades. Now, your score is 13. Do you wanna deal again?
User: yes
PC: Daring choice! You have been dealt the card 9 of Club. Now, your score is 12. Do you wanna deal again?
User: yes
PC: Daring choice! You have been dealt the card 2 of Diamond. Now, your score is 14. Do you wanna deal again?
User: sure
PC: Can you say that again?
User: of course
PC: Sorry you toppled, I win haha...

GA: my test app left the conversation
```



`- Sid and Gaurav`