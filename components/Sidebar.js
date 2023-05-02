import classNames from "classnames";
import Link from "next/link";
import { useRouter, push } from "next/router";
import React, { useState, useMemo } from "react";
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineLogout,
} from "react-icons/md";

import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import {useAuth} from '../context/AuthContext'

const menuItems = [
  { id: 1, label: "Home", link: "/" },
  { id: 2, label: "Order History", link: "/orderhistory" },
  { id: 3, label: "Account Settings", link: "/accountsettings" },
  { id: 4, label: "Delivery Addresses", link: "/deliveryaddress" },
];

const Sidebar = ({customer}) => {

  const {logout} = useAuth();
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();
  
  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0 text-pink-400",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  
  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <span
            className={classNames("mt-2 font-medium text-lg font-Montserrat", {
                hidden: toggleCollapse,
            })}
            >
            {/* {customer?.firstName + " " + customer?.lastName} */}
            {customer && customer.firstName + " " + customer.lastName}
        </span>
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-4">

            <span
              className={classNames("mt-2 font-medium text-xs", {
                hidden: toggleCollapse,
              })}
            >
              {customer&& customer.email}
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <BsFillArrowLeftCircleFill size="2rem"/>
            </button>
          )}
        </div>

        <div className="mt-6">
          <button className={classNames("shadow bg-pink-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-xl", {
                hidden: toggleCollapse,
              })} onClick={logout}>
              Logout
          </button>
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={classes}>
                <Link href={menu.link}>
                  <span className="flex py-4 px-3 items-center w-full h-full">
                    
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;