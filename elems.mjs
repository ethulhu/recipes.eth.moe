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
  elem: function( ...args ) {
    const elem = document.createElement( this );

    if ( ! ( args instanceof Array ) ) {
      args = [ args ];
    }
    else {
      args = args.flat( 3 );
    }

    for ( let arg of args ) {
      if ( arg instanceof Node ) {
        elem.appendChild( arg );
      }
      else if ( arg instanceof Attr ) {
        elem.setAttribute( x.name, x.value );
      }
      else if ( typeof arg === 'string' ) {
        elem.appendChild( document.createTextNode( arg ) );
      }
      else if ( typeof arg === 'object' ) {
        for ( let prop of Object.keys(arg) ) {
          if ( typeof arg[prop] !== 'object' ) {
            elem.setAttribute( prop, arg[prop] );
          }
        }
      }
      else {
        throw 'Oh No! (Type: ' + this + ', Arg: ' + arg + ')';
      }
    }

    return elem;
  },

        register: function( options, ...args ) {
    if ( ! options.toObject ) {
      throw 'toObject must be defined';
    }
    
    let nameFunc = options.withNameFunc || (name => name);

    for ( let arg of args ) {
      options.toObject[ nameFunc( arg ) ] = this.elem.bind( arg );
    }
  },

  renderFuncForSelector: function( querySelector ) {
    return ( ...args ) => {
      let root = document.querySelector( querySelector );
      let render = this.elem.bind( root.tagName );
      let newRoot = render( args );
      newRoot.id = root.id;
      newRoot.classList = root.classList;
      root.parentElement.replaceChild( newRoot, root );
    };
  },
};
