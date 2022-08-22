import { ResizableBox } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return <ResizableBox
    maxConstraints={[Infinity, window.innerHeight * 0.9]}
    minConstraints={[Infinity, 24]}
    resizeHandles={['s']}
    height={300}
    width={Infinity}>
    {children}
  </ResizableBox>


}

export default Resizable;
