import Link from 'next/link';
import { useMemo } from 'react';
import { useState } from 'react';
import { useChart } from '../../contexts/Chart';
import { SimpleButton } from '../SimpleButton';
import styles from './Section.module.scss';

export interface SectionDataItem {
  id: string;
  imageUri: string;
  title: string;
  price: number;
}

export interface SectionProps {
  showControl?: boolean;
  showTitle?: boolean;
  title?: string;
  data?: SectionDataItem[];
}

export const Section = ({ title = 'Featured Products', data = [], showTitle = true, showControl = true}: SectionProps) => {
  const { addItemToChart } = useChart();
  const _data = useMemo(() => data, [data]);
  const step = 4;
  
  const [currentPage, setPage] = useState(0);
  const startOffset = useMemo(() => currentPage * step, [currentPage]);
  const items = useMemo(() => _data.slice(startOffset, startOffset + step), [_data, startOffset]);

  const totalPages = useMemo(() => Math.floor(_data.length / step), [_data]);
  const isLastPage = useMemo(() => currentPage === totalPages, [currentPage, totalPages]);

  const onNext = () => !isLastPage && setPage(currentPage + 1)

  const onPrev = () => currentPage && setPage(currentPage - 1)

  return (
    <section className={styles['section']}>
      {showTitle && (
        <div className={styles['header']}>
          <h2>{title}</h2>
          <a title="see-all" href="">See all</a>
        </div>
        )}
      <div className={styles['content']}>

        {items && items.length && items.map((item) => (
          <div className={styles['item']} key={item.id}>
            <Link href={`/product/${item.id}`}>
              <a title='item image'>
                <img src={item.imageUri} />  
              </a>
            </Link>
            <div title="item content">
              <h4>{item.title}</h4>
              <span>${item.price}</span>
            </div>
            <div title="item footer">
              <SimpleButton onClick={() => addItemToChart(item)}>Add to chart</SimpleButton>  
            </div>
          </div>
        ))}

      </div>
      
      {showControl && (
        <div className={styles['control']}>
          <button onClick={onPrev}>{'<'}</button>
          <button onClick={onNext}>{'>'}</button>
        </div>
        )}
    </section>
  );
};
