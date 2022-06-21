import { FC } from "react";
import { useGroupedAnalysis1 } from "../../api/grouped-analysis-1";
import colors from "../../colors";
import { Unit } from "../../denomination";
import * as Format from "../../format";
import { O, pipe } from "../../fp";
import { TimeFrameNext } from "../../time-frames";
import { timeframeBurnRateMap } from "../BurnTotal";
import IssuanceBurnBaseGauge from "./IssuanceBurnBaseGauge";

type BurnGaugeProps = { timeFrame: TimeFrameNext; unit: Unit };

const BurnGauge: FC<BurnGaugeProps> = ({ timeFrame, unit }) => {
  const burnRates = useGroupedAnalysis1()?.burnRates;

  const burnRate = pipe(
    burnRates,
    O.fromNullable,
    O.map((burnRates) => burnRates[timeframeBurnRateMap[timeFrame][unit]]),
    O.map((burnRate) =>
      unit === "eth"
        ? Format.ethFromWei(burnRate * 60 * 24 * 365.25) / 10 ** 6
        : (burnRate * 60 * 24 * 365.25) / 10 ** 9,
    ),
    O.toUndefined,
  );

  return (
    <div
      className={`
        flex flex-col justify-start items-center
        bg-blue-tangaroa
        px-4 md:px-0 py-8 pt-7
        rounded-lg md:rounded-r-none lg:rounded-r-lg
      `}
    >
      <IssuanceBurnBaseGauge
        emoji="🔥"
        gaugeUnit={unit === "eth" ? "M" : "B"}
        gradientFill="orange"
        needleColor={colors.fireOrange}
        title="burn"
        unit={unit}
        value={burnRate}
        valueUnit={unit === "eth" ? "ETH/year" : "USD/year"}
      />
    </div>
  );
};

export default BurnGauge;
