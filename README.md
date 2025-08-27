# 🎴 Once In A Lifetime: The Ultimate Solitaire Challenge

> *A multi-generational family card game that has captivated players for decades - now with computational analysis to discover just how special that "once in a lifetime" moment truly is!*

## 🏠 The Family Story

This repository contains the computational analysis of a beloved family solitaire game passed down through generations. What started as a friendly family debate about the difficulty of achieving victory led to one of the most extensive card game probability studies ever conducted - with over **700 million simulated games**!

The catalyst? A confident family member claimed to have won "several times" and found it "boring." With 40+ years of gameplay experience and a background in quantitative analysis, the challenge was set: **prove just how extraordinary a win truly is**.

## 🎯 Game Overview

**Once In A Lifetime** is a solitaire card game where the ultimate goal is to consolidate all 52 cards into a single stack. The name perfectly captures the rarity of this achievement - as our extensive computational analysis reveals!

### 🎴 How to Play

#### Setup
- Start with a standard 52-card deck, shuffled
- Your goal: Get all cards into **one stack**

#### Gameplay Rules

1. **Initial Play**: Draw and place the first card face-up ♠️

2. **Draw and Compare**: Draw the next card from the deck

3. **Matching Logic**: The new card is compared to existing stack tops using these rules:
   - Cards match if they have the **same rank** OR **same suit**
   - New cards can match with stacks in **two specific positions only**:
     - **Adjacent stack** (immediately to the left)
     - **Stack exactly 3 positions back** (3 positions to the left)
   
   **Position Rule Example** (with stacks Z, C, Y, X from left to right):
   ```
   Z    C    Y    X
   ♠️K  ♦️5  ♣️7  [New Card: ♠️A]
   
   ♠️A can match with:
   ✅ Y (adjacent): ♠️A vs ♣️7 = No match
   ✅ Z (3 back): ♠️A vs ♠️K = Same suit! Match!
   ❌ C (2 back): Not allowed by rules
   ```

4. **Player Choice**: If both positions have matches, player chooses one (but not both)

5. **Stack Consolidation**: When cards match, place the new card on top:
   ```
   Before: ♠️K  ♦️5  ♣️7  
   After:  ♠️A  ♦️5  ♣️7
           ♠️K
   ```

6. **Cascading Matches**: After any match, check if stacks can now merge using the same position rules

7. **No Match Rule**: If no valid match exists (adjacent OR 3-back), create a new stack to the right

8. **Scoring**: Continue until all 52 cards are drawn. Count your final stacks - **fewer is better!**

### 🎖️ Scoring System

| Stacks | Achievement Level | Rarity |
|--------|------------------|---------|
| 🏆 **1 stack** | **ONCE IN A LIFETIME!** | *Extraordinarily Rare* |
| 🥈 **2 stacks** | Legendary | 0.18% of games |
| 🥉 **3 stacks** | Exceptional | 13.3% of games |
| 📊 **4-5 stacks** | Good Game | 78% of games |
| 📈 **6+ stacks** | Keep Trying! | 8.3% of games |

## 🚀 Quick Start Guide

### Python Implementation
```bash
# Run the latest, most complete version
python OiaLver0.0.5.py

# Try the clean, object-oriented version
python GoodOne2.py

# These will run 10,000 simulations by default
```

### Julia Implementation (High Performance)
```bash
# For serious statistical analysis
julia OnceInALifetime.jl 1000000    # 1 million games
julia OnceInALifetime.jl 1000000000 # 1 billion games!

# Standard version with plotting
julia OiaLver0.0.5.jl
```

### 📋 Requirements
- **Python**: `matplotlib` for visualizations
- **Julia**: `Random`, `Plots` packages

## 🧪 The Great Computational Experiment

### Methodology
Using high-performance Julia code, we conducted one of the largest solitaire simulations ever:
- **700+ million games** simulated
- **Multiple implementations** to verify accuracy
- **Statistical analysis** of score distributions
- **Performance optimization** achieving 240,000+ games/second

### 🎊 The Remarkable Results

