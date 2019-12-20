RECIPES=$(patsubst recipes/%,build/%.html,$(wildcard recipes/*))

all: build/index.html build/icon.png $(RECIPES)

build/index.html: recipes/* | build
	./generate index $^ > $@

build/%.html: recipes/% | build
	./generate recipe $< > $@

build/icon.png: icon.png | build
	cp $< $@

build:
	mkdir -p build

clean:
	rm -rf build
