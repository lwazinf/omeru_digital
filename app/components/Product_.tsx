"use client";

import {
  faAdd,
  faChevronLeft,
  faRepeat,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { OfferState, CategoryState, ViewItemState } from "./atoms/atoms";
import {
  AddProduct_,
  DeleteProduct_,
  getProducts_,
  uploadFileAndGetDownloadLink,
} from "./utils/utils";
import { v4 } from "uuid";

interface Product_Props {
  data_: any;
}

export const Product_ = ({ data_ }: Product_Props) => {
  const [card_, setCard_] = useState(false);
  const [offers_, setOffers_] = useRecoilState(OfferState);
  const [viewItem_, setViewItem_] = useRecoilState(ViewItemState);
  const [categories_, setCategories_] = useRecoilState(CategoryState);
  const initProducts_ = async () => {
    const data_ = await getProducts_("products");
    setOffers_(data_);
  };

  useEffect(() => {
    const uniqueCategories = [
      // @ts-ignore
      ...new Set(offers_.map((offer) => offer.category)),
    ];
    setCategories_(uniqueCategories);
  }, [offers_]);
  return (
    <div
      className={`w-[300px] h-[350px] transition-all hover:duration-200 duration-500 flex flex-col justify-center items-center rounded-[4px] relative overflow-hidden`}
      onMouseEnter={() => {
        setCard_(true);
      }}
      onMouseLeave={() => {
        setCard_(false);
      }}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full flex flex-col justify-end items-center text-white ${
          card_ ? "pb-[0px] duration-500" : "pb-[5px] duration-75"
        } transition-all`}
      >
        <div
          className={`w-full h-[50px] flex flex-col justify-center items-center relative bottom-[25px]`}
        >
          <div
            className={`w-full h-[80px] px-4 flex flex-col justify-center items-center`}
          >
            <div
              className={`w-full h-[40px] hover:bg-red-600 border-red-600 border-solid border-[1px] hover:animate-pulse hover:text-white/80 text-red-600/80 rounded-[3px] relative flex flex-col justify-center items-center scale-[0.9] cursor-pointer ${
                card_ ? "z-2 duration-500" : "z-0 duration-75"
              } transition-all`}
              onClick={() => {
                //   setOffer_(data_);
                setViewItem_(true);
              }}
            >
              <p className={`text-[15px] font-black`}>View this item</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-[300px] h-full transition-all duration-200 flex flex-col justify-center items-center rounded-[4px] my-2 scale-[1.1] pointer-events-none`}
      >
        <div
          className={`relative overflow-hidden w-[300px] h-full flex flex-col justify-center items-center rounded-[4px]`}
        >
          <img
            className={`w-full h-full object-cover relative rounded-[4px] ${
              card_ ? "bottom-[100px]" : "bottom-[0px]"
            } transition-all duration-200 rounded-[4px]`}
            src={data_.display}
          />
          <div
            className={`absolute top-4 left-0 w-full min-h-[40px] pt-4 flex flex-col justify-end items-end pr-6`}
          >
            <p
              className={`bg-white/20 backdrop-blur-sm px-2 rounded text-[18px] text-white/90 font-black`}
            >
              {data_.title}
            </p>
            <p
              className={`bg-white/20 backdrop-blur-sm px-2 mt-1 rounded text-[12px] text-white/90 font-black`}
            >
              From <span className={`text-red-600`}>R{data_.price}</span>
            </p>
            <div
              className={`w-[90%] h-[90px] flex flex-col justify-end items-center mt-[20%]`}
            >
              <p
                className={`bg-white/20 backdrop-blur-sm px-2 py-2 rounded text-[12px] text-white/90 font-medium transition-all ${
                  card_ ? "opacity-100 duration-1000" : "opacity-0 duration-200"
                }`}
              >
                {data_.desc}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`w-full h-full flex flex-col justify-end items-center absolute pl-6 pr-8 pb-2 pointer-events-none ${
            card_
              ? "bottom-[100px] opacity-100 duration-200"
              : "bottom-[0px] opacity-0 duration-200"
          } transition-all`}
        >
          <div
            className={`rotate-180 _shade w-full h-full absolute top-0 ${
              card_ ? "bottom-[100px] opacity-100" : "bottom-[0px] opacity-0"
            } transition-all duration-200`}
          />
          <div
            className={`w-full h-full flex flex-col justify-end items-center absolute top-0 left-0 pb-2 px-8`}
          ></div>
        </div>
      </div>
      <div
        className={`w-6 h-6 flex flex-col justify-center items-center absolute top-8 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-[50%] left-6 cursor-pointer text-[12px] text-red-600/60 hover:text-red-600 transition-all duration-200`}
        onClick={async () => {
          await DeleteProduct_(data_, () => {
            console.log("Reinitializing Products..");
            initProducts_();
            console.log("Document delteted.");
          });
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
};

export const Init_ = () => {
  const [switchFifth_, setSwitchFifth_] = useState(true);
  const [isInit_, setIsInit_] = useState(false);
  const [idx_, setIdx_] = useState(0);
  const [title_, setTitle_] = useState("");
  const [desc_, setDesc_] = useState("");
  const [categories_, setCategories_] = useRecoilState(CategoryState);
  const [price_, setPrice_] = useState(0);
  const [category_, setCategory_] = useState("Basic");
  const [blur_, setBlur_] = useState(false);
  const [promptComplete_, setPromptComplete_] = useState(false);
  const [paramSet_, setParamSet_] = useState(false);
  const [images_, setImages_] = useState<any>(null);
  const [offers_, setOffers_] = useRecoilState(OfferState);

  const inputFile = useRef<HTMLInputElement>(null);
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;
    if (selectedFile && selectedFile.length > 0) {
      setImages_(selectedFile[0]);
      setParamSet_(true);
    }
  };

  const initProducts_ = async () => {
    const data_ = await getProducts_("products");
    setOffers_(data_);
  };

  const resetFileInput = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
    }
    setImages_(null);
    setParamSet_(false);
  };

  const clearInput = () => {
    setTitle_(""); // This will clear the input field
    setPrice_(0); // This will clear the input field
    setCategory_("Basic"); // This will clear the input field
    setDesc_(""); // This will clear the input field
  };

  useEffect(() => {
    const uniqueCategories = [
      // @ts-ignore
      ...new Set(offers_.map((offer) => offer.category)),
    ];
    setCategories_(uniqueCategories);
  }, [offers_]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSwitchFifth_((prev) => !prev);
    }, 10000); // 10000 milliseconds = 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (paramSet_) {
      setPromptComplete_(true);
      const timer = setTimeout(() => {
        setPromptComplete_(false);
        if (promptComplete_ == false) {
          if (images_) {
            setIdx_(idx_ + 1);
          }
          setBlur_(true);
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [paramSet_]);

  return (
    <div className="w-[300px] h-[350px] transition-all hover:duration-200 duration-500 flex flex-col justify-center items-center rounded-[4px] relative overflow-hidden">
      <div
        className={`w-[300px] h-[350px] flex flex-col justify-center items-center relative transition-all ${
          isInit_ ? "bottom-0 duration-200" : "bottom-[100%] duration-500"
        }`}
      >
        {/* Card App */}
        <div className="w-[300px] h-[350px] flex flex-col justify-center items-center relative bg-gray-100 transition-all">
          <img
            className={`w-full h-full object-cover transition-all ${
              images_ ? "opacity-100 duration-200" : "opacity-0 duration-500"
            }`}
            src={images_ ? URL.createObjectURL(images_) : ""}
            alt="Selected"
          />
          <div
            className={`w-[300px] h-[350px] flex flex-col justify-center items-center absolute top-0 bg-white/10 backdrop-blur-md transition-all ${
              idx_ !== 5 && blur_
                ? "opacity-100 duration-200"
                : "opacity-0 duration-500"
            }`}
          />
        </div>
        {/* Prompt */}

        <div
          className={`min-w-0 min-h-0 flex flex-col justify-center items-center transition-all hover:duration-200 duration-500 absolute ${
            idx_ < 3 || promptComplete_
              ? "opacity-0 duration-500 pointer-events-none"
              : "opacity-100 duration-200 pointer-events-auto"
          }`}
        >
          {idx_ == 3 &&
            categories_.map((obj_: any, index: any) => {
              return (
                <div
                  key={index}
                  className={`min-w-0 min-h-0 flex flex-row justify-center items-center hover:text-black/80 text-black/50 cursor-pointer bg-white/70 hover:bg-white/80 my-1 rounded transition-all hover:duration-200 duration-500 px-2 ${
                    obj_ == category_ && "animate-pulse invert"
                  }`}
                  onClick={() => setCategory_(obj_)}
                >
                  {obj_}
                </div>
              );
            })}
        </div>
        {idx_ == 5 && (
          <div
            className={`w-[300px] h-[350px] absolute top-0 right-0 flex flex-col justify-end items-end p-4 pb-11 hover:text-black/80 text-black/50 rounded transition-all hover:duration-200 duration-500`}
            onClick={() => {}}
          >
            <p
              className={`bg-white/20 backdrop-blur-sm px-2 rounded text-[18px] text-white/90 font-black ${
                !switchFifth_ ? "hidden-transition" : "flex-transition"
              }`}
            >
              {title_}
            </p>
            <p
              className={`bg-white/20 backdrop-blur-sm px-2 mt-1 rounded text-[12px] text-white/90 font-black ${
                !switchFifth_ ? "hidden-transition" : "flex-transition"
              }`}
            >
              From <span className={`text-red-600`}>R{price_}</span>
            </p>
            <p
              className={`bg-white/20 backdrop-blur-sm px-2 py-2 mt-1 rounded text-[12px] text-white/90 font-medium ${
                switchFifth_ ? "hidden-transition" : "flex-transition"
              }`}
            >
              {desc_}
            </p>
          </div>
        )}
        <div
          className={`min-w-0 min-h-0 flex flex-row justify-center items-center hover:text-black/80 text-black/50 cursor-pointer bg-white/70 hover:bg-white/80 px-2 rounded transition-all hover:duration-200 duration-500 absolute bottom-11 ${
            idx_ < 1 || idx_ > 3 || promptComplete_
              ? "opacity-0 duration-500 pointer-events-none"
              : "opacity-100 duration-200 pointer-events-auto"
          }`}
        >
          <input
            className={`mb-[1.5px] text-[14px] font-medium text-center ${
              idx_ == 1 || idx_ == 2 || idx_ == 3
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            maxLength={25}
            type={"text"}
            value={
              idx_ == 1
                ? title_
                : idx_ == 2
                ? isNaN(price_)
                  ? ""
                  : price_
                : idx_ == 3
                ? category_
                : ""
            }
            onChange={(e) => {
              if (idx_ === 1) {
                setTitle_(e.target.value);
              } else if (idx_ === 2) {
                const input = e.target.value;
                const parsedValue = parseFloat(input);
                if (!isNaN(parsedValue)) {
                  setPrice_(parsedValue);
                } else {
                  setPrice_(0);
                }
              } else if (idx_ === 3) {
                setCategory_(e.target.value);
              }
            }}
          />
        </div>
        <div
          className={`min-w-0 min-h-0 flex flex-row justify-center items-center hover:text-black/80 text-black/50 cursor-pointer bg-white/70 hover:bg-white/80 px-2 rounded transition-all hover:duration-200 duration-500 absolute bottom-11 ${
            idx_ != 4 || promptComplete_
              ? "opacity-0 duration-500 pointer-events-none"
              : "opacity-100 duration-200 pointer-events-auto"
          }`}
        >
          <textarea
            className={`mb-[1.5px] text-[14px] font-medium text-start h-[130px] ${
              idx_ == 4
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            maxLength={140}
            onChange={(e) => {
              if (idx_ === 4) {
                setDesc_(e.target.value);
              }
            }}
          />
        </div>
        <div
          className={`min-w-0 min-h-0 flex flex-row justify-center items-center hover:text-black/80 text-black/50 cursor-pointer bg-white/70 backdrop-blur-md hover:bg-white/80 px-2 rounded transition-all hover:duration-200 duration-500 absolute bottom-4 ${
            promptComplete_
              ? "opacity-0 duration-500 pointer-events-none"
              : (idx_ == 1 && title_.length >= 3) ||
                (idx_ == 2 && price_ >= 20) ||
                (idx_ == 3 && category_.length >= 3) ||
                (idx_ == 4 && desc_.length >= 30)
              ? "opacity-100 duration-200 pointer-events-auto animate-pulse invert"
              : "opacity-100 duration-200 pointer-events-auto"
          }`}
          onClick={async () => {
            // Functions according to index
            if (idx_ == 0) {
              inputFile.current && inputFile.current.click();
            } else if (
              (idx_ == 1 && title_.length >= 3) ||
              (idx_ == 2 && price_ >= 20) ||
              (idx_ == 3 && category_.length >= 3) ||
              (idx_ == 4 && desc_.length >= 30)
            ) {
              setParamSet_(!paramSet_);
            } else if (idx_ == 5) {
              const newOffer = {
                id: v4(),
                title: title_,
                price: price_,
                desc: desc_,
                category: category_,
                display: await uploadFileAndGetDownloadLink(images_, v4()),
              };
              AddProduct_(newOffer, () => {
                console.log("Reinitializing Products..");
                initProducts_();

                setIsInit_(false);
                setImages_(null);
                setIdx_(0);
                setPromptComplete_(false);
                setBlur_(false);
                setIsInit_(true);
                setTitle_("");
                clearInput();
                resetFileInput();
              });
            }
          }}
        >
          <p className="mb-[1.5px] text-[14px] font-medium">
            {/* Prompt according to index */}
            {idx_ == 0 && "Add product cover"}
            {idx_ == 1 && title_.length < 3
              ? "Set product title"
              : idx_ == 1 && title_.length >= 3 && "Proceed"}
            {idx_ == 2 && price_ < 20
              ? "Set product price"
              : idx_ == 2 && price_ >= 20 && "Proceed"}
            {idx_ == 3 && category_.length < 3
              ? "Set product category"
              : idx_ == 3 &&
                category_.length >= 3 &&
                categories_.includes(category_)
              ? "Proceed"
              : idx_ == 3 &&
                category_.length >= 3 &&
                !categories_.includes(category_) &&
                "Add Category"}
            {idx_ == 4 && desc_.length < 30
              ? "Set product desc."
              : idx_ == 4 && desc_.length >= 30 && "Proceed"}
            {idx_ == 5 && "Create Product"}
          </p>
          <input
            type="file"
            id="file"
            ref={inputFile}
            onChange={onSelectFile}
            accept="image/png, image/jpeg, image/webp"
            style={{ display: "none" }}
          />
        </div>

        <div
          className={`min-w-0 min-h-0 flex flex-row justify-center items-center hover:text-black/80 text-black/50 cursor-pointer bg-white/70 hover:bg-white/80 backdrop-blur-md px-2 rounded transition-all absolute bottom-4 ${
            promptComplete_
              ? "opacity-100 duration-200 pointer-events-none"
              : "opacity-0 duration-500 pointer-events-none"
          }`}
        >
          <p className="mb-[1.5px] text-[14px] font-medium animate-pulse">
            Setting Parameter..
          </p>
        </div>
        {/* Back Button */}
        <div
          className={`min-w-0 min-h-0 flex flex-row justify-center items-center hover:text-black/80 text-black/50 cursor-pointer bg-white/70 backdrop-blur-md hover:bg-white/80 pr-1 rounded transition-all hover:duration-200 duration-500 absolute left-4 ${
            isInit_
              ? "top-4 opacity-100 duration-200"
              : "top-0 opacity-0 duration-1000"
          }`}
          onClick={() => setIsInit_(false)}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="ml-1 text-[10px]" />
          <p className="ml-1 mb-[1.5px] text-[14px] font-medium">Close</p>
        </div>
      </div>

      {/* Card Cover */}
      <div
        className={`w-[300px] h-[350px] flex flex-col justify-center items-center absolute bg-gray-200 transition-all ${
          isInit_ ? "bottom-[100%] duration-200" : "bottom-0 duration-500"
        }`}
      >
        <div
          className={`min-w-0 min-h-0 flex flex-row justify-center items-center hover:text-black/80 text-black/50 cursor-pointer bg-white/50 hover:bg-white/80 pr-1 rounded transition-all hover:duration-200 duration-500 my-[1.5px] ${
            !isInit_ ? "opacity-100 duration-200" : "opacity-0 duration-1000"
          }`}
          onClick={() => {
            setImages_(null);
            setIdx_(0);
            setPromptComplete_(false);
            setBlur_(false);
            setIsInit_(true);
            setTitle_("");
            clearInput();
            resetFileInput();
          }}
        >
          <FontAwesomeIcon icon={faAdd} className="ml-1 text-[10px]" />
          <p className="ml-1 mb-[1.5px] text-[14px] font-medium">
            {images_ ? "Restart" : "Add"}
          </p>
        </div>
        <div
          className={`min-w-0 min-h-0 flex-row justify-center items-center hover:text-black/80 text-black/50 cursor-pointer bg-white/50 hover:bg-white/80 pr-1 rounded transition-all hover:duration-200 duration-500 my-[1.5px] invert ${
            images_ ? "flex" : "hidden"
          } ${
            !isInit_ ? "opacity-100 duration-200" : "opacity-0 duration-1000"
          }`}
          onClick={() => setIsInit_(true)}
        >
          <FontAwesomeIcon icon={faRepeat} className="ml-1 text-[10px]" />
          <p className="ml-1 mb-[1.5px] text-[14px] font-medium">Resume</p>
        </div>
      </div>
    </div>
  );
};
