import random
import matplotlib.pyplot as plt

class Card:
    def __init__(self, rank, suit):
        self.rank = rank
        self.suit = suit

    def __str__(self):
        return f"{self.rank} of {self.suit}"


class Deck:
    def __init__(self):
        ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
        suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        self.cards = [Card(rank, suit) for suit in suits for rank in ranks]
        random.shuffle(self.cards)

    def draw_card(self):
        return self.cards.pop()


class Stack:
    def __init__(self):
        self.cards = []

    def add_card(self, card):
        self.cards.append(card)

    def top_card(self):
        if self.cards:
            return self.cards[-1]
        else:
            return None


def check_matching_stacks(stacks, index):
    for i in range(max(0, index - 3), index):
        if stacks[i].top_card() and stacks[index].top_card() and \
                (stacks[i].top_card().rank == stacks[index].top_card().rank or \
                 stacks[i].top_card().suit == stacks[index].top_card().suit):
            return i
    return -1

def play_game():
    deck = Deck()
    stacks = [Stack()]

    while deck.cards:
        card = deck.draw_card()
        current_stack = stacks[-1]
        current_stack.add_card(card)

        # Keep merging stacks until no more matches are found
        while True:
            merged = False
            for i in range(len(stacks) - 1):
                matching_index = check_matching_stacks(stacks, i)
                if matching_index != -1:
                    stacks[matching_index].cards.extend(stacks[i].cards)
                    del stacks[i]
                    merged = True
                    break
            if not merged:
                break

        # Check for matches between all adjacent stacks and stacks separated by two other stacks
        for i in range(len(stacks)):
            for j in range(i + 1, len(stacks)):
                matching_index = check_matching_stacks(stacks, j)
                if matching_index != -1:
                    stacks[matching_index].cards.extend(stacks[i].cards)
                    del stacks[i]
                    break

        stacks.append(Stack())


    return len(stacks)


def main(iterations=None):
    results = []
    if iterations is None:
        while True:
            num_stacks = play_game()
            results.append(num_stacks)
            if num_stacks == 1:
                print("You won in ", len(results), " iterations")
                break
    else:
        for _ in range(iterations):
            num_stacks = play_game()
            results.append(num_stacks)
            if num_stacks == 1:
                print("You won in ", len(results), " iterations")
                break

    plt.hist(results, bins=range(min(results), max(results) + 1), align='left', rwidth=0.8)
    plt.xlabel('Number of Stacks')
    plt.ylabel('Frequency')
    plt.title('Histogram of Number of Stacks')
    plt.xticks(range(min(results), max(results) + 1))
    plt.grid(axis='y', alpha=0.75)
    plt.show()



if __name__ == "__main__":
    main(iterations=10000)  # Change the number of iterations as needed
