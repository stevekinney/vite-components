import clsx from 'clsx';
import { ComponentProps } from 'react';

import styles from './button.module.css';

const Button = ({ className, ...props }: ComponentProps<'button'>) => {
  return <button className={clsx(styles.button, className)} {...props} />;
};

export default Button;
