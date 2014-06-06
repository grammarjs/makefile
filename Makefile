
SRC= index.js
tests ?= *

test:
	@mocha -R spec test.js

node_modules: package.json
	@npm install

.PHONY: test