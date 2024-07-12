import { useRecoilState } from "recoil";
import { SideBarState, ProductsState, UserState } from "./atoms/atoms";
import { Logo_, Social_ } from "./Logo_";

interface SideBar_Props {}

const SideBar_ = () => {
  const [sideBar_, setSideBar_] = useRecoilState(SideBarState);

  return (
    <div
      className={`md:w-[250px] w-full min-h-screen bg-white/60 backdrop-blur-lg ${
        sideBar_
          ? "opacity-100 duration-75 left-0"
          : "opacity-0 duration-500 left-[-100%]"
      } transition-all flex flex-col items-center justify-start pb-8 fixed top-0 shadow-lg`}
    >
      <div className={`md:w-[250px] w-full min-h-screen absolute top-0 left-0`}>
        <img
          //   src={`/assets/images/bg.png`}
          className={`flex-col flex items-center justify-center w-full min-h-screen pointer-events-none`}
          style={{
            backgroundImage: `url(${"/assets/images/bg.png"})`,
            backgroundRepeat: "repeat",
            backgroundSize: "80%",
            opacity: "0.05",
          }}
        />
      </div>
      <div
        className={`md:w-[250px] w-full min-h-screen absolute top-0 left-0 flex flex-col justify-start items-center mt-4`}
      >
        <img
          className={`cursor-pointer w-[130px] mb-[-35px] transition-all duration-200 pointer-events-none`}
          src={`/assets/images/xbakeslogo.png`}
          onClick={() => {
            //   router.push("/");
          }}
        />
      <Logo_ />
      <Social_/>
      <div
          className={`flex flex-col justify-center items-center min-w-[300px] bg-red-600 relative rounded-md left-10 bottom-[-10px] h-[520px] shadow-xl overflow-hidden cursor-pointer ${
            sideBar_ ? 'opacity-100 duration-[500ms] pointer-events-auto' : 'opacity-0 duration-[200ms] pointer-events-none'}`}
          onClick={() => {
            
          }}
        >
          <img
            className={`w-full h-full object-cover scale-[1.1] hover:scale-[1] transition-all duration-[500ms] hover:duration-[200ms]`}
            src={
              "/assets/images/cabinet.jpg"
              // featured_[feature_]
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar_;
