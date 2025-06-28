using Random
using Printf
using Statistics

# Card structure
struct Card
    suit::UInt8
    rank::UInt8
end

# Stack structure
mutable struct Stack
    cards::Vector{Card}
    
    Stack() = new(Card[])
end

function add_card!(stack::Stack, card::Card)
    push!(stack.cards, card)
end

function top_card(stack::Stack)
    isempty(stack.cards) ? nothing : last(stack.cards)
end

function Base.length(stack::Stack)
    length(stack.cards)
end

# Game structure
mutable struct Game
    stacks::Vector{Stack}
    
    Game() = new(Stack[])
end

# Create and shuffle deck
function create_deck()
    deck = Card[]
    # suits: 1=Hearts, 2=Diamonds, 3=Clubs, 4=Spades
    # ranks: 1=Ace, 2-10=Number cards, 11=Jack, 12=Queen, 13=King
    for suit in 1:4
        for rank in 1:13
            push!(deck, Card(suit, rank))
        end
    end
    shuffle!(deck)
    return deck
end

# Check if stack at index can match with stacks within range (max 3 back)
function check_matching_stacks(game::Game, index::Int)
    start_idx = max(1, index - 3)
    
    for i in start_idx:(index-1)
        top_i = top_card(game.stacks[i])
        top_index = top_card(game.stacks[index])
        
        if !isnothing(top_i) && !isnothing(top_index)
            if top_i.rank == top_index.rank || top_i.suit == top_index.suit
                return i
            end
        end
    end
    return -1
end

# Main game play function
function play_game!(game::Game, deck::Vector{Card})
    # Reset game state
    game.stacks = [Stack()]
    
    for card in deck
        # Add card to current (last) stack
        current_stack = last(game.stacks)
        add_card!(current_stack, card)
        
        # Keep merging stacks until no more matches are found
        while true
            merged = false
            stack_count = length(game.stacks)
            
            for i in 1:(stack_count-1)
                matching_index = check_matching_stacks(game, i)
                if matching_index != -1
                    # Merge stack i into matching_index
                    append!(game.stacks[matching_index].cards, game.stacks[i].cards)
                    deleteat!(game.stacks, i)
                    merged = true
                    break
                end
            end
            
            if !merged
                break
            end
        end
        
        # Check for matches between all stacks
        stack_count = length(game.stacks)
        for i in 1:stack_count
            for j in (i+1):stack_count
                if j <= length(game.stacks)  # Check bounds after potential deletions
                    matching_index = check_matching_stacks(game, j)
                    if matching_index != -1 && matching_index < j
                        # Merge stack at position i into matching stack
                        append!(game.stacks[matching_index].cards, game.stacks[i].cards)
                        deleteat!(game.stacks, i)
                        break
                    end
                end
            end
        end
        
        # Always create a new stack for the next card
        push!(game.stacks, Stack())
    end
    
    return length(game.stacks)
end

# High-performance simulation runner
function run_simulation(iterations::Int; target_score::Int = 1, print_progress::Bool = true)
    game = Game()
    results = Int[]
    wins = 0
    
    progress_interval = max(1, iterations ÷ 100)  # Print progress every 1%
    
    for i in 1:iterations
        deck = create_deck()
        score = play_game!(game, deck)
        push!(results, score)
        
        if score <= target_score
            wins += 1
            if print_progress
                @printf("WIN! Iteration %d: Score %d\n", i, score)
            end
        end
        
        if print_progress && i % progress_interval == 0
            win_rate = wins / i
            @printf("Progress: %d/%d (%.1f%%) | Wins: %d | Win rate: %.6f%%\n", 
                    i, iterations, 100*i/iterations, wins, 100*win_rate)
        end
    end
    
    return results, wins
end

# Statistical analysis
function analyze_results(results::Vector{Int}, wins::Int, iterations::Int)
    println("\n" * "="^60)
    println("SIMULATION RESULTS")
    println("="^60)
    
    @printf("Total iterations: %d\n", iterations)
    @printf("Wins (score ≤ 1): %d\n", wins)
    @printf("Win rate: %.8f%% (1 in %.0f)\n", 100*wins/iterations, iterations/max(wins, 1))
    
    println("\nScore distribution:")
    score_counts = Dict{Int, Int}()
    for score in results
        score_counts[score] = get(score_counts, score, 0) + 1
    end
    
    for score in sort(collect(keys(score_counts)))
        percentage = 100 * score_counts[score] / iterations
        @printf("  %d stacks: %d times (%.3f%%)\n", score, score_counts[score], percentage)
    end
    
    println("\nStatistics:")
    @printf("  Mean score: %.3f\n", mean(results))
    @printf("  Median score: %.1f\n", median(results))
    @printf("  Min score: %d\n", minimum(results))
    @printf("  Max score: %d\n", maximum(results))
    @printf("  Std deviation: %.3f\n", std(results))
end

# Main execution function
function main(iterations::Int = 1_000_000)
    println("Once In A Lifetime Solitaire - Julia High-Performance Simulation")
    println("Target: Reduce all 52 cards to 1 stack")
    @printf("Running %d iterations...\n\n", iterations)
    
    start_time = time()
    results, wins = run_simulation(iterations)
    end_time = time()
    
    elapsed = end_time - start_time
    @printf("\nSimulation completed in %.2f seconds\n", elapsed)
    @printf("Performance: %.0f games/second\n", iterations/elapsed)
    
    analyze_results(results, wins, iterations)
end

# Run if called directly
if abspath(PROGRAM_FILE) == @__FILE__
    # Default to 1 million iterations, but allow command line argument
    iterations = length(ARGS) > 0 ? parse(Int, ARGS[1]) : 1_000_000
    main(iterations)
end