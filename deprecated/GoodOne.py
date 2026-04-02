import random

class Card:
    def __init__(self, suit, rank):
        self.suit = suit
        self.rank = rank

    def __str__(self):
        return self.rank + " of " + self.suit

def create_deck():
    suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
    ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
    deck = [Card(suit, rank) for suit in suits for rank in ranks]
    random.shuffle(deck)
    return deck

def play_solitaire(deck):
    stacks = []

    for _ in range(4):
        stacks.append([deck.pop()])

    while deck:
        card = deck.pop()

        placed = False
        for i in range(len(stacks)):
            if i > 2 and (card.suit == stacks[i - 3][-1].suit or card.rank == stacks[i - 3][-1].rank):
                stacks[i - 3].append(card)
                placed = True
                break
            elif i > 0 and (card.suit == stacks[i - 1][-1].suit or card.rank == stacks[i - 1][-1].rank):
                stacks[i - 1].append(card)
                placed = True
                break

        if not placed:
            stacks.append([card])

    return len(stacks)

# Main game loop
iterations = 0
while True:
    deck = create_deck()
    score = play_solitaire(deck)
    iterations += 1

    print("Iteration:", iterations, "Score:", score)

    if score == 3:
        print("Congratulations! You achieved a single stack in", iterations, "iterations.")
        break