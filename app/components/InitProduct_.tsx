"use client";

import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { CategoryState, OfferState } from "./atoms/atoms";
import { AddProduct_, getProducts_, uploadFileAndGetDownloadLink } from "./utils/utils";
import { faAdd, faChevronLeft, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 } from "uuid";

const InitProduct_ = () => {
    const [switchFifth_, setSwitchFifth_] = useState(true);
    const [isInit_, setIsInit_] = useState(false);
    const [idx_, setIdx_] = useState(0);
    const [subIdx_, setSubIdx_] = useState(0);
    const [title_, setTitle_] = useState("");
    const [tempVar_, setTempVar_] = useState("");
    const [desc_, setDesc_] = useState("");
    const [categories_, setCategories_] = useRecoilState(CategoryState);
    const [tempPrice_, setTempPrice_] = useState(0);
    const [tempCat_, setTempCat_] = useState("");
    const [priceList_, setPriceList_] = useState([]);
    const [priceListMenu_, setPriceListMenu_] = useState(["Size", "Flavour"]);
    const [flavours_, setFlavours_] = useState([]);
    const [priceListIdx_, setPriceListIdx_] = useState(0);
    const [price_, setPrice_] = useState(0);
    const [priceSm_, setPriceSm_] = useState(0);
    const [price2L_, setPrice2L_] = useState(0);
    const [price5L_, setPrice5L_] = useState(0);
    const [price65L_, setPrice65L_] = useState(0);
    const [price10L_, setPrice10L_] = useState(0);
    const [price20L_, setPrice20L_] = useState(0);
    const [priceMd_, setPriceMd_] = useState(0);
    const [priceLg_, setPriceLg_] = useState(0);
    const [type_, setType_] = useState("");
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
      setType_(""); // This will clear the input field
      setTitle_(""); // This will clear the input field
      setPrice_(0); // This will clear the input field
      setPriceList_([]); // This will clear the input field
      setSubIdx_(0); // This will clear the input field
      setCategory_("Basic"); // This will clear the input field
      setDesc_(""); // This will clear the input field
      setFlavours_([]);
      setTempCat_("");
      setTempPrice_(0);
      setPriceSm_(0);
      setPriceMd_(0);
      setPriceLg_(0);
      setPrice2L_(0);
      setPrice5L_(0);
      setPrice65L_(0);
      setPrice10L_(0);
      setPrice20L_(0);
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
          if (images_) {
            setIdx_((prevIdx) => prevIdx + 1); // use functional update to ensure the state is updated correctly
          }
          console.log("In here..");
          setBlur_(true);
        }, 5000);
  
        return () => clearTimeout(timer);
      }
    }, [paramSet_, images_]);
  
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
            >
              {idx_ == 2 &&
                ["Single", "Bulk", "Cake"].map((obj_: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className={`min-w-0 min-h-0 flex flex-row justify-center items-center hover:text-black/80 text-black/50 bg-white/70 hover:bg-white/80 my-1 rounded transition-all hover:duration-200 duration-500 px-2 cursor-pointer ${
                        subIdx_ != 1
                          ? obj_ == type_ &&
                            "animate-pulse invert opacity-100 duration-200"
                          : "opacity-0 duration-500 pointer-events-none"
                      }`}
                      onClick={() => {
                        setSubIdx_(1);
                        setType_(obj_);
                      }}
                    >
                      {obj_}
                    </div>
                  );
                })}
            </div>
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
                From{" "}
                <span className={`text-red-600`}>
                  R
                  {type_ == "Cake"
                    ? priceSm_
                    : type_ == "Bulk"
                    ? price2L_
                    : price_}
                </span>
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
  
          {idx_ === 2 && subIdx_ === 1 && type_ === "Cake" && (
            <div
              className="w-[300px] min-h-[350px] absolute top-0 right-0 flex flex-col items-center justify-center"
              onClick={() => {}}
            >
              {idx_ === 2 && type_ === "Cake" && (
                <div className="w-full h-full flex flex-col justify-center items-center absolute top-0 left-0">
                  {priceList_.length > 0 &&
                    priceList_.map((obj_, index) => (
                      <div
                        key={index}
                        className="min-w-0 min-h-0 flex flex-row justify-center items-center hover:text-black/80 text-black/50 bg-white/70 hover:bg-white/80 my-1 rounded transition-all hover:duration-200 duration-500 px-2 cursor-pointer"
                        onClick={() =>
                          setPriceList_(priceList_.filter((_, i) => i !== index))
                        }
                      >
                        {/* @ts-ignore */}
                        {obj_.var} - R{obj_.price}
                      </div>
                    ))}
                </div>
              )}
              <div
                className={`min-w-0 min-h-0 flex flex-row justify-center items-center hover:text-black/80 text-black/50 ${
                  type_ === "Cake"
                    ? "bg-white/0 hover:bg-white/0"
                    : "bg-white/70 hover:bg-white/80 cursor-pointer"
                } px-2 rounded transition-all hover:duration-200 duration-500 absolute bottom-[42px]`}
              >
                {type_ === "Cake" ? (
                  <div className="w-full min-h-2 flex flex-row justify-center items-center">
                    {priceListMenu_.map((obj_, index_) => (
                      <div
                        className={`min-w-0 min-h-0 flex flex-row justify-center items-center hover:text-black/80 text-black/50 cursor-pointer bg-white/70 hover:bg-white/80 ${
                          priceListIdx_ === index_ ? "invert-0" : "invert"
                        } px-2 mx-[1px] rounded transition-all hover:duration-200 duration-500`}
                        key={index_}
                        onClick={() => setPriceListIdx_(index_)}
                      >
                        {obj_}
                      </div>
                    ))}
                  </div>
                ) : (
                  <input
                    className="mb-[1.5px] text-[14px] font-medium text-center opacity-100 pointer-events-auto"
                    maxLength={25}
                    type="text"
                    placeholder="Variant Name"
                    value={tempVar_}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        // @ts-ignore
                        setPriceList_((prev) => [
                          ...prev,
                          { var: tempVar_, price: price_ },
                        ]);
                        setTempVar_("");
                        setPrice_(0);
                      }
                    }}
                    onChange={(e) => setTempVar_(e.target.value)}
                  />
                )}
              </div>
            </div>
          )}
  
          {idx_ === 2 && priceListIdx_ === 0 && type_ === "Single" && (
            <div className="w-[50%] min-h-2 flex flex-row justify-center items-start bg-white/50 backdrop-blur-md absolute rounded-md">
              <div className="w-full min-h-2 flex flex-col justify-center items-center">
                <div className="w-full flex flex-row justify-center items-center">
                  <p className="ml-1 text-black/30 scale-[0.8]">R</p>
                  <input
                    type="text"
                    className="w-full text-black/60 text-[15px]"
                    placeholder="Small"
                    value={price_}
                    onChange={(e) => setPrice_(parseFloat(e.target.value) || 0)}
                  />
                  <p className="ml-1 text-black/30 scale-[0.8]">Single</p>
                </div>
              </div>
            </div>
          )}
  
          {idx_ === 2 && priceListIdx_ === 0 && type_ === "Bulk" && (
            <div className="w-[50%] min-h-2 flex flex-row justify-center items-start bg-white/50 backdrop-blur-md absolute rounded-md">
              <div className="w-full min-h-2 flex flex-col justify-center items-center">
                <div className="w-full flex flex-row justify-center items-center">
                  <p className="ml-1 text-black/30 scale-[0.8]">R</p>
                  <input
                    type="text"
                    className="w-full text-black/60 text-[15px]"
                    placeholder="Small"
                    value={price2L_}
                    onChange={(e) => setPrice2L_(parseFloat(e.target.value) || 0)}
                  />
                  <p className="ml-1 text-black/30 scale-[0.8]">2L</p>
                </div>
                <div className="min-w-2 flex flex-row justify-center items-center">
                  <p className="ml-1 text-black/30 scale-[0.8]">R</p>
                  <input
                    type="text"
                    className="w-full text-black/60 text-[15px]"
                    placeholder="Medium"
                    value={price5L_}
                    onChange={(e) => setPrice5L_(parseFloat(e.target.value) || 0)}
                  />
                  <p className="ml-1 text-black/30 scale-[0.8]">5L</p>
                </div>
                <div className="min-w-2 flex flex-row justify-center items-center">
                  <p className="ml-1 text-black/30 scale-[0.8]">R</p>
                  <input
                    type="text"
                    className="w-full text-black/60 text-[15px]"
                    placeholder="Large"
                    value={price65L_}
                    onChange={(e) =>
                      setPrice65L_(parseFloat(e.target.value) || 0)
                    }
                  />
                  <p className="ml-1 text-black/30 scale-[0.8]">6.5L</p>
                </div>
                <div className="min-w-2 flex flex-row justify-center items-center">
                  <p className="ml-1 text-black/30 scale-[0.8]">R</p>
                  <input
                    type="text"
                    className="w-full text-black/60 text-[15px]"
                    placeholder="Large"
                    value={price10L_}
                    onChange={(e) =>
                      setPrice10L_(parseFloat(e.target.value) || 0)
                    }
                  />
                  <p className="ml-1 text-black/30 scale-[0.8]">10L</p>
                </div>
                <div className="min-w-2 flex flex-row justify-center items-center">
                  <p className="ml-1 text-black/30 scale-[0.8]">R</p>
                  <input
                    type="text"
                    className="w-full text-black/60 text-[15px]"
                    placeholder="Large"
                    value={price20L_}
                    onChange={(e) =>
                      setPrice20L_(parseFloat(e.target.value) || 0)
                    }
                  />
                  <p className="ml-1 text-black/30 scale-[0.8]">20L</p>
                </div>
              </div>
            </div>
          )}
  
          {idx_ === 2 && priceListIdx_ === 0 && type_ === "Cake" && (
            <div className="w-[50%] min-h-2 flex flex-row justify-center items-start bg-white/50 backdrop-blur-md absolute rounded-md">
              <div className="w-full min-h-2 flex flex-col justify-center items-center">
                <div className="w-full flex flex-row justify-center items-center">
                  <p className="ml-1 text-black/30 scale-[0.8]">R</p>
                  <input
                    type="text"
                    className="w-full text-black/60 text-[15px]"
                    placeholder="Small"
                    value={priceSm_}
                    onChange={(e) => setPriceSm_(parseFloat(e.target.value) || 0)}
                  />
                  <p className="ml-1 text-black/30 scale-[0.8]">SM</p>
                </div>
                <div className="min-w-2 flex flex-row justify-center items-center">
                  <p className="ml-1 text-black/30 scale-[0.8]">R</p>
                  <input
                    type="text"
                    className="w-full text-black/60 text-[15px]"
                    placeholder="Medium"
                    value={priceMd_}
                    onChange={(e) => setPriceMd_(parseFloat(e.target.value) || 0)}
                  />
                  <p className="ml-1 text-black/30 scale-[0.8]">MD</p>
                </div>
                <div className="min-w-2 flex flex-row justify-center items-center">
                  <p className="ml-1 text-black/30 scale-[0.8]">R</p>
                  <input
                    type="text"
                    className="w-full text-black/60 text-[15px]"
                    placeholder="Large"
                    value={priceLg_}
                    onChange={(e) => setPriceLg_(parseFloat(e.target.value) || 0)}
                  />
                  <p className="ml-1 text-black/30 scale-[0.8]">LG</p>
                </div>
              </div>
            </div>
          )}
  
          {idx_ === 2 && priceListIdx_ === 1 && type_ === "Cake" && (
            <div className="w-[50%] min-h-2 flex flex-row justify-center items-start bg-white/50 backdrop-blur-md absolute rounded-md overflow-hidden">
              <div className="w-full min-h-2 flex flex-col justify-center items-center">
                {flavours_.map((obj__, index__) => (
                  <div
                    className="w-full flex flex-row justify-center items-center cursor-pointer hover:bg-black hover:text-white/80 text-black/80"
                    key={index__}
                    onClick={() =>
                      setFlavours_(flavours_.filter((item_) => item_ !== obj__))
                    }
                  >
                    <p className="ml-1 scale-[0.8]">{obj__}</p>
                  </div>
                ))}
                <div
                  className={`w-full flex flex-row justify-center items-center ${
                    flavours_.length === 6 &&
                    "opacity-0 hidden pointer-events-none"
                  }`}
                >
                  <input
                    type="text"
                    className="text-black/30 scale-[0.8] w-full"
                    placeholder="cat"
                    value={tempCat_}
                    onChange={(e) => setTempCat_(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
  
          {idx_ === 2 && priceListIdx_ === 1 && type_ === "Cake" && (
            <div
              className={`w-[30px] h-[30px] rounded-[50%] bg-white/20 hover:bg-white/50 backdrop-blur-md cursor-pointer absolute bottom-[80px] flex flex-col justify-center items-center hover:invert invert-0 ${
                flavours_.length === 6 && "opacity-0 pointer-events-none"
              }`}
              onClick={() => {
                if (tempCat_.length > 3) {
                  // @ts-ignore
                  setFlavours_([...flavours_, tempCat_]);
                  setTempCat_("");
                  setTempPrice_(0);
                }
              }}
            >
              <FontAwesomeIcon icon={faAdd} className="text-black/50" />
            </div>
          )}
  
          <div
            className={`w-[50%] overflow-hidden min-h-0 flex flex-row justify-center items-center hover:text-black/80 text-black/50 cursor-pointer bg-white/70 hover:bg-white/80 px-2 rounded transition-all hover:duration-200 duration-500 absolute bottom-11 ${
              idx_ < 1 || idx_ > 3 || idx_ == 2 || promptComplete_
                ? "opacity-0 duration-500 pointer-events-none"
                : "opacity-100 duration-200 pointer-events-auto"
            }`}
          >
            <input
              className={`mb-[1.5px] text-[14px] font-medium text-center ${
                idx_ == 1 || idx_ == 3
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              maxLength={25}
              type={"text"}
              onKeyDown={(e) => {
                if (idx_ == 2 && subIdx_ == 1 && type_ == "Cake") {
                  if (e.key === "Enter") {
                    // @ts-ignore
                    setPriceList_((prevPriceList_) => [
                      ...prevPriceList_,
                      { var: tempVar_, price: price_ },
                    ]);
                    setTempVar_("");
                    setPrice_(0);
                    console.log(priceList_);
                  }
                }
              }}
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
              value={desc_}
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
              if (idx_ === 0) {
                inputFile.current && inputFile.current.click();
              } else if ((idx_ === 2 && type_ === "Cake") || (idx_ === 2 && type_ === "Bulk")) {
                setParamSet_(!paramSet_);
              } else if (idx_ === 2) {
                setParamSet_(!paramSet_);
              } else if (
                (idx_ === 1 && title_.length >= 3) ||
                (idx_ === 3 && category_.length >= 3) ||
                (idx_ === 4 && desc_.length >= 30)
              ) {
                console.log(1, 3, 4);
                setParamSet_(!paramSet_);
              } else if (idx_ === 5) {
                console.log(5);
                const newOffer = {
                  id: v4(),
                  title: title_,
                  type: type_,
                  price:
                    type_ === "Cake"
                      ? { sm: priceSm_, md: priceMd_, lg: priceLg_ }
                      : type_ === "Bulk"
                      ? {
                          "2": price2L_,
                          "5": price5L_,
                          "65": price65L_,
                          "10": price10L_,
                          "20": price20L_,
                        }
                      : price_,
                  flavours: flavours_,
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
              {/* {idx_ == 2 && subIdx_ == 1 && "Select product type"} */}
              {idx_ == 1 && title_.length < 3
                ? "Set product title"
                : idx_ == 1 && title_.length >= 3 && "Proceed"}
              {idx_ == 2 && price_ < 20
                ? "Set product pricing"
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

  export default InitProduct_;