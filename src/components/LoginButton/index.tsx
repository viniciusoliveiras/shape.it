import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function LoginButton({ children }: ButtonProps) {
  return (
    <button type="button" className={styles.button}>
      {children}
    </button>
  );
}
