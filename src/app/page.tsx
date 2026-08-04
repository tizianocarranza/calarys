export default function Home() {
  return (
    <main className="min-h-screen px-20 pt-[30vh] relative">
      <h1 className="max-w-5xl font-serif text-display-xl font-medium leading-[0.82] tracking-[-0.04em]">
        Designed
        <br />
        with intention.
      </h1>

      <footer className="absolute bottom-14 inset-x-0 flex flex-col items-center justify-center gap-4">
        <div className="h-20 w-px bg-neutral-300" />
        <span className="text-[11px] font-medium tracking-[0.32em] text-neutral-500 uppercase">
          Explore Calarys
        </span>
      </footer>
    </main>
  );
}
