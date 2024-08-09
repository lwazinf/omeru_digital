"use client";

import { useRecoilState } from "recoil";
import {
  SearchState,
  OfferState,
  CollectionState,
  UserState,
  AdminState,
  ViewItemState,
} from "./atoms/atoms";
import { Cake_, Product_ } from "./Product_";
import Search_ from "./Search_";
import Pills_ from "./Pills_";
import Footer_ from "./Footer_";
import InitProduct_ from "./InitProduct_";
import { Logo_, Social2_ } from "./Logo_";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import MobileMenu_ from "./mobile/MobileMenu_";

const Store_ = () => {
  const [viewItem_, setViewItem_] = useRecoilState(ViewItemState);
  return (
    <div className={`flex min-h-screen flex-col items-center justify-star`}>
      <div
        className={`md:w-full w-full min-h-screen fixed top-0 right-0 overflow-hidden`}
      >
        <img
          //   src={`/assets/images/bg.png`}
          className={`flex-col flex items-center justify-center w-full min-h-screen pointer-events-none`}
          style={{
            backgroundImage: `url(${"/assets/images/bg.png"})`,
            backgroundRepeat: "repeat",
            backgroundSize: "20%",
            opacity: "0.03",
          }}
        />
      </div>
      {/* <div className={`md:w-full w-full min-h-screen fixed top-0 right-0 overflow-hidden`}>
        <img
          //   src={`/assets/images/xbakeslogo.png`}
          className={`flex-col flex items-center justify-center w-full min-h-screen pointer-events-none`}
          style={{
            backgroundImage: `url(${"/assets/images/xbakeslogo.png"})`,
            backgroundRepeat: "repeat",
            backgroundSize: "40%",
            opacity: "0.05",
          }}
        />
      </div> */}
      <div className={`md:flex hidden`}>
        <Search_ />
      </div>
      <Pills_ />
      <Offers_ />
      <div
        className={`w-[60px] overflow-hidden min-h-screen flex pointer-events-none -rotate-900 flex-col justify-center items-center fixed right-0 z-[9] md:hidden `}
      >
        <div
          className={`flex flex-col justify-evenly items-center pb-8 ${
            viewItem_ ? "opacity-0" : "opacity-80"
          }`}
        >
          <div className={`min-w-[150px] absolute top-[15px]`}>
            <MobileMenu_ />
            </div>
          <div className={`w-[150px] -rotate-90 mr-8`}>
            <Logo_ />
          </div>
          <div className={`min-w-[150px] absolute bottom-[10px]`}>
            <Social2_ />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store_;

const Offers_ = () => {
  const [offers_, setOffers_] = useRecoilState(OfferState);
  const [searchPhrase_, setSearchPhrase_] = useRecoilState(SearchState);
  const [collection_, setCollection_] = useRecoilState(CollectionState);
  const [admin_, setAdmin_] = useRecoilState(AdminState);
  return (
    <div
      className={`grid sm_2:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:mb-8 md:my-0 my-[40px]`}
    >
      {admin_ &&
        [1].map((obj_, index) => {
          return <InitProduct_ key={index} />;
        })}
      {offers_.map((obj_: any, index: any) => {
        if (
          obj_.desc.toLowerCase().includes(searchPhrase_.toLowerCase()) ||
          obj_.title.toLowerCase().includes(searchPhrase_.toLowerCase())
        ) {
          if (obj_.category == collection_ || collection_ == "") {
            if (obj_.type !== "Cake") {
              return <Product_ key={index} data_={obj_} />;
            } else {
              return <Cake_ key={index} data_={obj_} />;
            }
          }
        }
      })}
    </div>
  );
};
