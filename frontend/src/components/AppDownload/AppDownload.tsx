import { assets } from "@/assets/assets";
import Section from "../Section/Section";

type Props = {};

export default function AppDownload({}: Props) {
  return (
    <Section
      id="app-download"
      className="mt-24 mx-auto my-auto text-[max(3vw,20px)] text-center font-semibold">
      <p>
        For Better Experience Download <br /> Tomato App
      </p>
      <div className="flex mt-4 justify-center gap-[max(2vw,20px)]">
        <img
          className="w-[max(30vw,120px)] max-w-[180px] cursor-pointer transition duration-300 hover:scale-110"
          src={assets.play_store}
          alt="playstore icon"
        />
        <img
          className="w-[max(30vw,120px)] max-w-[180px] cursor-pointer transition duration-300 hover:scale-110"
          src={assets.app_store}
          alt="appstore icon"
        />
      </div>
    </Section>
  );
}
