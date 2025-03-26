"use client";
import { useMemo } from "react";

export function Percentage({
  focused,
  mps,
}: {
  focused: readonly string[];
  mps: { isHidden: boolean; id: number; club: string; color: string }[];
}) {
  const filtered = useMemo(() => mps.filter((mp) => focused.includes(mp.club)).length, [focused, mps]);
  const allMps = useMemo(() => mps.length, [mps]);

  return <div className='text-5xl text-white grow'>{filtered === allMps ? "All" : `${((filtered * 100) / allMps).toPrecision(2)}%`}</div>;
}
