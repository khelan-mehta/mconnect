import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  id: string;
  src: string;
  link: string;
}

const Footer: React.FC = () => {
  const path = usePathname();
  const [activeItem, setActiveItem] = useState<string>("home");

  const menuItems: MenuItem[] = [
    { id: "home", src: "/home.svg", link: "/home" },

    { id: "location", src: "/designs.svg", link: "/info" },
    { id: "user", src: "/orders.svg", link: "/user" },
  ];
  const blackList = [
    "/workers/workerId/orders/order",
    "/workers/workerId",
    "/users/userId",
    "/users/userId/orders/order",
    "/designs/design",
    "/designs/create",
    "/managers/manager",
    "/error",
    "/profile/user/settings",
    "/register/progress",
    "/login",
    "/users/userId/transactions",
    "/register/waiting",
  ];

  // Determine if the current path exactly matches any blacklisted route
  const isBlacklisted = blackList.includes(path);

  // Hide the footer if the current route is blacklisted
  if (isBlacklisted) {
    return null;
  }

  return (
    <div className="w-screen fixed bottom-0 z-[100] flex justify-between h-[10vh] px-5 py-1 bg-white border-t-[1px] border-border border-solid shadow pt-2">
      {menuItems.map((item, idx) => (
        <div key={idx} onClick={() => setActiveItem(item.id)}>
          <FooterMenuItem item={item} isActive={path === item.link} />
        </div>
      ))}
    </div>
  );
};

interface FooterMenuItemProps {
  item: MenuItem;
  isActive: boolean;
}

const FooterMenuItem: React.FC<FooterMenuItemProps> = ({ item, isActive }) => {
  return (
    <Link
      href={item.link}
      passHref
      className="menu-item  flex flex-col items-center gap-1 p-1"
    >
      <div className="icon">
        <Image
          src={`/${isActive ? item.id + "-filled" : item.id}.png`}
          height={28}
          width={28}
          alt={`${item.id} page icon`}
        />
      </div>
      <small
        className={`text-xs capitalize font-semibold ${
          isActive ? "text-black" : "text-black"
        }`}
      >
        {item.id}
      </small>
    </Link>
  );
};

export default Footer;
