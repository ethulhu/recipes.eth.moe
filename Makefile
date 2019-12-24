RECIPES=$(patsubst recipes/%,build/%.html,$(wildcard recipes/*))

all: build/index.html build/icon.png build/service-worker.js $(RECIPES)

build/index.html: recipes/* | build
	./generate index $^ > $@

build/service-worker.js: recipes/* | build
	./generate service-worker $^ > $@

build/%.html: recipes/% | build
	./generate recipe $< > $@

build/icon.png: icon.png | build
	cp $< $@

build:
	mkdir -p build

clean:
	rm -rf build
