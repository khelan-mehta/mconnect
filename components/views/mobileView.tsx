// components/MobileView.tsx
import { useState, useEffect } from "react";

interface MobileViewProps {
  children: React.ReactNode;
}

const MobileView: React.FC<MobileViewProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? <>{children}</> : null;
};

export default MobileView;
