#!/usr/bin/env bash

maxBytes=1270000

if [ $(wc -c < dist/msonreact.js) -gt ${maxBytes} ]; then
  echo 'Error: bundle too large!'
  exit 1
fi