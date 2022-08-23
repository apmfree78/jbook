import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useState, useEffect } from 'react';
import './resizable.css';

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {

  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer: any;
    if (timer) {
      clearTimeout(timer);
    }
    const listener = () => {
      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
      }, 100);
    }
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    }
  }, [])

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      resizeHandles: ['e'],
      height: Infinity,
      width: innerWidth * 0.75,
    }
  }
  else {
    resizableProps = {
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 24],
      resizeHandles: ['s'],
      height: 300,
      width: Infinity,
    }
  }
  return <ResizableBox {...resizableProps}>
    {children}
  </ResizableBox>


}

export default Resizable;
