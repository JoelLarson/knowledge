---
title: Seams
type: concept
tags: [seams, legacy-code, testability, dependency-breaking, michael-feathers]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Working.Effectively.with.Legacy.Code.md]
---

A seam is a place where you can alter behavior in your program without editing in that place. The key concept from [Michael Feathers](../entities/michael-feathers.md)' [Working Effectively with Legacy Code](../sources/working-effectively-legacy-code-feathers.md) for getting untestable code under test.

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
- **Composable** — work naturally with [Dependency Injection](dependency-injection.md) and [Test Doubles](test-doubles.md)

Preprocessing and link seams should be reserved for cases where dependencies are pervasive and no object seam is available.

## Object Seam Requirements

Not every method call is an object seam. A call is an object seam only if you can change which method executes **without editing the calling code**. This typically requires:

1. The object is received from outside (parameter, constructor arg, field) rather than created inline with `new`
2. The method is virtual/overridable
3. There exists an enabling point where you can substitute a different object

## Connection to Other Concepts

Seams are the mechanism underlying many [Dependency-Breaking Techniques](dependency-breaking-techniques.md):
- **Extract Interface** creates object seams
- **Subclass and Override Method** exploits object seams
- **Parameterize Constructor** creates enabling points for object seams
- **Link Substitution** exploits link seams
- **Definition Completion** exploits link seams in C++

Seams also connect to [Dependency Injection](dependency-injection.md) — constructor injection is essentially the formalization of creating enabling points for object seams.

## Related Pages

- [Legacy Code](legacy-code.md)
- [Legacy Code Change Algorithm](legacy-code-change-algorithm.md)
- [Dependency-Breaking Techniques](dependency-breaking-techniques.md)
- [Characterization Tests](characterization-tests.md)
- [Test Doubles](test-doubles.md)
- [Dependency Injection](dependency-injection.md)
- [Michael Feathers](../entities/michael-feathers.md)
- [Working Effectively with Legacy Code (Feathers)](../sources/working-effectively-legacy-code-feathers.md)

## Worked Example: From Untestable to Testable via Object Seam

Consider a function that calculates overdue fees for a library account. It directly instantiates a database connection, making it impossible to test without a real database.

### Step 1: The Untestable Code

```python
import psycopg2

class OverdueFeeCalculator:
    def calculate(self, account_id: str) -> float:
        conn = psycopg2.connect("dbname=library host=prod-db")
        cursor = conn.cursor()
        cursor.execute(
            "SELECT due_date, return_date, daily_rate "
            "FROM loans WHERE account_id = %s AND return_date > due_date",
            (account_id,),
        )
        total = 0.0
        for due_date, return_date, daily_rate in cursor.fetchall():
            overdue_days = (return_date - due_date).days
            total += overdue_days * float(daily_rate)
        conn.close()
        return total
```

The problem: `psycopg2.connect(...)` is called **inside** `calculate()`. There is no seam here -- the behavior of the database call cannot be altered without editing the method itself. Every test would need a running PostgreSQL instance with the correct schema and data.

### Step 2: Identify the Object Seam

The hardcoded `psycopg2.connect(...)` call is the dependency we need to break. If we extract the data-fetching responsibility behind an object boundary, the *call site* inside `calculate()` becomes an object seam. The enabling point will be the constructor, where we choose which object to supply.

### Step 3: Extract via Dependency Injection

```python
from dataclasses import dataclass
from typing import Protocol

@dataclass
class LoanRecord:
    overdue_days: int
    daily_rate: float

class LoanRepository(Protocol):
    """Interface — the seam boundary."""
    def overdue_loans(self, account_id: str) -> list[LoanRecord]: ...

class OverdueFeeCalculator:
    def __init__(self, loans: LoanRepository) -> None:   # <-- enabling point
        self._loans = loans

    def calculate(self, account_id: str) -> float:
        total = 0.0
        for record in self._loans.overdue_loans(account_id):  # <-- object seam
            total += record.overdue_days * record.daily_rate
        return total
```

Now the call `self._loans.overdue_loans(account_id)` is an **object seam**. Which method actually executes depends on the runtime type of `self._loans`. The enabling point is the `__init__` parameter -- in production we pass the real repository; in tests we pass a [test double](test-doubles.md).

### Step 4: Write a Test with a Test Double

```python
import pytest

class FakeLoanRepository:
    """Test double that stands in for the real database."""
    def __init__(self, records: list[LoanRecord]) -> None:
        self._records = records

    def overdue_loans(self, account_id: str) -> list[LoanRecord]:
        return self._records

class TestOverdueFeeCalculator:
    def test_no_overdue_loans_returns_zero(self):
        calculator = OverdueFeeCalculator(loans=FakeLoanRepository([]))
        assert calculator.calculate("ACCT-1") == 0.0

    def test_single_overdue_loan(self):
        records = [LoanRecord(overdue_days=5, daily_rate=0.25)]
        calculator = OverdueFeeCalculator(loans=FakeLoanRepository(records))
        assert calculator.calculate("ACCT-1") == 1.25

    def test_multiple_overdue_loans_are_summed(self):
        records = [
            LoanRecord(overdue_days=3, daily_rate=0.50),
            LoanRecord(overdue_days=10, daily_rate=0.25),
        ]
        calculator = OverdueFeeCalculator(loans=FakeLoanRepository(records))
        assert calculator.calculate("ACCT-1") == 4.00  # (3*0.50) + (10*0.25)
```

No database, no network, no setup scripts. The tests run in milliseconds because the object seam lets us substitute a fake at the enabling point. The production code and the test code call the exact same `calculate()` method -- we altered its behavior without editing it.
