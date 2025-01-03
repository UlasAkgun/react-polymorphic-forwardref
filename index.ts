import * as React from 'react';

import { PolymorphicForwardRefFunction } from "./types";

export * from './types';

export const forwardRefAs = React.forwardRef as PolymorphicForwardRefFunction;
