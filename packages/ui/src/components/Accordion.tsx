/*
 * jot - a simple note-taking app
 * Copyright (C) 2022 Brian Reece

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.

 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
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
