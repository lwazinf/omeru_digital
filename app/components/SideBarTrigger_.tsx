"use client";

import { useRecoilState } from "recoil";
import { CartState, SideBarState } from "./atoms/atoms";
import { Social2_ } from "./Logo_";

interface SideBarTrigger_Props {}

const SideBarTrigger_ = () => {
  const [sideBar_, setSideBar_] = useRecoilState(SideBarState);
  const [cart_, setCart_] = useRecoilState(CartState);
  return (
    <div
      className={`w-[60px] min-h-screen fixed left-0 top-0 flex flex-col justify-start items-center pt-[80px] opacity-50`}
      onMouseEnter={() => {
        setSideBar_(true);
        setCart_(false);
      }}
    >
        <Social2_/>
        <div className={`w-full min-h-2 mt-auto mb-[80px] flex flex-col justify-center items-center`}>
            <div className={`-rotate-90 min-w-[140px] italic flex flex-col justify-end items-center text-black animate-pulse`}>
                Menu Tray
            </div>
          </div>
    </div>
  );
};

export default SideBarTrigger_;

export const CartTrigger_ = () => {
  const [sideBar_, setSideBar_] = useRecoilState(SideBarState);
  const [cart_, setCart_] = useRecoilState(CartState);
    return (
      <div
        className={`w-[60px] min-h-screen fixed right-0 top-0 flex flex-col justify-start items-center pb-[80px]`}
        onMouseEnter={() => {
          setCart_(true);
          setSideBar_(false);
        }}
      >
          {/* <Social2_/> */}
          <div className={`w-full min-h-2 mt-auto flex flex-col justify-center items-center`}>
            <div className={`-rotate-90 min-w-[140px] italic flex flex-col justify-end items-center text-black/50 animate-pulse`}>
                Cart Tray
            </div>
          </div>
      </div>
    );
  };
