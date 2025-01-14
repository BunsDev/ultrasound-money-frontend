import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { FC, ReactNode } from "react";
import fireOwnSvg from "../assets/fire-own.svg";
import fireSlateusSvg from "../assets/fire-slateus.svg";
import type { TimeFrameNext } from "../time-frames";
import { displayLimitedTimeFrameMap, timeFramesNext } from "../time-frames";

export const Button: FC<{
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
  title?: string;
}> = ({ children, isActive, onClick, title }) => (
  <button
    className={`
      select-none border
      px-[10px] py-2
      font-roboto text-xs
      font-normal
      tracking-widest
      ${
        isActive
          ? "rounded-sm border-blue-highlightborder bg-blue-highlightbg text-white"
          : "border-transparent text-blue-spindle"
      }
    `}
    onClick={onClick}
    title={title}
  >
    {children}
  </button>
);

type Props = {
  onSetTimeFrame: (timeframe: TimeFrameNext) => void;
  selectedTimeframe: TimeFrameNext;
  topCornersRounded?: boolean;
};

const TimeFrameControl: FC<Props> = ({ selectedTimeframe, onSetTimeFrame }) => (
  <div className="flex flex-row items-center lg:gap-x-1">
    {timeFramesNext.map((timeFrame) => (
      <Button
        key={timeFrame}
        isActive={selectedTimeframe === timeFrame}
        onClick={() => onSetTimeFrame(timeFrame)}
        title={
          timeFrame === "since_burn"
            ? "since London hark fork where EIP-1559 was activated"
            : undefined
        }
      >
        {timeFrame === "since_burn" ? (
          <>
            <div
              className={`
                h-4 w-4
                ${selectedTimeframe === "since_burn" ? "hidden" : "block"}
              `}
            >
              <Image
                className={
                  selectedTimeframe === "since_burn" ? "hidden" : "block"
                }
                alt="flame emoji symbolizing time span since london hark fork when EIP-1559 was activated"
                src={fireSlateusSvg as StaticImageData}
                width={16}
                height={16}
              />
            </div>
            <div
              className={`
                h-4 w-4
                ${selectedTimeframe === "since_burn" ? "block" : "hidden"}
              `}
            >
              <Image
                alt="flame emoji symbolizing time span since london hark fork when EIP-1559 was activated"
                src={fireOwnSvg as StaticImageData}
                width={16}
                height={16}
              />
            </div>
          </>
        ) : (
          displayLimitedTimeFrameMap[timeFrame]
        )}
      </Button>
    ))}
  </div>
);

export default TimeFrameControl;
