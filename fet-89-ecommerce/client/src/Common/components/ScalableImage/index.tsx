import { useRef } from 'react';
import { useState } from 'react';
import styles from './ScalableImage.module.scss';

interface Props {
  imageUri: string;
  alt?: string;
}

interface Coordinations {
  x: number;
  y: number;
}

enum Transform {
  SCALE_INITIAL = 1,
  SCALE_FINAL = 1.7
}

const initalCoordinations: Coordinations = {
  x: 0,
  y: 0
}

export const ScalableImage = ({ imageUri, alt }: Props) => {
  const [coordinations, setCoordinations] = useState(initalCoordinations);

  const translate = `translate(${coordinations.x}px, ${coordinations.y}px)`;

  const imgRef = useRef<HTMLImageElement>();

  const handleCursor = ({ x, y }) => imgRef.current.style.transform = `translate(${-(x / 6)+40}px, ${-(y / 6)+40}px) scale(${Transform.SCALE_FINAL})`;

  const scaleDown = () => imgRef.current.style.transform = `scale(${Transform.SCALE_INITIAL})`;

  return (
    <div 
      className={styles['scalable-image']}
      // onMouseEnter={scaleUp}
      onMouseLeave={() => {
        scaleDown();
        setCoordinations(initalCoordinations);
      }}
      onMouseMove={(e) => handleCursor({ x: e.pageX, y: e.pageY })} 
      // onMouseLeave={() => setCoordinations(initalCoordinations)}
    >
      <img 
        ref={imgRef}
        role="presentation" 
        src={imageUri} 
        alt={alt} 
        style={{ transform: translate }} />
    </div>
  );
};
