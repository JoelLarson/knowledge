---
title: Sprout Method
type: concept
tags: [sprout-method, legacy-code, safe-change, michael-feathers, tdd]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Working.Effectively.with.Legacy.Code.md]
---

A technique for adding new behavior to [[legacy-code]] safely: write new code in a new method with tests, then call it from the old untested code. From [[michael-feathers]]' [Working Effectively with Legacy Code](../sources/working-effectively-legacy-code-feathers.md), Chapter 6.

## Core Idea

When you need to add a feature and can formulate it as new code, write that code in a **new method** developed with TDD. Then simply call it from the existing (untested) code. You can't easily test the call site, but the new logic itself is fully tested.

## Steps

1. Identify where you need to make your code change
2. Write a call to a new method that will do the work (comment it out initially)
3. Determine what local variables the new method needs — make them parameters
4. Determine if the method needs to return values — assign the return to a variable
5. **Develop the sprout method using TDD**
6. Uncomment the call in the source method

## Example

**Before (legacy code):**
```java
public void postEntries(List entries) {
    for (Iterator it = entries.iterator(); it.hasNext(); ) {
        Entry entry = (Entry)it.next();
        entry.postDate();
    }
    transactionBundle.getListManager().add(entries);
}
```

**New requirement:** Filter out duplicate entries before posting.

**Sprout approach** — create a new tested method:
```java
List uniqueEntries(List entries) {
    List result = new ArrayList();
    for (Iterator it = entries.iterator(); it.hasNext(); ) {
        Entry entry = (Entry)it.next();
        if (!transactionBundle.getListManager().hasEntry(entry)) {
            result.add(entry);
        }
    }
    return result;
}
```

**After (call from old code):**
```java
public void postEntries(List entries) {
    List entriesToAdd = uniqueEntries(entries);
    for (Iterator it = entriesToAdd.iterator(); it.hasNext(); ) {
        Entry entry = (Entry)it.next();
        entry.postDate();
    }
    transactionBundle.getListManager().add(entriesToAdd);
}
```

The `uniqueEntries` method was developed test-first and is fully covered. The calling code is not covered, but the new logic is clean and isolated.

## Variants

### Static Sprout
When dependencies in the class make it impossible to instantiate in a test harness, make the sprout a `public static` method. Pass instance variables as arguments. This is a staging area — once the class is testable, statics can become instance methods.

### Sprout Class
When the entire class is untestable (too many creational or hidden dependencies), create a **new class** to hold the new behavior. Develop it with TDD, then instantiate and call it from the old code.

Steps for Sprout Class:
1. Identify where you need the change
2. Design a class that could do the work; write code to create and call it (commented out)
3. Local variables needed become constructor arguments
4. Return values become methods on the class
5. Develop the sprout class test-first
6. Uncomment the creation and call

## Related Techniques

| Technique | When to Use |
|-----------|-------------|
| **Sprout Method** | New behavior can live in a method on the same class |
| **Sprout Class** | Can't even instantiate the class in a test harness |
| **Wrap Method** | New behavior happens before/after existing behavior at same call point |
| **Wrap Class** | Decorator pattern — wrap existing class in a new class that adds behavior |

## Advantages

- **New code is fully tested** — developed with TDD
- **Clear separation** between old and new code
- All affected variables are visible as parameters/returns
- Old code is unchanged — no risk of breaking existing behavior
- The sprout can later become a nucleus for better design

## Disadvantages

- You're giving up on the source method for now — not getting it under test
- Can leave code in an odd state: a long messy method with one clean sprout
- The calling code is untested — you're trusting the call is correct

## Philosophy

> "Remember, code is your house, and you have to live in it."

Sprout techniques represent a pragmatic compromise: when you can't afford to get legacy code fully under test right now, at least ensure all *new* code is tested. Over time, tested islands grow into continents.

## Related Pages

- [[legacy-code]]
- [[legacy-code-change-algorithm]]
- [[dependency-breaking-techniques]]
- [[seams]]
- [[characterization-tests]]
- [[refactoring]]
- [[michael-feathers]]
- [[working-effectively-legacy-code-feathers]]
