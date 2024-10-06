import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const path = usePathname();
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

  const router = useRouter();

  return (
    <div className="fixed z-[100] w-screen top-0 ">
      <div className="flex  justify-between items-center py-5 px-4 sm:px-32 bg-white bg-opacity-60 backdrop-blur">
        <div className=" flex font-bold">
          <img
            src="/mlogos.png"
            alt="Instagram"
            className="w-12 aspect-square"
          />{" "}
        </div>
        <div className="flex gap-4">
          <div
            className=""
            onClick={() => {
              router.push("/login");
            }}
          >
            <img
              src="/logout.png"
              alt="Instagram"
              className="w-10 aspect-square"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
