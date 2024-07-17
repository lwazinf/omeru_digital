import { faBars, faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SideBarState } from "./atoms/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

interface MobileMenu_Props {}

const MobileMenu_ = () => {
    const [sideBar_, setSideBar_] = useRecoilState(SideBarState);
    useEffect(() => {
        
    }, [sideBar_])
  return (
    <div
      className={`min-h-2 min-w-2 flex flex-row justify-center items-center fixed right-2 bottom-2 scale-[90%] py-2 rounded-[12px] shadow-md bg-white/60 backdrop-blur-md z-[5] md:hidden`}
    >
      {[
          { icon: faShoppingCart, func: () => {} },
          { icon: faSearch, func: () => {} },
        { icon: faBars, func: () => {
            setSideBar_(!sideBar_)
        } },
      ].map((obj_, index_) => {
        return (
          <div
            className={`w-[50px] h-[20px] rounded-[50%] m-1 relative flex flex-col justify-center items-center`}
            key={index_}
            onClick={() => {
              obj_.func()
            }}
          >
            <FontAwesomeIcon icon={obj_.icon} className={``} />
          </div>
        );
      })}
    </div>
  );
};

export default MobileMenu_;
