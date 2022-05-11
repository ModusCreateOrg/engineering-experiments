import React from 'react';
import { Section } from '../Common/components/Section';
import { SECTIONS_MOCK, CATEGORIES_MOCK } from '../Home/MOCK'; 
import styles from './Category.module.scss';

export const CategoryScreen = ({id}) => {
  const [featured] = SECTIONS_MOCK

  return (
    <div className={styles['category-container']}>
      <div className={styles['content']}>
        <div className={styles['col']}>
          <h1 className="font-title">{CATEGORIES_MOCK[Number(id) - 1]}</h1>
        </div>
      </div>
      <div className={styles['category-body']}>
        <Section showTitle={false} {...featured} />
      </div>
    </div>
  );
};
