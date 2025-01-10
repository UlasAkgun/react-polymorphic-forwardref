import * as React from 'react';

import { ForwardRefAsFunction } from './types';

export type { ForwardRefAsComponentPropsWithoutRef, ForwardRefAsComponentPropsWithRef } from './types';

export const forwardRefAs = React.forwardRef as ForwardRefAsFunction;
