import cn from "classnames";
import s from "./styles.module.scss";

interface ChipItemProps extends React.HTMLProps<HTMLLIElement> {
  children: React.ReactNode;
}

export const ChipItem: React.FC<ChipItemProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <li {...props} className={cn(s.listItem, className)}>
      {children}
    </li>
  );
};
