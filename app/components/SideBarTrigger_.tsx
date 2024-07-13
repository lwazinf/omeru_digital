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
    </div>
  );
};

export default SideBarTrigger_;

export const CartTrigger_ = () => {
  const [sideBar_, setSideBar_] = useRecoilState(SideBarState);
  const [cart_, setCart_] = useRecoilState(CartState);
    return (
      <div
        className={`w-[60px] min-h-screen fixed right-0 top-0 flex flex-col justify-start items-center pt-[80px] opacity-50`}
        onMouseEnter={() => {
          setCart_(true);
          setSideBar_(false);
        }}
      >
          {/* <Social2_/> */}
      </div>
    );
  };
