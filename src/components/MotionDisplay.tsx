import { MotionTypeTranslation, motion, motionTypeCode } from "@/types/motion";
import { IconInfo } from "./icons/info";
import { useLang } from "@/lib/useLang";

const MotionDisplay = ({ motion }: { motion: motion | null }) => {
  const infoslideString = useLang("infoslide");
  return (
    <section className="p-5 flex flex-col items-center">
      <hr className="border-b-2 mb-5 rounded border-neutral-800 my-2 w-full" />
      <p className="text-2xl md:text-2xl max-w-[80vw] lg:max-w-[50vw] mb-5 text-balance">
        &quot;{motion?.motion || ""}&quot;
      </p>
      {motion && motion.adinfo ? (
        <section className="flex flex-col items-center mb-5 border-2 border-neutral-800 rounded-lg pt-2 p-4">
          <section className="flex gap-2 text-2xl items-center">
            <span className="text-neutral-500">
              <IconInfo />
            </span>
            {infoslideString}
          </section>
          <p className="text-justify max-w-[80vw] lg:max-w-[50vw]">{motion.adinfo}</p>
        </section>
      ) : (
        ""
      )}
      <p className="text-neutral-500 flex flex-col">
        {motion?.source || ""}
        <br />
        {motion?.type}
        {/* {MotionTypeTranslation(motion?.type as motionTypeCode) || ""} */}
      </p>
    </section>
  );
};
export { MotionDisplay };
