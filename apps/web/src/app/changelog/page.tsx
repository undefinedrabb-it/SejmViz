export const metadata = {
  title: "SejmViz - Changelog",
  description: "Changelog of SejmViz",
};

const Element = ({ title, date, changes }: { title: string; date: string; changes: string[] }) => (
  <section className='m-6 p-4 border-gray-600 border-2'>
    <div className='flex flex-row mb-3 items-baseline'>
      <h2 className='text-4xl grow'>{title}</h2>
      <div>{date}</div>
    </div>
    <ul className='list-disc list-inside'>
      {changes.map((change, index) => (
        <li key={index}>{change}</li>
      ))}
    </ul>
  </section>
);

const Changelogs = [
  {
    title: "Version 0.0.3",
    date: "2025.03.26",
    changes: ["Migrate to NX monorepo", "simplify flow", " simplify types", "Staticly generate pages for terms"],
  },
  {
    title: "Version 0.0.2",
    date: "2025.03.19",
    changes: ["Update all packages", "Change Next Pages to Next App"],
  },
  {
    title: "Version 0.0.1",
    date: "2023.02.14",
    changes: ["Zmiana kolorów partii, aby bardziej przypominały przezentowane poglądy.", "Dodanie changelogu."],
  },
];

const ChangelogPage = () => (
  <div className='h-screen'>
    <main className='text-gray-100/90 h-full bg-gray-800 flex-col flex p-8'>
      <h1 className='text-center text-4xl m-6'>Changelog</h1>
      <div className='grow'>
        {Changelogs.map((log, index) => (
          <Element key={index} title={log.title} date={log.date} changes={log.changes} />
        ))}
      </div>
    </main>
    <footer className='text-xs text-center text-gray-400 p-2 bg-gray-700'>
      <p>2023, powered by next, vercel, t3-app</p>
    </footer>
  </div>
);

export default ChangelogPage;
