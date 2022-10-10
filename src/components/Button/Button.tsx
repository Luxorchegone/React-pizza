import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';
import { ButtonProps } from './Button.props';

export const Button = ({
  text,
  buttonStyle,
  form,
  appearance,
  icon = 'none',
  count,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={clsx(styles.button, className, {
        [styles.buttonAdd]: appearance === 'add',
        [styles.buttonCart]: appearance === 'cart',
        [styles.buttonOutline]: buttonStyle === 'outline',
        [styles.buttonCircle]: form === 'circle',
        [styles.buttonMinus]: icon === 'minus',
        [styles.buttonRemove]: icon === 'remove',
      })}
      {...props}>
      {icon !== 'none' && (
        <svg
          width='12'
          height='12'
          viewBox='0 0 9.8 9.8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
            // fill='#EB5A1E'
          />
          <path
            d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
            // fill='#EB5A1E'
          />
        </svg>
      )}
      <span> {text}</span>
      {count ? <i>{count}</i> : null}
    </button>
  );
};
