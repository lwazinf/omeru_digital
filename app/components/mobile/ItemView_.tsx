"use client";

import { useRecoilState } from "recoil";
import {
  BucketState,
  CartState,
  CurrentItemState,
  OfferState2,
  ProductsState,
  ViewItemState,
} from "../atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Groq from "groq-sdk";
import Search_ from "../Search_";

interface ItemViewMobile_Props {}

const ItemViewMobile_ = () => {
  const [products_, setProducts_] = useRecoilState(ProductsState);
  const [viewItem_, setViewItem_] = useRecoilState(ViewItemState);
  const [offer_, setOffer_] = useRecoilState(OfferState2);
  const [size_, setSize_] = useState(0);

  const [price_, setPrice_] = useState(0);

  const [newDesc_, setNewDesc_] = useState("");
  const [bucket_, setBucket_] = useRecoilState(BucketState);

  const init = () => offer_ && setPrice_(offer_.price[2]);

  const groq = new Groq({
    apiKey: "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", // This is the default and can be omitted
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    init();
    if (offer_ && viewItem_) {
      // handleSubmit(offer_ && offer_.desc);
    }
  }, [viewItem_]);
  return (
    <div
      className={`w-full min-h-screen flex-col justify-center items-center bg-white/70 backdrop-blur-md fixed top-0 left-0 transition-all ${
        viewItem_
          ? "opacity-100 pointer-events-auto duration-200"
          : "opacity-0 pointer-events-none duration-500"
      } md:hidden flex`}
    >
      <img
        className={`w-full min-h-screen object-cover relative`}
        src={`${offer_ ? offer_.display : ""}`}
      />
      <div
        className={`w-full h-screen absolute top-0 left-0 flex-row justify-center items-center transition-all p-4 top_fade `}
      >
        <div
          className={`w-full h-screen absolute top-0 left-0 flex-row justify-center items-center transition-all p-4 bottom_fade `}
        />
        <div
          className={`w-[140px] min-h-2 flex flex-row justify-center items-center`}
        >
          <div className={`w-[35px] h-[35px] bg-white rounded-[50%]`}></div>
          <div
            className={`w-[100px] h-[35px] bg-black/70 backdrop-blur-md rounded-[20px] mx-1 flex flex-col justify-center items-center text-[13px] font-medium text-white/70 border-white/70 border-[1px] border-solid`}
          >
            {offer_ && offer_.title}
          </div>
        </div>
        <div
          className={`w-[100px] h-[35px] rounded-[20px] mx-1 absolute top-0 right-0 m-4 flex-row justify-center items-center text-[13px] text-white`}
        >
          <div
            className={`w-full h-full flex flex-row justify-center items-center cursor-pointer`}
            onClick={() => {
              setViewItem_(false);
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} className={``} />
            <p
              className={`text-white text-[13px] ml-2 mt-[2.5px] font-medium mb-1`}
            >
              Back
            </p>
          </div>
        </div>
      </div>
      <div
        className={`w-full min-h-2 absolute bottom-0 left-0 flex-col justify-center items-center transition-all`}
      >
        <div
          className={`w-full min-h-2 absolute bottom-0 left-0 flex-col justify-center items-center transition-all px-4`}
        >
          <p className={`text-white text-[25px] font-black mb-1`}>
            Charlie Simmons
          </p>
          <p className={`text-white text-[18px] font-bold mb-1`}>
            R<span className={``}>240</span> Per 2L Bucket
          </p>
          <p className={`text-white/70 text-[13px] font-normal mb-3`}>
            Deserunt sint labore culpa ut ea ex consequat est sint voluptate
            irure excepteur Lorem. Minim aliquip in deserunt consectetur aliquip
            qui excepteur ut cillum amet. Proident deserunt sint et culpa
            eiusmod sit do.
          </p>
          <div
            className={`font-black w-full scale-[.8] mx-auto h-[50px] mb-2 transition-all duration-75 hover:duration-500 flex flex-row justify-center items-center`}
            onClick={() => {
              setViewItem_(false);
            }}
          >
            {["2l", "5l", "6.5l", "10l", "20l"].map((obj_, index_) => {
              return <div className={`h-[50px] w-[100px] bg-white/30 backdrop-blur-md rounded-[6px] mx-[4px] flex flex-col justify-center items-center text-white font-medium cursor-pointer`} key={index_}>
                {obj_}
              </div>;
            })}
          </div>
          <div
            className={`font-black text-white/80 w-[90%] mx-auto h-[50px] mb-4 border-[1px] bg-red-600/80 hover:bg-blue-200/80 backdrop-blur-md border-red-600/30 hover:border-white/50 transition-all duration-75 hover:duration-500 border-solid rounded-[3px] flex flex-row cursor-pointer justify-center items-center`}
            onClick={() => {
              setViewItem_(false);
            }}
          >
            Add To Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemViewMobile_;

// // // // // // // // Extra Comps // // // // // // // //
