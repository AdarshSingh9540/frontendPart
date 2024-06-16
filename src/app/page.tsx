import Image from "next/image";
import { LampDemo } from "./components/LampDemo";
import { AuroraBackgroundDemo } from "./components/AuroraBackgroundDemo";


export default function Home() {
  return (
    <div>
     {/* <LampDemo/> */}
     <AuroraBackgroundDemo/>
    </div>
  );
}