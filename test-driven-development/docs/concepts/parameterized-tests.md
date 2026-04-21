---
title: Parameterized Tests
type: concept
tags: [testing, patterns, xunit]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md]
---

Parameterized tests run the same test logic with different input data, reducing duplication when verifying behavior across many cases. [[gerard-meszaros]] calls this the "Data-Driven Test" pattern in [xUnit Test Patterns](../sources/xunit-test-patterns-meszaros.md).

## The Pattern

Instead of writing N nearly-identical test methods:
```
test "parses single digit":     assert parse("5") == 5
test "parses double digit":     assert parse("42") == 42
test "parses negative":         assert parse("-7") == -7
```

Write one parameterized test:
```
@parameterized([("5", 5), ("42", 42), ("-7", -7)])
test "parses integer"(input, expected):
    assert parse(input) == expected
```

## Framework Support

| Framework | Mechanism |
|-----------|-----------|
| JUnit 5 | `@ParameterizedTest` + `@ValueSource`, `@CsvSource`, `@MethodSource` |
| pytest | `@pytest.mark.parametrize` |
| Jest | `test.each` / `it.each` |
| NUnit | `[TestCase]` attribute |
| xUnit.net | `[Theory]` + `[InlineData]` |
| Go | Table-driven tests (by convention) |
| RSpec | `shared_examples` with parameters |

## Meszaros: Data-Driven Test

In xUnit Test Patterns, the Parameterized Test pattern is formalized as:

> "We store all the information needed for each test (including the expected results) in a data structure and write the test to iterate over the entries, calling the SUT for each data entry."

Key characteristics:
- Test data can be inline (annotations) or external (CSV, JSON, database)
- Each row is effectively an independent test case
- Framework reports each row's pass/fail separately (not just one aggregate result)

## When to Use Parameterized Tests

**Good fit:**
- Testing the same logic with many boundary values
- Validating formatting/parsing rules across many inputs
- Testing business rules that differ only in parameters (tax rates by country, pricing tiers)
- Verifying error messages for various invalid inputs

**Poor fit:**
- Tests that need significantly different setup per case
- Tests where the assertion logic changes per case
- Exploratory edge cases that each have a unique story (give them individual names)

## Table-Driven Tests (Go Convention)

Go's testing culture strongly favors table-driven tests as the primary organizational pattern:

```go
tests := []struct {
    name     string
    input    string
    expected int
}{
    {"single digit", "5", 5},
    {"double digit", "42", 42},
    {"negative", "-7", -7},
}
for _, tt := range tests {
    t.Run(tt.name, func(t *testing.T) {
        got := parse(tt.input)
        if got != tt.expected {
            t.Errorf("parse(%q) = %d, want %d", tt.input, got, tt.expected)
        }
    })
}
```

## Parameterized Tests vs. Individual Test Methods

| Individual Tests | Parameterized Tests |
|-----------------|-------------------|
| Each test has a descriptive name | Names come from data or indices |
| Easy to understand in isolation | Compact; avoids duplication |
| Better for documenting distinct scenarios | Better for systematic boundary testing |
| Preferred when setup differs | Preferred when logic is identical |

A good heuristic: if you find yourself copy-pasting a test and only changing data values, parameterize it. If each test tells a different story, keep them separate.

## Connection to [[property-based-testing]]

Parameterized tests and property-based tests both reduce duplication but differ fundamentally:
- Parameterized: developer chooses specific cases (known requirements)
- Property-based: framework generates random cases (unknown edge cases)

They complement each other. Use parameterized tests for known business rules and property-based tests for mathematical invariants.

## Related Pages

- [[test-organization-patterns]]
- [[four-phase-test]]
- [[property-based-testing]]
- [[good-test-properties]]
- [[xunit]]
- [[xunit-test-patterns-meszaros]]
- [[gerard-meszaros]]
