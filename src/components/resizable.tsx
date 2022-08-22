import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {


  let resizableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      minConstraints: [window.innerWidth * 0.2, Infinity],
      resizeHandles: ['e'],
      height: Infinity,
      width: window.innerWidth * 0.75,
    }
  }
  else {
    resizableProps = {
      maxConstraints: [Infinity, window.innerHeight * 0.9],
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
