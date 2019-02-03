'use strict';

export class Menu {
  constructor( items)  {
    this.items = items;
  }

  static parse( text ) {
    const lines = text.split( '\n' );

    const items = lines.filter( line => line !== '' )
                     .map( line => {
		       const parts = line.split( ': ' );
		       return {
		         name: parts[0],
		         path: parts[1],
		       }
		     } );

    return new Menu( items );
  }
}
