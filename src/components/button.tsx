import clsx from 'clsx';
import { ComponentProps } from 'react';

import styles from './button.module.css';

export type ButtonProps = ComponentProps<'button'> & {
  dangerous?: boolean;
};

export const Button = ({
  className,
  dangerous = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, dangerous && styles.dangerous, className)}
      {...props}
    />
  );
};

export default Button;
