// elems.js is madness hackery.
//
// Used like:
//
//   Elems.register( { toObject: window, withNameFunc: n => '_' + n }, 'ul', 'li' );
//
//   _ul(
//     _li( { class: 'strokable'}, 'mew' ),
//     _li( 'purr', { class: 'pettable' } )
//   );
'use strict';

export const Elems = {
  elem: tag => ( ...args ) => {
    const elem = document.createElement( tag );

    if ( ! ( args instanceof Array ) ) {
      args = [ args ];
    }
    else {
      args = args.flat( 3 );
    }

    args.forEach( arg => {
      if ( arg instanceof Node ) {
        elem.appendChild( arg );
      }
      else if ( typeof arg === 'string' ) {
        elem.appendChild( document.createTextNode( arg ) );
      }
      else if ( typeof arg === 'object' ) {
        Object.keys( arg ).forEach( key => {
          if ( typeof arg[key] !== 'object' ) {
            elem.setAttribute( key, arg[key] );
          }
        } );
      }
      else {
        throw 'Oh No! (Tag: ' + tag + ', Arg: ' + arg + ')';
      }
    } );

    return elem;
  },

  renderFuncForSelector: function( querySelector ) {
    return ( ...args ) => {
      const root = document.querySelector( querySelector );
      const render = this.elem( root.tagName );
      const newRoot = render( args );
      newRoot.id = root.id;
      newRoot.classList = root.classList;
      root.parentElement.replaceChild( newRoot, root );
    };
  },
};
