import * as React from 'react';
import { Vega as VegaOrg } from 'react-vega';
import { VegaProps } from 'react-vega/lib/Vega';

// temporary workaround, because type definition seems to be messed up
export const Vega: React.FC<VegaProps> = props => {
  return (
    // @ts-ignore
    <VegaOrg actions={false} renderer="canvas" tooltip={false} {...props} />
  );
};
