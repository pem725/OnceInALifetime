# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a simulation of a family solitaire card game called "Once In A Lifetime." The project includes multiple iterations and implementations in both Python and Julia, created to test the statistical probability of winning this card game.

## Core Architecture

### Game Rules Implementation
The solitaire game follows these rules:
1. Use all 52 cards from a standard deck
2. Draw cards one by one, placing them in stacks
3. Cards match if they have the same rank OR same suit
4. When cards match, they merge into stacks
5. Goal is to get all cards into one stack (the "Once In A Lifetime" win condition)

### Code Structure
- **Latest Python version**: `OiaLver0.0.5.py` - Most complete implementation with matplotlib visualization
- **Refactored Python version**: `GoodOne2.py` - Clean, object-oriented implementation with correct game logic
- **High-performance Julia version**: `OnceInALifetime.jl` - Optimized for large-scale simulations (millions of iterations)
- **Julia version**: `OiaLver0.0.5.jl` - Julia port with plotting capabilities
- **Historical versions**: `OiaLver0.0.1.py` through `OiaLver0.0.4.py` - Evolution of the implementation
- **Alternative implementations**: `GoodOne.py`, `OIAL.py`, `GeminiOIAL.py`

### Key Classes (v0.0.5)
- `Card`: Represents a playing card with rank and suit
- `Deck`: Manages the shuffled deck of 52 cards
- `Stack`: Manages card stacks during gameplay
- `check_matching_stacks()`: Core game logic for matching cards

## Common Development Commands

### Running Simulations
```bash
# Run the latest Python version with default 10,000 iterations
python OiaLver0.0.5.py

# Run refactored Python version (demonstrates correct game difficulty)
python3 GoodOne2.py

# Run high-performance Julia simulations
julia OnceInALifetime.jl 1000000  # 1 million iterations
julia OnceInALifetime.jl 1000000000  # 1 billion iterations

# Run original Julia version
julia OiaLver0.0.5.jl
```

### Dependencies
- **Python**: `matplotlib` for histogram visualization, `random` (built-in)
- **Julia**: `Random`, `Plots` packages

### Testing the Game Logic
The main function can be called with different iteration counts:
- `main()` - Run until first win (could be infinite)
- `main(iterations=N)` - Run N iterations and show results

## Game Logic Architecture

### Card Matching Algorithm
The core matching logic checks if cards have the same rank OR same suit. The `check_matching_stacks()` function looks at up to 3 previous stacks for potential matches.

### Stack Merging Strategy
The game implements a complex merging strategy:
1. Immediate matching when cards are played
2. Cascading merges when stacks combine
3. Cross-stack matching checks across multiple positions

### Statistical Analysis
The simulation tracks:
- Number of iterations to achieve victory
- Distribution of final stack counts
- Histogram visualization of results

## File Hierarchy by Completeness
1. `OiaLver0.0.5.py` - Most complete Python implementation
2. `OiaLver0.0.5.jl` - Julia port with equivalent functionality
3. `OiaLver0.0.4.py` - Advanced Python version
4. Earlier versions (0.0.1-0.0.3) - Progressive development
5. Alternative implementations - Various approaches to the same problem

## Statistical Results from Large-Scale Simulations

### Probability Analysis
After extensive computational analysis using the high-performance Julia implementation:

**1 Million Iteration Results:**
- **Win rate**: 0% (0 wins in 1,000,000 games)
- **Performance**: 237,755 games/second
- **Minimum score achieved**: 2 stacks (0.183% of games)
- **Most common scores**: 4-5 stacks (78% of games)
- **Mean score**: 4.367 stacks

**700 Million Iteration Results:**
- **Win rate**: 0% (0 wins in 700,000,000 games)
- **Performance**: ~194 million games/hour
- **Upper bound probability**: < 1.43 × 10⁻⁹ (less than 1 in 700 million)

### Key Findings
1. **"Once In A Lifetime" is extraordinarily well-named** - The probability of winning appears to be less than 1 in 700 million
2. **Even getting close is rare** - Only ~0.18% of games achieve 2 stacks
3. **The game is computationally challenging** - Requires massive simulations to estimate true probability
4. **Performance optimization matters** - Julia implementation achieved 200M+ games/hour for large-scale analysis

### Score Distribution (1M sample)
- 2 stacks: 0.183%
- 3 stacks: 13.282% 
- 4 stacks: 46.497%
- 5 stacks: 31.733%
- 6+ stacks: 8.305%

## Performance Benchmarks
- **Python (GoodOne2.py)**: ~35,000 games/second
- **Julia (OnceInALifetime.jl)**: ~240,000 games/second (7x faster)

## Quarto Document
`OnceInALifetime.qmd` contains the narrative and embedded code explaining the family card game origins and the motivation for creating this simulation.