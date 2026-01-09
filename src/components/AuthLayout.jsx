import styles from "./AuthLayout.module.css";
import AuthBackground from "../assets/auth-background.webp";

function AuthLayout({ children }) {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${AuthBackground})`,
  };

  return (
    <div className={styles.authlayoutWrapper} style={backgroundStyle}>
      <div className={styles.authContent}>{children}</div>
    </div>
  );
}

export default AuthLayout;
