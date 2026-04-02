import random


def create_deck():
    ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
    suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
    deck = [(rank, suit) for rank in ranks for suit in suits]
    random.shuffle(deck)
    return deck


def is_matching(card1, card2):
    return card1[0] == card2[0] or card1[1] == card2[1]

def play_solitaire():
    deck = create_deck()
    left_stack = []
    right_stack = []

    # Initial draw
    left_stack.append(deck.pop())

    while deck:
        card = deck.pop()
        right_stack.append(card)

        while len(right_stack) >= 2 and is_matching(right_stack[-1], right_stack[-2]):
            matched_card = right_stack.pop()
            left_stack.append(matched_card)

            if is_matching(left_stack[-1], left_stack[0]):
                left_stack.extend(right_stack)
                right_stack = []

    return len(left_stack) + len(right_stack)

def main():

    # Main game loop
    iterations = 0
    while True:
        deck = create_deck()
        score = play_solitaire(deck)
        iterations += 1
        print("Iteration:", iterations, "Score:", score)
        if score == 1:
            print("Congratulations! You achieved a single stack in", iterations, "iterations.")
        break


if __name__ == "__main__":
    main()
