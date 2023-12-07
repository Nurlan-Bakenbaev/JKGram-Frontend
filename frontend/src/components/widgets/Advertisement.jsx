import { Divider } from "@mui/material";
const AdvertisementWidget = () => {
  return (
    <div
      className="bg-[#3a3349] drop-shadow-md 
    px-2 py-2 md:max-w-[320px] 
    lg-w-full min-w-[220px] border-[1px]
     border-[#4f4f4fb4] rounded-lg mb-2 "
    >
      <div className="flex justify-between py-2">
        <p className="text-[10px] text-slate-500">Advertisement</p>
        <p className="text-[10px] text-slate-500">create Ad</p>
      </div>
      <img
        className="w-full rounded-lg md:max-w-[520px]
         h-auto mb-2"
        src="https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg"
        alt="travel"
      />
      <div className="flex-gap">
        <p className="text-xs">Travel</p>
        <p className="text-xs"> email@gmail.com</p>
      </div>

      <Divider sx={{ background: "#4f4f4fb4" }} />
      <p className="text-xs text-white">Your dream Tour!</p>
    </div>
  );
};
export default AdvertisementWidget;
