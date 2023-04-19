# Gates of Hell Editor

### WTF is it?

hi, i am working on an gui that manipulates savefiles to create a custom, richer DCG experience.
i know this isn't officially supported, and _technically_ doesn't count as "modding", but you should treat this as a heavily modded experience that is incompatible with other mods by default (even if it truly isn't)

so, here are the key ideas:

1. i am replacing the research menu entirely. instead, the campaign begins at a given year, and every mission you play takes a certain amount of time. after the mission, time advances, and new things may unlock (or be removed!). additionally, there will be some metagame/4x strategy elements to this, and maybe eventually research comes back in a new time-based form
2. map selection is being handled outside of the game. my end-game vision is to make you feel more like a general, not at behest of the general...
3. i would like to handle unit resupply as well, but this is full of unknowns
4. mission rewards are going to become customized as heavily as possible
5. endgame 1: i would like to partially recreate the DCG gui (the unit portraits) such that multiple people can view the campaign state in realtime, in a web browser
6. endgame 2: i would like to introduce composable rules to handle the behavior of everything, including the ability to enable/disable certain aspects, as well as write custom DCG behavior hooks (like no-tank doctrines!)
7. endgame 3: convert to a desktop app, create a GoH mod to replace certain files (dcg settings, ai settings, etc), and allow the gui to alter my mod's files on disk for even deeper custom behavior and better realtime gui behavior

---

### Required Steps

here are the required steps, and my progress ([x] = complete):

1. [x] load and parse savefiles into memory
2. [x] add, edit, or remove fields from the savefile (Name, Points, Research, etc)
3. [x] alter the research tree based on modular rules

   - i am currently working on a more "chronological" unlock order that feels balanced and dynamic

4. [ ] replace the strategic map with a richer external gui
5. [ ] replace existing map rewards with custom rewards
6. [ ] force atk/def based on rules, not alternating atk-def-atk-def
7. [ ] force a specific enemy faction
8. [ ] introduce a new resource, "fuel points"
   - determining a vehicle's maximum fuel capacity for a custom refuel action, tricky
9. [x] export the modified savefile and load it into the game
10. [ ] play and iterate

---

### Obstacles

here are my obstacles:

1. Controlling enemy research and enemy unit availability

   - I don't think this is possible right now unless I create a mod and override `script/multiplayer/(faction)/conquest.lua`.
   - I can do that, but... how nice would it be if savefiles could bundle this logic?... =)

2. Checking "remaining fuel" for a unit is easy, but checking "remaining capacity" seems difficult.

   - If I must, I will iterate over the game directory, cache all
