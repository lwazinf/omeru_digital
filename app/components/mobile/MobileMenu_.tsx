import {
  faAngleRight,
  faBars,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import {
  CartState,
  MobileTrayState,
  SearchState,
  SideBarState,
  ViewItemState,
} from "../atoms/atoms";

interface MobileMenu_Props {}

const MobileMenu_ = () => {
  const [sideBar_, setSideBar_] = useRecoilState(SideBarState);
  const [lock_, setLock_] = useRecoilState(MobileTrayState);
  const [viewItem_, setViewItem_] = useRecoilState(ViewItemState);
  const [searchPhrase_, setSearchPhrase_] = useRecoilState(SearchState);
  const [cart_, setCart_] = useRecoilState(CartState);
  useEffect(() => {}, [sideBar_]);
  return (
    <div
      className={`min-h-2 min-w-2 flex flex-col justify-center items-center scale-[90%] py-2 rounded-[12px] z-[5] md:hidden transition-all ${
        viewItem_
          ? "opacity-0 duration-200 pointer-events-none"
          : "opacity-100 duration-75 pointer-events-auto"
      }`}
    >
      {[
        {
          icon: cart_ ? faAngleRight : faShoppingCart,
          func: () => {
            setCart_(!cart_);
            setLock_(false);
          },
        },
        {
          icon: lock_ ? faAngleRight : faSearch,
          func: () => {
            setCart_(false);
            setLock_(!lock_);
            setSearchPhrase_('');
          },
        },
        { icon: faBars, func: () => {} },
      ].map((obj_, index_) => {
        return (
          <div
            className={`w-[50px] h-[20px] rounded-[50%] m-1 my-3 relative flex flex-col justify-center items-center`}
            key={index_}
            onClick={() => {
              obj_.func();
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
