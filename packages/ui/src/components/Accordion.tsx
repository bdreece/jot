import type { FC } from 'react';
import type { Children } from '../types';

import { motion as m, LazyMotion, domAnimation } from 'framer-motion';

import * as styles from '../styles/Accordion.module.scss';

export type AccordionProps = {
  title: Children;
  children?: Children;
};

const Accordion: FC<AccordionProps> = ({ title, children }) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.details
        className={styles.accordion}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <summary data-toggle={'\u00BB'}>{title}</summary>
        <div>{children}</div>
      </m.details>
    </LazyMotion>
  );
};

export default Accordion;
