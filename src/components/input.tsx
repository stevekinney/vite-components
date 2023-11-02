import clsx from 'clsx';
import { ComponentProps } from 'react';

import styles from './input.module.css';

export type InputProps = ComponentProps<'input'>;

export const Input = ({ className, ...props }: InputProps) => {
  return <input className={clsx(styles.input, className)} {...props} />;
};

export default Input;
