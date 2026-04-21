---
title: Seams
type: concept
tags: [seams, legacy-code, testability, dependency-breaking, michael-feathers]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Working.Effectively.with.Legacy.Code.md]
---

A seam is a place where you can alter behavior in your program without editing in that place. The key concept from [[michael-feathers]]' [Working Effectively with Legacy Code](../sources/working-effectively-legacy-code-feathers.md) for getting untestable code under test.

## Definition

> "A seam is a place where you can alter behavior in your program without editing in that place."

Every seam has an **enabling point** — a place where you make the decision to use one behavior or another. The source code remains the same in both production and test; you exploit the seam through its enabling point.

## Why Seams Matter

When you look at a legacy codebase and want to test a particular piece of code, the question becomes: "How do I execute this method without triggering its dependencies?" Seams provide the answer. They are already present in code (or can be introduced with minimal changes). Once you see code in terms of seams, you can:

- Selectively exclude dependencies in tests
- Sense conditions in the code that would otherwise be invisible
- Get just enough tests in place to support more aggressive refactoring

## Seam Types

### Object Seams

The most useful seam type in object-oriented languages. When you look at a method call on an object, which method actually executes depends on the runtime type of the object. By substituting a different object (e.g., a testing subclass), you change behavior without editing the calling code.

**Enabling point:** The place where the object is created or assigned — typically a constructor argument, method parameter, or factory.

**Example:** A method calls `PostReceiveError()`. By adding this as a virtual method on the class and subclassing with an empty override, you eliminate the dependency in tests without editing the calling code.

```java
// Production
class CAsyncSslRec {
    virtual void PostReceiveError(UINT type, UINT errorcode);
}

// Testing subclass
class TestingAsyncSslRec : public CAsyncSslRec {
    virtual void PostReceiveError(UINT type, UINT errorcode) {}
}
```

### Link Seams

Exploit the linking phase of compilation. By providing alternative implementations of functions/classes that get linked during the build, you replace behavior without touching source code.

**Enabling point:** The build script, classpath, or linker configuration.

**Examples:**
- In C/C++: Create a stub library with empty implementations of graphics functions, link it instead of the real library during tests
- In Java: Manipulate the classpath to provide a different implementation of a class

**Limitation:** The enabling point is outside the program text, making link seams harder to notice and maintain.

### Preprocessing Seams

Available in C and C++ where a macro preprocessor runs before compilation. You can use `#define` to replace function calls with test-friendly alternatives.

**Enabling point:** A preprocessor define (e.g., `#ifdef TESTING`).

**Example:**
```c
#ifdef TESTING
#define db_update(account_no, item) \
    { last_item = (item); last_account_no = (account_no); }
#endif
```

**Limitation:** Decreases code clarity, forces maintaining multiple "programs" in the same source file. Reserve for cases with no better alternative.

## Choosing a Seam Type

Object seams are the best default choice in OO languages because they are:
- **Explicit** — visible in the source code
- **Maintainable** — tests that use them are easy to understand
- **Composable** — work naturally with [[dependency-injection]] and [[test-doubles]]

Preprocessing and link seams should be reserved for cases where dependencies are pervasive and no object seam is available.

## Object Seam Requirements

Not every method call is an object seam. A call is an object seam only if you can change which method executes **without editing the calling code**. This typically requires:

1. The object is received from outside (parameter, constructor arg, field) rather than created inline with `new`
2. The method is virtual/overridable
3. There exists an enabling point where you can substitute a different object

## Connection to Other Concepts

Seams are the mechanism underlying many [[dependency-breaking-techniques]]:
- **Extract Interface** creates object seams
- **Subclass and Override Method** exploits object seams
- **Parameterize Constructor** creates enabling points for object seams
- **Link Substitution** exploits link seams
- **Definition Completion** exploits link seams in C++

Seams also connect to [[dependency-injection]] — constructor injection is essentially the formalization of creating enabling points for object seams.

## Related Pages

- [[legacy-code]]
- [[legacy-code-change-algorithm]]
- [[dependency-breaking-techniques]]
- [[characterization-tests]]
- [[test-doubles]]
- [[dependency-injection]]
- [[michael-feathers]]
- [[working-effectively-legacy-code-feathers]]
