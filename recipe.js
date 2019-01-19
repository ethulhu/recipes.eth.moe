'use strict';

class Recipe {
  constructor (name, needs, steps) {
    this.name = name;
    this.needs = needs;
    this.steps = steps;
  }

  static parse( text ) {
    let lines = text.split( '\n' );
    var i = 0;

    let err = msg => msg + ': "' + lines[i] + '"';

    for ( ; i < lines.length && lines[i] === ''; i++ ) {}
    if ( i == lines.length ) { throw 'recipe has no name'; }

    let name = lines[i];
    i++;

    let sections = {
      needs: [],
      steps: [],
    };

    for (;;) {
      for ( ; i < lines.length && lines[i] === ''; i++ ) {}
      if ( i == lines.length ) {
        return new Recipe(name, sections.needs, sections.steps); 
      }

      let maybeSection = Object.keys(sections)
                               .filter( k => lines[i] === k + ':' );

      if ( maybeSection.length === 1 ) {
        let section = maybeSection[0];
        i++;

        for ( ; i < lines.length && lines[i] !== ''; i++ ) {
          if ( ! lines[i].startsWith( '- ' ) ) {
            throw err( 'items must start with -' );
          }
          sections[section].push( lines[i].slice( 2 ) );
        }
      } else {
        throw err( 'unexpected line kind' );
      }
    }
  }
}
