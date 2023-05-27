import cn from "classnames";
import s from "./styles.module.scss";

interface ChipListProps extends React.HTMLProps<HTMLUListElement> {
  children: React.ReactNode;
}

export const ChipList: React.FC<ChipListProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <ul {...props} className={cn(s.list, className)}>
      {children}
    </ul>
  );
};
