import { createElement } from 'react';

import clsx from '#src/functions/clsx.js';

/**
 * @template {React.ElementType} component
 * @param {component} component
 * @param {string} [className]
 * @param {Partial<React.ComponentProps<component>>} [props]
 */
export default (component, className, props) =>
  /**
   * @param {React.ComponentProps<component>
   *   | (React.ElementType extends infer as
   *       ? { as: as } & React.ComponentProps<
   *           as extends React.ElementType ? as : never
   *         >
   *       : never)} props
   */
  ({ as, ...props2 }) =>
    createElement(as ?? component, {
      ...props,
      ...props2,
      className: clsx(className, props2.className),
      style: { ...props?.style, ...props2.style }
    });
