#!/bin/bash
yarn migration:run
yarn seed:run
npm run start:prod