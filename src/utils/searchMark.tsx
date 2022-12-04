import Hangul from 'hangul-js';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

type MatchRange = Array<[number, number]>;

export function searchMark(list: string[], searchText: string) {
  const markedList: ReactNode[] = [];
  for (const text of list) {
    const matchResult = Hangul.rangeSearch(text, searchText) as MatchRange;
    if (matchResult) markedList.push(rangeMarking(matchResult, text));
  }
  return markedList;
}

export function rangeMarking(matchRange: MatchRange, text: string) {
  return matchRange.map((range, i) => {
    const end = range[1] + 1;
    const nextRange = matchRange[i + 1];
    return (
      <Fragment key={`${text}-${i}`}>
        {text.slice(
          i === 0 ? 0 : (matchRange[i - 1] as [number, number])[1],
          range[0],
        )}
        <mark>{String.prototype.slice.apply(text, [range[0], end])}</mark>
        {text.slice(end, nextRange ? nextRange[0] : text.length)}
      </Fragment>
    );
  });
}
