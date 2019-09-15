#!/usr/bin/env node --experimental-modules

import { Search } from './search.mjs';

const noQuerySimpleStrings = Search.matcherFuncForQuery( '' )

process.exit( 1 );
