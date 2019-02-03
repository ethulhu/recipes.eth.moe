'use strict';

export class Menu {
  constructor( items)  {
    this.items = items;
  }

  static parse( text ) {
    const menu = JSON.parse( text );

    const items = Object.keys( menu.files ).map(
      k => ({ name: k, path: menu.files[ k ] } ));

    return new Menu( items );
  }
}
