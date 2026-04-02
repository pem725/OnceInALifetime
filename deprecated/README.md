# Deprecated Implementations

These files contain **incorrect matching logic** and have been moved out of active service. Do not use them for simulation or analysis.

## What's wrong

The game's matching rule allows only two positions: **adjacent** (X X) and **skip-two** (X _ _ X, with exactly two stacks between). The files below violate this rule in different ways.

| File | Bug |
|---|---|
| `OiaLver0.0.2.py` | `range(max(0, index-3), index)` checks all positions within 3, including the illegal 2-back position |
| `OiaLver0.0.3.py` | Same range bug |
| `OiaLver0.0.4.py` | Same range bug |
| `OiaLver0.0.5.py` | Same range bug |
| `OiaLver0.0.5.jl` | Same range bug (Julia version) |
| `OiaLver0.0.1.py` | `i > 3` off-by-one — should be `i >= 3` — misses valid skip-two matches when exactly 4 stacks exist |
| `OIAL.py` | Completely different two-stack logic; does not implement the real game rules |
| `GoodOne.py` | Iterates over all stacks instead of checking only the new card's two valid positions |
| `GeminiOIAL.py` | Incomplete — only contains deck creation, no game logic |

## Correct implementations

Use these instead (in the parent directory):

- **`GoodOne2.py`** — Correct Python implementation
- **`OnceInALifetime.jl`** — Correct Julia implementation (used for the 700M simulation)
