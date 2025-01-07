import * as React from 'react';

import { PolymorphicForwardRefFunction } from "./types";

export { PolymorphicForwardRefComponentProps } from './types';

export const forwardRefAs = React.forwardRef as PolymorphicForwardRefFunction;
