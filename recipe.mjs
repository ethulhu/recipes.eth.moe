'use strict';

export class Recipe {
  constructor (name, tags, notes, needs, steps) {
    this.name = name;
    this.tags = tags;
    this.notes = notes;
    this.needs = needs;
    this.steps = steps;
  }

  static parse( text ) {
    const lines = text.split( '\n' );
    let i = 0;

    const err = msg => msg + ': "' + lines[i] + '"';

    for ( ; i < lines.length && lines[i] === ''; i++ ) {}
    if ( i == lines.length ) { throw 'recipe has no name'; }

    const name = lines[i];
    i++;

    const sections = {
      tags: [],
      notes: [],
      needs: [],
      steps: [],
    };

    for (;;) {
      for ( ; i < lines.length && lines[i] === ''; i++ ) {}
      if ( i == lines.length ) {
        return new Recipe(
                name,
                sections.tags,
                sections.notes,
                sections.needs,
                sections.steps,
        );
      }

      const maybeSection = Object.keys(sections)
                               .filter( k => lines[i] === k + ':' );

      if ( maybeSection.length === 1 ) {
        const section = maybeSection[0];
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
