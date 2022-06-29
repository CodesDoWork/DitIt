#!/bin/sh

mongod & node ./backend/main.js & npx serve -s -l 80 frontend
