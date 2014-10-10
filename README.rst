==========
TED player
==========

.. image:: img/wordmark.png

TED player is an app for Librarian_, Outernet's library management server.

TED player is written using HTML5 and JavaScript, and Librarian's experimental
files API to construct a playlist of TED_ videos and play them in the browser.

This app is still under development, and it serves as both a test case and
example of using Librarian for application development.

About the missing ``player`` directory
======================================

TED player uses `Media Element`_ player. Simply grab the contents of the 
``build`` directory in the download_, and place it in a ``player`` directory in
the root of TED player's source.

Creating the app zipball
========================

The app zipball can be created by simply running the ``scripts/package.py``
script. The script will create a zip file in the directory from which it is
run. It's important to remember that the name of the file must match the
metadata found in ``app.json`` file.

License
=======

The code for this app is released under GNU GPL v3 license. Please note that
the license does **not** cover the TED trademarks.

.. note::
    TED does not officially sponsor or endorse this app, nor does Outernet
    endorse TED. This app is just an example. All TED trademarks used in the
    app are copyrighted property of TED Conferences LLC.


.. _Librarian: https://github.com/Outernet-Project/librarian
.. _TED: http://www.ted.com/
.. _Media Element: http://mediaelementjs.com/
.. _download: http://github.com/johndyer/mediaelement/zipball/master

