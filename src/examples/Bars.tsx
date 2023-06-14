import { useMemo } from "react";
import letterFrequency, {
  LetterFrequency,
} from "@visx/mock-data/lib/mocks/letterFrequency";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import {AxisLeft, AxisBottom} from "@visx/axis";

const data = letterFrequency.slice(0, 5);
const margin = {left: 50, right: 50, bottom: 50, top:50};

// accessors
const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

export type BarsProps = {
  width: number;
  height: number;
};
const Bars = ({ width, height }: BarsProps) => {


    if(width < 100){
        width = 100;
    }
    if(height < 100){
        height = 100;
    }

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, innerWidth],
        domain: data.map(getLetter),
        padding: 0.4,
      }),
    [innerWidth]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [innerHeight, 0],
        domain: [0, Math.max(...data.map(getLetterFrequency))],
          nice: true
      }),
    [innerHeight]
  );

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="#f1f1f1" />
      <Group top={margin.top} left={margin.left}>
        {data.map((d) => {
          const letter = getLetter(d);
          const barWidth = xScale.bandwidth();
          const barHeight = innerHeight - yScale(getLetterFrequency(d));
          const barX = xScale(letter);
          const barY = innerHeight - barHeight;
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={"green"}
              onClick={() => {
                console.log(`clicked : ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
      </Group>
        <AxisLeft scale={yScale} left={margin.left} top={margin.top}></AxisLeft>
        <AxisBottom scale={xScale} top={margin.top + innerHeight} left={margin.left}/>
    </svg>
  );
};

export default Bars;
