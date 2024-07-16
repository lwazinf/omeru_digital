import { useRecoilState } from "recoil";
import { PaidState } from "./atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface PaymentNotif_Props {}

const PaymentNotif_ = () => {
  const [paid_, setPaid_] = useRecoilState(PaidState);
  return (
    <div
      className={`w-full h-full flex flex-col justify-center items-center fixed top-0 left-0 bg-white/50 backdrop-blur-md transition-all duration-100 ${
        paid_
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`w-[600px] h-[650px] rounded-[12px] bg-white shadow-md scale-[0.9] flex flex-col justify-start items-center overflow-hidden`}
      >
        <div
          className={`w-full min-h-12 flex flex-row justify-between items-center`}
        >
          <div
            className={`min-w-2 min-h-2 flex flex-row justify-between items-center`}
          >
            <img
              className={`cursor-pointer w-[80px] ml-4 transition-all duration-200 pointer-events-none`}
              src={`/assets/images/xbakeslogo.png`}
              onClick={() => {
                //   router.push("/");
              }}
            />
            <p className={`font-medium ml-2 text-[18px]`}>Purchase Made</p>
          </div>
          <FontAwesomeIcon icon={faTimes} className={`m-8`} />
        </div>
        <div
          className={`w-[90%] h-[1px] bg-black/10 flex flex-row justify-between items-center`}
        ></div>
        <div
          className={`w-full min-h-12 flex flex-row justify-between items-center`}
        >
          <div
            className={`min-w-2 min-h-2 flex flex-row justify-between items-center`}
          >
            <img
              className={`cursor-pointer w-[80px] ml-4 transition-all duration-200 pointer-events-none`}
              src={`/assets/images/xbakeslogo.png`}
              onClick={() => {
                //   router.push("/");
              }}
            />
            <p className={`font-medium ml-2 text-[18px]`}>Purchase Made</p>
          </div>
          <FontAwesomeIcon icon={faTimes} className={`m-8`} />
        </div>
      </div>
    </div>
  );
};

export default PaymentNotif_;
