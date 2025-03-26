"use client";

import { useReducer } from "react";

import { Percentage } from "./Percentage";

import { Circle, CircleWithLogo } from "@/components/Circle";

function addIsHidden<T>(arr: T[]): (T & { isHidden: boolean })[] {
  return arr.map((item) => ({ ...item, isHidden: false }));
}

type StateT = {
  focused: readonly string[];
  mps: ({ id: number; color: string; club: string } & { isHidden: boolean })[];
  clubs: ({ id: string; color: string } & { isHidden: boolean })[];
};

type ActionT = { type: "toggleFocusedClub"; payload: string } | { type: "selectAllFocused" } | { type: "unselectAllFocused" };
const reducer = (state: StateT, action: ActionT): StateT => {
  switch (action.type) {
    case "selectAllFocused": {
      const mps = state.mps.map((mp) => ({ ...mp, isHidden: false }));
      const clubs = state.clubs.map((club) => ({ ...club, isHidden: false }));
      const focused = state.clubs.map((club) => club.id);
      return { ...state, mps, clubs, focused };
    }
    case "unselectAllFocused": {
      const mps = state.mps.map((mp) => ({ ...mp, isHidden: true }));
      const clubs = state.clubs.map((club) => ({ ...club, isHidden: true }));
      return { ...state, mps, clubs, focused: [] };
    }
    case "toggleFocusedClub": {
      const clubId = action.payload;
      const set = new Set(state.focused);
      if (set.has(clubId)) {
        set.delete(clubId);
      } else {
        set.add(clubId);
      }
      const focused = Array.from(set);

      const mps = state.mps.map((mp) => ({ ...mp, isHidden: !focused.includes(mp.club) }));
      const clubs = state.clubs.map((club) => ({ ...club, isHidden: !focused.includes(club.id) }));

      return { ...state, mps, clubs, focused: focused };
    }
    default:
      return state;
  }
};

export function Main({
  mps,
  clubs,
  term,
}: {
  mps: { id: number; club: string; color: string }[];
  clubs: { id: string; color: string }[];
  term: string;
}) {
  const [{ focused, mps: mpsL, clubs: clubsL }, dispatch] = useReducer(reducer, {
    focused: clubs.map((club) => club.id),
    mps: addIsHidden(mps),
    clubs: addIsHidden(clubs),
  });

  const setOrToggleIfSame = (clubId: string) => () => {
    dispatch({
      type: "toggleFocusedClub",
      payload: clubId,
    });
  };

  return (
    <>
      <div className='flex flex-col items-center gap-64'>
        {focused.length === 0 ?
          <button className='bg-gray-700 text-white p-2 rounded-md' onClick={() => dispatch({ type: "selectAllFocused" })}>
            Select all
          </button>
        : <button className='bg-gray-700 text-white p-2 rounded-md' onClick={() => dispatch({ type: "unselectAllFocused" })}>
            Unselect all
          </button>
        }
        <Percentage focused={focused} mps={mpsL} />
      </div>
      <div className='w-3/4 flex flex-wrap justify-center '>
        {mpsL.map(({ id, color, club, isHidden }, i) => (
          <button style={{ flexBasis: `${100 / 23}%` }} key={`${id}-${i}`} onClick={setOrToggleIfSame(club)}>
            <Circle color={color} isHidden={isHidden} />
          </button>
        ))}
      </div>
      <div className='flex flex-col gap-2 place-items-end'>
        {clubsL.map(({ id, color, isHidden }, i) => (
          <button key={`${id}-${i}`} className='flex-rows flex items-center p-1 gap-3' onClick={setOrToggleIfSame(id)}>
            <div className='ml-2 text-lg text-white'>{id}</div>
            <CircleWithLogo color={color} isHidden={isHidden} imgUrl={`http://api.sejm.gov.pl/sejm/term${term}/clubs/${id}/logo`} />
          </button>
        ))}
      </div>
    </>
  );
}
