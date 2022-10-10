import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text?: string;
  buttonStyle?: 'outline';
  form?: 'circle';
  appearance?: 'add' | 'cart';
  count?: number;
  sign?: 'plus' | 'minus' | 'none';
}
