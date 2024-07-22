import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import {
  CategoryState,
  CollectionState,
  PillState,
  SideBarState,
  TagState,
} from "./atoms/atoms";
import { useEffect, useState } from "react";

interface Pills_Props {}

const Pills_ = () => {
  const [pill_, setPill_] = useRecoilState(PillState);
  const [sideBar_, setSideBar_] = useRecoilState(SideBarState);
  const [lock_, setLock_] = useState(false);
  const [categories_, setCategories_] = useRecoilState(CategoryState);
  const [collection_, setCollection_] = useRecoilState(CollectionState);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 990px)');
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = () => {
      setIsSmallScreen(window.matchMedia('(max-width: 990px)').matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setLock_(prevLock => !prevLock);
      console.log("Lwazi");
    }
  }, [sideBar_, isSmallScreen]);
  return (
    <div
      className={`w-full min-h-[50px] md:flex-row flex-col justify-between md:justify-center md:mt-0 mt-2 items-center md:flex relative hidden`}
    >
      <div className={`flex flex-row w-full pb-2 justify-center items-center`}>
        <div
          className={`w-full h-full flex-row justify-center items-center relative flex`}
        >
          {categories_.slice(0, 4).map((obj_: any, index: any) => {
            return (
              <div
                className={`min-w-[80px] h-[20px] border-solid border-[1px] border-black/50 hover:border-red-600 md:flex hidden flex-row justify-center items-center rounded-[15px] mx-1 px-4 cursor-pointer text-black/65 hover:text-white/80 hover:bg-red-600 ${
                  collection_ == obj_ && "bg-black text-white/80 border-black"
                } transition-all duration-500 hover:duration-200 ${
                  lock_
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
                }`}
                key={index}
                onClick={() => {
                  setPill_(!pill_);
                  setCollection_(obj_ == collection_ ? "" : obj_);
                }}
              >
                <p className={`text-[12px] text-center min-w-[80px]`}>{obj_}</p>
              </div>
            );
          })}
          <div
            className={`md:w-[450px] w-[290px] min-h-2 md:mr-20 rounded-md bg-white/60 backdrop-blur-md p-2 z-[4] grid grid-cols-3 gap-4 top-0 justify-center items-center md:absolute md:my-0 mt-auto transition-all duration-500 hover:duration-200 md:mb-0 mb-12 ${
              lock_
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {[...categories_].map((obj_: any, index: any) => {
              return (
                <div
                  className={`min-w-[80px] h-[20px] border-solid border-[1px] border-black/50 hover:border-red-600 flex flex-row justify-center items-center rounded-[15px] mx-1 px-4 cursor-pointer text-black/65 hover:text-white/80 hover:bg-red-600 ${
                    collection_ == obj_ && "bg-black text-white/80 border-black"
                  } transition-all duration-500 hover:duration-200`}
                  key={index}
                  onClick={() => {
                    setPill_(!pill_);
                    setLock_(false)
                    setCollection_(obj_ == collection_ ? "" : obj_);
                  }}
                >
                  <p className={`text-[12px] text-center min-w-[80px]`}>
                    {obj_}
                  </p>
                </div>
              );
            })}
          </div>
          <div
            className={`min-w-[20px] h-[20px] border-solid border-[1px] border-black/50 hover:border-red-600 flex-row justify-center items-center rounded-[15px] mx-1 px-4 cursor-pointer hover:text-white/80 hover:bg-red-600 transition-all duration-500 hover:duration-200 bg-black text-white/80 border-black md:flex hidden`}
            onClick={() => {
              setLock_(!lock_);
            }}
          >
            <p className={`text-[12px] text-center min-w-[20px]`}>...</p>
          </div>
        </div>
        {/* <FontAwesomeIcon
          icon={faAngleRight}
          className={`mx-3 md2:mr-6 text-[16px] cursor-pointer hover:text-black/80 text-black/50`}
        /> */}
      </div>
    </div>
  );
};

export default Pills_;
