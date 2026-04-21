"""Generate HTML redirects from old paths to new topics/ paths.

For each page under topics/<topic>/, creates a redirect HTML file at the old
path (<topic>/...) so existing bookmarks and shared links continue to work.
Remove this hook once the old URLs are no longer needed.
"""

import os
from pathlib import Path

REDIRECT_TEMPLATE = """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url={url}">
  <link rel="canonical" href="{url}">
  <title>Redirecting...</title>
</head>
<body>
  <p>This page has moved. If you are not redirected, <a href="{url}">click here</a>.</p>
</body>
</html>
"""


def on_post_build(config):
    site_dir = Path(config["site_dir"])
    topics_dir = site_dir / "topics"

    if not topics_dir.is_dir():
        return

    for topic in topics_dir.iterdir():
        if not topic.is_dir():
            continue

        for html_file in topic.rglob("*.html"):
            rel = html_file.relative_to(topics_dir)
            old_path = site_dir / rel

            if old_path.exists():
                continue

            # Compute the relative URL from old location to new
            depth = len(rel.parent.parts)
            prefix = "../" * depth + "topics/"
            new_url = prefix + str(rel)

            old_path.parent.mkdir(parents=True, exist_ok=True)
            old_path.write_text(REDIRECT_TEMPLATE.format(url=new_url))
