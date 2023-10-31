import clsx from 'clsx';
import { ComponentProps } from 'react';

import styles from './input.module.css';

export const Input = ({ className, ...props }: ComponentProps<'input'>) => {
  return <input className={clsx(styles.input, className)} {...props} />;
};

export default Input;
