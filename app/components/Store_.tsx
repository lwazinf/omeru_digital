"use client";

import { useRecoilState } from "recoil";
import { SearchState, OfferState, CollectionState } from "./atoms/atoms";
import { Cake_, Init_, Product_ } from "./Product_";
import Search_ from "./Search_";
import Pills_ from "./Pills_";
import Footer_ from "./Footer_";

const Store_ = () => {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-start pt-4`}
    >
      <Search_ />
      <Pills_ />
      <Offers_ />
    </div>
  );
};

export default Store_;

const Offers_ = () => {
  const [offers_, setOffers_] = useRecoilState(OfferState);
  const [searchPhrase_, setSearchPhrase_] = useRecoilState(SearchState);
  const [collection_, setCollection_] = useRecoilState(CollectionState);
  return (
    <div className={`grid grid-cols-4 gap-4 mb-8`}>
      {[1].map((obj_, index) => {
        return <Init_ key={index} />;
      })}
      {offers_.map((obj_: any, index: any) => {
        if (
          obj_.desc.toLowerCase().includes(searchPhrase_.toLowerCase()) ||
          obj_.title.toLowerCase().includes(searchPhrase_.toLowerCase())
        ) {
          if (obj_.category == collection_ || collection_ == "") {
            if(obj_.type !== "Cake"){
              return <Product_ key={index} data_={obj_} />;
            }else{
              return <Cake_ key={index} data_={obj_} />;
            }
          }
        }
      })}
    </div>
  );
};