#### Win Rate Discovery
After **700 million simulations**:
- 🏆 **Wins achieved**: 0
- 📊 **Upper bound probability**: Less than 1 in 700 million
- 🎯 **Conclusion**: "Once In A Lifetime" is *perfectly* named!

#### Performance Achievements
| Implementation | Games/Second | Best Use Case |
|---------------|--------------|---------------|
| Python (OiaLver0.0.5) | ~35,000 | Learning & Visualization |
| Python (GoodOne2) | ~35,000 | Clean Code Study |
| **Julia** | **~240,000** | **Large-Scale Analysis** |

#### Score Distribution (1 Million Game Sample)
```
🎯 2 stacks: ████ 0.18%  (1,830 games) - LEGENDARY!
📊 3 stacks: ████████████████ 13.28%  - Exceptional
📈 4 stacks: ████████████████████████████████████████ 46.50% - Great!
📈 5 stacks: ████████████████████████████ 31.73% - Good!
📉 6+ stacks: ██████ 8.31% - Keep playing!
```

## 🗂️ Implementation Versions

### 🐍 Python Implementations
- **`OiaLver0.0.5.py`** - 🌟 Most complete with matplotlib histograms
- **`GoodOne2.py`** - 🎯 Clean, object-oriented design
- **`OiaLver0.0.1.py` to `0.0.4.py`** - 📚 Evolution of development
- **Alternative versions** - Various approaches and experiments

### ⚡ Julia Implementations  
- **`OnceInALifetime.jl`** - 🚀 High-performance simulation engine
- **`OiaLver0.0.5.jl`** - 📊 Full-featured with plotting capabilities

### 📖 Documentation
- **`OnceInALifetime.qmd`** - 📝 Complete narrative and analysis
- **`CLAUDE.md`** - 🤖 AI development guidance

## 🎮 Try It Yourself!

### Single Game Simulation
```python
from OiaLver0_0_5 import main
main(iterations=1)  # Play one game and see your score!
```

### Statistical Analysis
```python
main(iterations=100000)  # Analyze 100K games
```

### Hunt for Victory
```python
main()  # Run until first win (could take a VERY long time!)
```

## 🔬 Scientific Insights

### Why Is This Game So Difficult?
1. **Restrictive Position Rules**: Cards can ONLY match adjacent OR exactly 3 positions back - no other positions allowed
2. **Limited Matching Options**: Only rank OR suit matching
3. **Sequential Dependencies**: Card order matters tremendously  
4. **Cascade Complexity**: Matches can trigger chain reactions, but still follow strict position rules
5. **Choice Constraints**: When both positions have matches, choosing one eliminates the other opportunity
6. **Probabilistic Convergence**: Getting close requires multiple rare events aligning perfectly

### The Mathematics of Rarity
- **52! possible deck arrangements**: 8.07 × 10⁶⁷ combinations
- **Complex state space**: Each card placement creates branching possibilities
- **Convergence requirements**: Multiple perfect matching sequences needed
- **Statistical significance**: 700M+ samples provide robust probability bounds

## 🏁 Conclusions

Our computational analysis definitively proves that achieving a "Once In A Lifetime" victory is:

✨ **Extraordinarily rare** - Less than 1 in 700 million chance  
🎯 **Perfectly named** - The game title captures the true rarity  
🧬 **Statistically fascinating** - A beautiful example of complex probability  
👨‍👩‍👧‍👦 **Family legend confirmed** - 40+ years of gameplay experience validated!

### 🎉 The Positive Perspective
While winning is incredibly rare, this makes the game:
- **Endlessly replayable** - Every game offers hope!
- **Statistically fascinating** - Each attempt contributes to understanding
- **Family bonding material** - Shared challenge across generations  
- **Computational showcase** - Demonstrates the power of simulation
- **Mathematical beauty** - Probability theory in action

## 🤝 Contributing

Feel free to:
- 🔧 Optimize the algorithms further
- 📊 Add new visualization features  
- 🧪 Experiment with rule variations
- 📈 Extend the statistical analysis
- 🎮 Create interactive versions

## 📜 License

This family card game simulation is shared freely - may it bring joy and statistical wonder to your household too!

---

*"The best part about a 1-in-700-million chance? It's not zero!"* 🎲✨