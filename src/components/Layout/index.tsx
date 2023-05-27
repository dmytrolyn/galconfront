import s from "./style.module.scss";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={s.wrap}>{children}</div>;
};

export default Layout;
