import type { FC } from 'react';

import { motion as m, LazyMotion, domAnimation } from 'framer-motion';

import * as styles from '../styles/Card.module.scss';

export type CardProps = {
  title?: string | JSX.Element;
  children?: string | JSX.Element | JSX.Element[];
};

const Card: FC<CardProps> = ({ title, children }) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.article
        className={styles.card}
        initial={{
          opacity: 0.7,
        }}
        whileHover={{
          opacity: 1,
        }}
      >
        <h1>{title ?? 'Card title'}</h1>
        <section>{children}</section>
      </m.article>
    </LazyMotion>
  );
};

export default Card;
