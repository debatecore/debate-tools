import { motion } from "@/types/motion";
import { IconInfo } from "./icons/info";
import { useLang } from "@/lib/useLang";

const MotionDisplay = ({ motion }: { motion: motion | null }) => {
  const infoslideString = useLang("infoslide");

  return (
    <section className="lg:w-[50vw] p-5 flex flex-col items-center self-center">
      <p className="text-xl xl:text-2xl max-w-[80vw] lg:max-w-[50vw] mb-5 text-balance">
        &quot;{motion && motion?.motion ? motion.motion : ""}&quot;
      </p>
      {motion && motion.adinfo && (
        <section className="flex flex-col items-center mb-5 border-2 border-neutral-800 rounded-lg pt-2 p-4">
          <section className="flex gap-2 text-2xl items-center">
            <span className="text-neutral-500">
              <IconInfo />
            </span>
            {infoslideString}
          </section>
          <p className="text-justify max-w-[80vw] xl:max-w-[50vw]">{motion.adinfo}</p>
        </section>
      )}
      <p className="text-sm xl:text-base text-neutral-500 flex flex-col">
        {motion?.source || ""}
        <br />
        {motion?.type || ""}
      </p>
    </section>
  );
};
export { MotionDisplay };
