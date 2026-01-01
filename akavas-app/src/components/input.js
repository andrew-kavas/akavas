import React from 'react';

import inputClassName from '#src/constants/input-class-name.js';
import clsx from '#src/functions/clsx.js';

/**
 * @param {React.ComponentProps<'input'> & {
 *   as?: React.ElementType;
 *   label?: string;
 * }} props
 */
const Input = ({ as: Component = 'input', className, style, ...props }) => (
  <Component
    className={clsx(inputClassName, className)}
    style={style}
    {...props}
  />
);

export default Input;
