// components/TabView.tsx
import { useState, useEffect } from "react";

interface TabViewProps {
  children: React.ReactNode;
}

const TabView: React.FC<TabViewProps> = ({ children }) => {
  const [isTab, setIsTab] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsTab(true);
      } else {
        setIsTab(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isTab ? <>{children}</> : null;
};

export default TabView;
