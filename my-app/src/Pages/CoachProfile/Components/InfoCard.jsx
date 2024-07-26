import {
  H6,
  Caption,
} from "../../../Components/Typography-components/Typography";
import Button from "../../../Components/Button/Button";
import avatar from "../../../Images/coach.jpg";
function InfoCard() {
  return (
    <div className="flex flex-col p-8 items-start gap-5 rounded-2xl border-2	 border-slate-200  ">
      <div id="img" className="rounded-lg">
        <img src={avatar} alt="" className="rounded-lg" />
      </div>
      <div id="info" className="flex flex-col gap-1">
        <H6 className="font-semibold text-indigo-600 leading-5	">Coach Name</H6>
        <Caption className="text-slate-500 text-justify	font-normal ">
          Senior HR Assistant
        </Caption>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
        <div className="col-span-3 md:col-span-4">
          <Button secondary larg className="">
            Book a Session
          </Button>
        </div>
        <div className="col-span-1">
          <Button primary larg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
            >
              <path
                d="M5.707 13.876C5.801 13.894 5.898 13.901 6.092 13.915C6.495 13.966 6.879 13.681 6.934 13.27C6.989 12.859 6.7 12.482 6.289 12.428C6.222 12.419 6.153 12.414 6.085 12.41C6.05 12.408 6.016 12.408 5.984 12.402C5.379 12.287 4.796 12.07 4.255 11.757C4.011 11.616 3.708 11.625 3.472 11.778C3.199 11.956 2.709 12.162 2.177 12.309C2.51 11.422 2.601 10.421 2.239 9.74095C1.756 8.90495 1.501 7.95595 1.501 6.99895C1.5 3.96695 3.967 1.50095 6.998 1.50095C8.931 1.50095 10.687 2.49395 11.696 4.15695C11.911 4.50995 12.371 4.62295 12.726 4.40895C13.08 4.19395 13.194 3.73295 12.979 3.37895C11.695 1.26395 9.459 0.00195336 6.998 0.00195336C3.14 0.000953364 0 3.13995 0 6.99895C0 8.21995 0.325 9.42695 0.927 10.469C1.094 10.783 0.862 12.074 0.22 12.717C0.011 12.926 -0.056 13.239 0.05 13.515C0.155 13.791 0.414 13.98 0.709 13.996C0.782 14 0.855 14.002 0.931 14.002C1.923 14.002 3.093 13.665 3.889 13.264C4.466 13.552 5.076 13.758 5.707 13.877V13.876Z"
                fill="#EEF2FF"
              />
              <path
                d="M17.294 13.3671C17.755 12.5701 17.999 11.6631 17.999 10.7461C17.999 7.85109 15.644 5.49609 12.749 5.49609C9.85405 5.49609 7.49805 7.85109 7.49805 10.7461C7.49805 13.6411 9.85305 15.9961 12.749 15.9961C13.074 15.9961 13.4 15.9661 13.719 15.9051C14.157 15.8221 14.583 15.6831 14.989 15.4911C15.586 15.7721 16.414 15.9991 17.124 15.9991C17.181 15.9991 17.236 15.9981 17.29 15.9951C17.586 15.9791 17.845 15.7901 17.95 15.5141C18.056 15.2381 17.989 14.9251 17.78 14.7161C17.404 14.3401 17.232 13.5481 17.294 13.3671Z"
                fill="#EEF2FF"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
