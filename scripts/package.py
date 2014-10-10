#!/usr/bin/env python

import os
import zipfile

SCRIPTDIR = os.path.abspath(os.path.dirname(__file__))
PROJECTDIR = os.path.dirname(SCRIPTDIR)

IGNORE_DIRS = [
    '.git',
    '.sass-cache',
    'conf',
    'scss',
    'scripts',
    'svg',
]

IGNORE_FILES = [
    'README.rst',
    'ted_player.zip',
    '.gitignore',
]


def is_ignored(d):
    rel = os.path.relpath(d, PROJECTDIR)
    for d in IGNORE_DIRS:
        if rel.startswith(d):
            return True
    return False


with zipfile.ZipFile('ted_player.zip', 'w', zipfile.ZIP_DEFLATED) as zipball:
    for base_dir, subdirs, files in os.walk(PROJECTDIR):
        if is_ignored(base_dir):
            continue
        for f in files:
            if f in IGNORE_FILES:
                continue
            path = os.path.join(base_dir, f)
            zip_path = os.path.relpath(path, PROJECTDIR)
            zipball.write(path, zip_path)
    zipball.testzip()
