import { GenericButton } from "@/components/GenericButton";
import { IconDice } from "@/components/icons/Dice";
import { IconHeart } from "@/components/icons/Heart";
import { IconPoznanTram } from "@/components/icons/PoznanTram";

export default function FlexGapTest() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-serif my-4">flex gap test</h1>
      <div className="flex flex-row gap-4 my-8 bg-neutral-700 p-4 rounded">
        {[
          {
            text: "btn1",
            icon: IconHeart,
          },
          {
            text: "btn2",
            icon: IconDice,
          },
          {
            text: "btn3",
            icon: IconPoznanTram,
          },
        ].map((el) => {
          return <GenericButton key={el.text} text={el.text} icon={el.icon} />;
        })}
      </div>
      <div className="flex flex-row space-x-4 my-8 bg-neutral-700 p-4 rounded">
        {[
          {
            text: "btn4",
            icon: IconPoznanTram,
          },
          {
            text: "btn5",
            icon: IconHeart,
          },
          {
            text: "btn6",
            icon: IconDice,
          },
        ].map((el) => {
          return <GenericButton key={el.text} text={el.text} icon={el.icon} />;
        })}
      </div>
    </div>
  );
}
