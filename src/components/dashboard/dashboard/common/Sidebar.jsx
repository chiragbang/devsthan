import { Link, useNavigate } from "react-router-dom";

import { isActiveLink } from "@/utils/linkActiveChecker";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    console.log("hii")
    // Remove items from localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("token");

  console.log(localStorage)
    // Redirect to the login page after logout
    navigate("/");
  };
  const sidebarContent = [
    {
      id: 1,
      icon: "/img/dashboard/sidebar/compass.svg",
      name: "Dashboard",
      routePath: "/dashboard/db-dashboard",
    },
    {
      id: 2,
      icon: "/img/dashboard/sidebar/booking.svg",
      name: " Booking History",
      routePath: "/dashboard/db-booking",
    },
    {
      id: 3,
      icon: "/img/dashboard/sidebar/bookmark.svg",
      name: "Wishlist",
      routePath: "/dashboard/db-wishlist",
    },
    {
      id: 4,
      icon: "/img/dashboard/sidebar/gear.svg",
      name: " Settings",
      routePath: "/dashboard/db-settings",
    },
    {
      id: 5,
      icon: "/img/dashboard/sidebar/log-out.svg",
      name: "Logout",
      onClick: handleLogout, // Call handleLogout function on click
    },
  ];
  return (
    <div className="sidebar -dashboard">
      {sidebarContent.map((item) => (
        <div className="sidebar__item" key={item.id}>
          <div
            className={`${
              isActiveLink(item.routePath, pathname) ? "-is-active" : ""
            } sidebar__button `}
          >
            {item.onClick ? (
              // If onClick function is provided, use a button with onClick
              <button
                className="d-flex items-center text-15 lh-1 fw-500"
                onClick={item.onClick}
              >
                <img src={item.icon} alt="image" className="mr-15" />
                {item.name}
              </button>
            ) : (
              // If no onClick function, use a Link
              <Link
                to={item.routePath}
                className="d-flex items-center text-15 lh-1 fw-500"
              >
                <img src={item.icon} alt="image" className="mr-15" />
                {item.name}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
