'use strict';

export class Menu {
  constructor( items, words )  {
    this.items = items;
    this.words = words;
  }

  static parse( text ) {
    const menu = JSON.parse( text );

    const items = Object.keys( menu.files ).map(
      k => ({
	      name: k,
	      path: menu.files[ k ].path,
	      tags: menu.files[ k ].tags,
      })
    );

    const words = Object.keys( menu.words );

    return new Menu( items, words );
  }
}
