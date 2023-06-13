import React from 'react';
import letterFrequency, {LetterFrequency} from "@visx/mock-data/lib/mocks/letterFrequency";

const data = letterFrequency.slice(0,5);
const verticalMargin = 120;

console.log(data);

// accessors
const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;


export type BarsProps = {
    width: number;
    height: number;
    events?: boolean;
}
const Bars = ({width, height, events = false}: BarsProps) => {





    return (
        <svg width={width} height={height}>

        </svg>
    );
};

export default Bars;