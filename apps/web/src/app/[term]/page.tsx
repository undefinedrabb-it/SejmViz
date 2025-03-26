import Link from "next/link";

import { clubsE as clubsE09 } from "@/data/clubs-09";
import { clubsE as clubsE10 } from "@/data/clubs-10";
import { mpsE as mpsE09 } from "@/data/mps-09";
import { mpsE as mpsE10 } from "@/data/mps-10";
import { Main } from "@/components/Main";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ term: "9" }, { term: "10" }] as const;
}

const terms = {
  "9": {
    label: "Term 9",
    mps: mpsE09,
    clubs: clubsE09,
  },
  "10": {
    label: "Term 10",
    mps: mpsE10,
    clubs: clubsE10,
  },
};

export default async function Page({ params }: { params: Promise<{ term: "9" | "10" }> }) {
  const { term } = await params;
  const { mps, clubs } = terms[term];

  return (
    <div className='flex flex-col h-screen'>
      <main className='grow bg-gray-800 flex-rows flex justify-around p-4'>
        <Link href='/9'>Term 09</Link>
        <Link href='/10'>Term 10</Link>
        <Main mps={mps} clubs={clubs} term={term} />
      </main>
      <footer className='text-xs text-center text-gray-400 p-2 bg-gray-700'>
        <p>2023, powered by next.js, vercel, t3-app</p>
      </footer>
    </div>
  );
}
