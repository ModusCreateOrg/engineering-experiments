import Link from 'next/link';
import styles from './TagList.module.scss';

interface Props {
  tags: string[];
}

export const TagList = ({ tags }: Props) => {
  if (!tags || !tags.length) return <></>;

  return (
    <span className={styles['tag-list']}>
      Tag:{' '}
      {tags.map((tag, i) =>
        <Link passHref href={`/tag/${tag}`} key={i}>
          <>
            <a href={`/tag/${tag}`}>
              {tag},
            </a>
            {' '}
          </>
        </Link>
      )}
    </span>
  );
};
