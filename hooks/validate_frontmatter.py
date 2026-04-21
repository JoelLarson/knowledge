"""MkDocs hook that validates frontmatter on content pages."""

from mkdocs.exceptions import PluginError

REQUIRED_FIELDS = ("title", "type", "tags", "created", "updated", "sources")
SKIP_FILES = {"index.md", "log.md"}


def on_page_markdown(markdown, page, config, files):
    src = page.file.src_path

    # Only validate pages under test-driven-development/
    if not src.startswith("topics/test-driven-development/"):
        return markdown

    # Skip section indexes and logs
    if src.endswith(tuple(SKIP_FILES)):
        return markdown

    missing = [f for f in REQUIRED_FIELDS if f not in page.meta]
    if missing:
        raise PluginError(
            f"{src}: missing required frontmatter fields: {', '.join(missing)}"
        )

    return markdown
