// components/DesktopView.tsx
import { useState, useEffect } from "react";

interface DesktopViewProps {
  children: React.ReactNode;
}

const DesktopView: React.FC<DesktopViewProps> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isDesktop ? <>{children}</> : null;
};

export default DesktopView;
