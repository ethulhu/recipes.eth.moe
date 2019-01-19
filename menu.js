'use strict';

class Menu {
  constructor( items)  {
    this.items = items;
  }

  static parse( text ) {
    let lines = text.split( '\n' );

    let items = lines.filter( line => line !== '' )
                     .map( line => {
		       let parts = line.split( ': ' );
		       return {
		         name: parts[0],
		         path: parts[1],
		       }
		     } );

    return new Menu( items );
  }
}
