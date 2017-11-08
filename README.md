# google-assistant-blackjack
A simple BlackJack game using google assistant

The game always allows user to start first. At the begining of the game, user is dealt with a card, now the user have two choices:

1. (s)He could either be dealt a new card from the deck (which could be requested with the help of the command like Hit or deal) or
2. (s)He could stop from being dealt any more cards and final score is for the user is calculated in such a case.

While playing there could also be two scenarios that could occur, 

1. While the cards is being dealt from the deck, the score of the cards reaches 21, in such a case, the player playing the game is declared as "Winner". (Here, the player corresponds to either the User, playing the game or a Computer, playing as an opponent). 
2. While the cards are being dealt, the current score for the player could exceed the value 21, in such a case, that player is declared as a "Looser" for that game immideately. (Here, the player could be either the User playing the game or the Computer playing as an opponent).

Once, the User stops playing, Computer intitiates it's game and follows the same process as User, the only difference is that Computer keeps on being dealt a new random card until the score of the Computer exceeds the score of User. 


If the Computer achieves more score as compared to User following the conditions that the Game enforeses, the Computer is declared as "Winner". In other words, if the score of the Computer surpasses the score of User and the total score of the Computer is less than or equal to 21, than Computer is declared as the "Winner". 
If the score of the Computer exceeds 21, the User is declared as "Winner".
 