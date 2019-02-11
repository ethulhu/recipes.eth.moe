#!/usr/bin/env node --experimental-modules
// gen_menu.mjs generates 'recipes.json'.
//
//   $ node --experimental-modules \
//          gen_menu.mjs \
//          recipes/* > recipes.json
//
import { Recipe } from './recipe.mjs';
import * as fs from 'fs';

// Setup.

String.prototype.basename = function() {
  return this.split( '/' ).slice( -1 )[ 0 ];
};

Array.prototype.uniq = function() {
  return this.filter( ( x, i, xs ) => i == 0 || x !== xs[ i - 1 ] );
};

Object.prototype.forEach = function( callback ) {
  Object.getOwnPropertyNames( this ).forEach(
    k => callback( this[k], k, this )
  );
};

Recipe.prototype.tokens = function() {
  return [].concat(
              this.name.split( ' ' ), 
              this.needs.map( n => n.split( ' ' ) ).flat()
            )
           .map( t => t.toLowerCase() )
           .filter( t => /^[a-z]/.test( t ) )
           .map( t => t.replace( /[^a-z0-9_-]/g, '' ) )
           .filter( t => t.length > 2 )  // pt, oz, ….
           .sort()
           .uniq();
};

// Main.

const files = process.argv.slice( 2 );

const recipes = files.map( f => 
  Recipe.parse( fs.readFileSync( f, 'utf8' ) )
);
const tokens = recipes.map( r => r.tokens() );


let index = {};

index.files = {};
files.forEach(
  ( f, i ) => index.files[ recipes[i].name ] = ({
          path: f.basename(),
          tags: recipes[i].tags,
  })
);

index.words = {};
tokens.forEach(
  ( ts, i ) => ts.forEach(
    t => {
      index.words[ t ] = index.words[ t ] || [];
      index.words[ t ].push( i );
    } )
);

console.log( JSON.stringify( index ) );
