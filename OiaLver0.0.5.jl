using Random
using Plots

mutable struct Card
    rank::String
    suit::String
end

mutable struct Deck
    cards::Vector{Card}
    function Deck()
        ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]
        suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        cards = [Card(rank, suit) for suit in suits for rank in ranks]
        Random.shuffle!(cards)
        new(cards)
    end
end

mutable struct Stack
    cards::Vector{Card}
    function Stack()
        new([])
    end
end

function draw_card(deck::Deck)
    pop!(deck.cards)
end

function top_card(stack::Stack)
    if !isempty(stack.cards)
        return stack.cards[end]
    else
        return nothing
    end
end

function check_matching_stacks(stacks, index)
    for i in max(1, index - 3):index-1
        if !isempty(stacks[i].cards) && !isempty(stacks[index].cards) &&
                (stacks[i].cards[end].rank == stacks[index].cards[end].rank ||
                 stacks[i].cards[end].suit == stacks[index].cards[end].suit)
            return i
        end
    end
    return -1
end

function play_game()
    deck = Deck()
    stacks = [Stack()]

    while !isempty(deck.cards)
        card = draw_card(deck)
        current_stack = stacks[end]
        push!(current_stack.cards, card)

        # Keep merging stacks until no more matches are found
        while true
            merged = false
            for i in 1:length(stacks) - 1
                matching_index = check_matching_stacks(stacks, i)
                if matching_index != -1
                    append!(stacks[matching_index].cards, stacks[i].cards)
                    splice!(stacks, i)
                    merged = true
                    break
                end
            end
            if !merged
                break
            end
        end

        # Check for matches between all adjacent stacks and stacks separated by two other stacks
        for i in 1:length(stacks)
            for j in i+1:length(stacks)
                matching_index = check_matching_stacks(stacks, j)
                if matching_index != -1
                    append!(stacks[matching_index].cards, stacks[i].cards)
                    splice!(stacks, i)
                    break
                end
            end
        end

        push!(stacks, Stack())
    end

    return length(stacks)
end

function main(iterations::Int = nothing)
    results = []
    if iterations == nothing
        while true
            num_stacks = play_game()
            push!(results, num_stacks)
            if num_stacks == 1
                break
            end
        end
    else
        for _ in 1:iterations
            num_stacks = play_game()
            push!(results, num_stacks)
            if num_stacks == 1
                break
            end
        end
    end

    histogram(results, bins=collect(minimum(results):maximum(results)),
              xlabel="Number of Stacks", ylabel="Frequency",
              title="Histogram of Number of Stacks",
              xticks=collect(minimum(results):maximum(results)),
              alpha=0.75)
end

main(10000)  # Change the number of iterations as needed
