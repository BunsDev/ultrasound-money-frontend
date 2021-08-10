import React, { memo, FC, useState, useCallback } from "react";
import SpanMoji from "../SpanMoji";
import CountUp from "react-countup";
import useFeeData, { BurnRates, FeesBurned } from "../../use-fee-data";
import FeePeriodControl, { Timeframe } from "../fee-period-control";

const weiToEth = (wei: number): number => wei / 10 ** 18;

const timeframeFeesBurnedMap: Record<Timeframe, keyof FeesBurned> = {
  t1h: "feesBurned1h",
  t24h: "feesBurned24h",
  t7d: "feesBurned7d",
  t30d: "feesBurned30d",
  tAll: "feesBurnedAll",
};

const timeframeBurnRateMap: Record<Timeframe, keyof BurnRates> = {
  t1h: "burnRate1h",
  t24h: "burnRate24h",
  t7d: "burnRate7d",
  t30d: "burnRate30d",
  tAll: "burnRateAll",
};

const CumulativeFeeBurn: FC = () => {
  const { feesBurned, burnRates } = useFeeData();
  const [timeframe, setFeePeriod] = useState<Timeframe>("t24h");

  const onSetFeePeriod = useCallback(setFeePeriod, [setFeePeriod]);

  const selectedFeesBurned =
    feesBurned !== undefined && feesBurned[timeframeFeesBurnedMap[timeframe]];
  const selectedBurnRate =
    burnRates !== undefined && burnRates[timeframeBurnRateMap[timeframe]];

  return (
    <div className="bg-blue-tangaroa w-full rounded-lg p-8">
      <div className="flex justify-between flex-wrap">
        <p className="font-inter font-light text-blue-shipcove text-xl mb-4 md:mb-0 lg:mb-4 xl:mb-0 md:text-xl">
          cumulative fee burn
        </p>
        <FeePeriodControl
          timeframe={timeframe}
          onSetFeePeriod={onSetFeePeriod}
        />
      </div>
      <div className="h-8"></div>
      {selectedFeesBurned !== undefined && selectedBurnRate !== undefined ? (
        <>
          <div>
            <p className="font-roboto flex justify-between text-white text-3xl md:text-4xl lg:text-3xl xl:text-5xl">
              <CountUp
                decimals={2}
                duration={1}
                separator=","
                end={weiToEth(selectedFeesBurned)}
                suffix=" ETH"
                preserveValue={true}
              />
              <SpanMoji emoji="🔥" />
            </p>
          </div>
          <div className="flex justify-between mt-8">
            <div>
              <p className="font-inter font-light text-blue-shipcove md:text-xl mb-2">
                burn rate
              </p>
              <p className="font-roboto flex justify-between text-white text-xl">
                <CountUp
                  decimals={2}
                  duration={1.5}
                  separator=","
                  end={weiToEth(selectedBurnRate)}
                  suffix=" ETH/min"
                  preserveValue={true}
                />
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className="font-roboto text-white text-white text-3xl md:text-4xl lg:text-3xl xl:text-5xl">
          loading...
        </p>
      )}
    </div>
  );
};

export default memo(CumulativeFeeBurn);
