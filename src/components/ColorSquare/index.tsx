import cn from "classnames";
import s from "./styles.module.scss";

interface ColorSquareProps extends React.HTMLProps<HTMLSpanElement> {
  color: string;
}

const ColorSquare: React.FC<ColorSquareProps> = ({
  color,
  className,
  ...props
}) => {
  return (
    <span
      {...props}
      className={cn(s.main, className)}
      style={{ backgroundColor: color }}
    ></span>
  );
};

export default ColorSquare;
