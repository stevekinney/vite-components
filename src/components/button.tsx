import clsx from 'clsx';
import { ComponentProps } from 'react';

import styles from './button.module.css';

const Button = ({
  className,
  dangerous = false,
  ...props
}: ComponentProps<'button'> & { dangerous?: boolean }) => {
  return (
    <button
      className={clsx(styles.button, dangerous && styles.dangerous, className)}
      {...props}
    />
  );
};

export default Button;
