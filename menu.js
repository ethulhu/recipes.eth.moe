'use strict';

class Menu {
  constructor (items) {
    this.items = items;
  }

  static parse( text ) {
    let lines = text.split( '\n' );
    let items = lines.filter( line => line !== '' );
    
    return new Menu( items );
  }
}
