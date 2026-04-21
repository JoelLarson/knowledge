.PHONY: build serve

build:
	uv run python -m mkdocs build --strict

serve:
	uv run python -m mkdocs serve
