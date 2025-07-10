import random
from typing import List

class Card:
    def __init__(self, suit: str, rank: str):
        self.suit = suit
        self.rank = rank

    def __str__(self) -> str:
        return f"{self.rank} of {self.suit}"
    
    def __repr__(self) -> str:
        return f"Card('{self.suit}', '{self.rank}')"

class Deck:
    def __init__(self):
        self.cards = self._create_deck()
    
    def _create_deck(self) -> List[Card]:
        suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
        deck = [Card(suit, rank) for suit in suits for rank in ranks]
        random.shuffle(deck)
        return deck
    
    def pop(self) -> Card:
        return self.cards.pop()
    
    def __bool__(self) -> bool:
        return len(self.cards) > 0

class Stack:
    def __init__(self):
        self.cards: List[Card] = []
    
    def add_card(self, card: Card):
        self.cards.append(card)
    
    def top_card(self) -> Card:
        return self.cards[-1] if self.cards else None
    
    def __len__(self) -> int:
        return len(self.cards)

class Game:
    def __init__(self):
        self.stacks: List[Stack] = []
    
    def _check_matching_stacks(self, index: int) -> int:
        """Check if stack at index can match with adjacent stack or stack exactly 3 positions back"""
        current_top = self.stacks[index].top_card()
        if not current_top:
            return -1
        
        # Check adjacent stack (1 position back)
        if index >= 1:
            adjacent_top = self.stacks[index - 1].top_card()
            if (adjacent_top and 
                (adjacent_top.rank == current_top.rank or adjacent_top.suit == current_top.suit)):
                return index - 1
        
        # Check stack exactly 3 positions back
        if index >= 3:
            third_back_top = self.stacks[index - 3].top_card()
            if (third_back_top and 
                (third_back_top.rank == current_top.rank or third_back_top.suit == current_top.suit)):
                return index - 3
        
        return -1
    
    def play(self, deck: Deck) -> int:
        self.stacks = [Stack()]
        
        while deck:
            card = deck.pop()
            current_stack = self.stacks[-1]
            current_stack.add_card(card)
            
            # Keep merging stacks until no more matches are found
            while True:
                merged = False
                for i in range(len(self.stacks) - 1):
                    matching_index = self._check_matching_stacks(i)
                    if matching_index != -1:
                        self.stacks[matching_index].cards.extend(self.stacks[i].cards)
                        del self.stacks[i]
                        merged = True
                        break
                if not merged:
                    break
            
            # Check for matches between stacks
            for i in range(len(self.stacks)):
                for j in range(i + 1, len(self.stacks)):
                    matching_index = self._check_matching_stacks(j)
                    if matching_index != -1:
                        self.stacks[matching_index].cards.extend(self.stacks[i].cards)
                        del self.stacks[i]
                        break
            
            # Always create a new stack for the next card
            self.stacks.append(Stack())
        
        return len(self.stacks)

def main(target_score: int = 1, max_iterations: int = None) -> None:
    game = Game()
    iterations = 0
    
    while max_iterations is None or iterations < max_iterations:
        deck = Deck()
        score = game.play(deck)
        iterations += 1
        
        print(f"Iteration: {iterations}, Score: {score}")
        
        if score <= target_score:
            print(f"Congratulations! You achieved {score} stack(s) in {iterations} iterations.")
            break
    else:
        print(f"Reached maximum iterations ({max_iterations}) without achieving target score.")

if __name__ == "__main__":
    main(target_score=1)