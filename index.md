# Refactoring

## What?

Rewriting code a little bit at a time - for the purpose of improving code design.
Refactoring (noun): a change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior.

Changing code - for the purpose of improving code design - without modifying the behavior of existing code.

## Why?

* make your job easier next time
* maintain velocity - helps you code faster next time
* allow others (including future you) to understand your code easier
* the agile approach to good software design - rather than come up with the best design up front, come up with something that works, then improve the design incrementally
* separate the process of making something work from making the code well designed - reducing cognitive load

## When?

* when adding functionality is difficult or awkward
* when fix a bug is difficult or awkward
* code review

## Technical Debt

Technical Debt is what happens when you keep building more and more functionality without taking a step back and refactoring.

## Code Smells

* duplicate code
* long function or method
* long parameter list
* shotgun surgery - have to change multiple places
* data clumps
* more...

## Refactoring Guided by Tests

* How do you know you didn't break something? This is why I like TDD

## Refactoring

* consolidate conditionals
* extract variables
* extract functions
* extract functions when there is a callback involved
* consolidate multiple variables into objects
* consolidate multiple things into arrays

## Resources

* https://en.wikipedia.org/wiki/Code_refactoring
* http://martinfowler.com/articles/refactoring-video-store-js/
* Refactoring Book

## Stories

* When I suggested using the Firebase API, Cody expressed the fear of breaking their existing code.
* Allen: I am looking at the whole problem and have trouble breaking it down into small problems.
* Sandhya: you guys had different versions of the same code - one for each sport. But when you had to change something that's common between those pages, like the navigation bar, you have to make the same change in each version, and that was a very tedious process.
* Tim's worry of merging would break things.
* Tim's asking me about handling pressure. Talked about long term vs short term.
