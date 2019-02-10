'use strict';

export const Search = {
  matcherFuncForQuery: function( query ) {
    const atoms = query.split( ' ' );
    return item => atoms.reduce(
		     ( acc, atom ) => acc && matches( item, atom ),
		     true,
    );
  },
};

function matches( item, atom ) {
  return item.replace( /[^a-zA-Z0-9]/, '' )
             .includes( atom );
}

