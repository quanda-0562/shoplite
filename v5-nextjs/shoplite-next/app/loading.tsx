export default function Loading() {
  return (
    <section className="animate-pulse">
      <div className="h-4 w-36 rounded bg-slate-200" />
      <div className="mt-3 h-10 w-64 rounded bg-slate-200" />
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => <div key={index} className="aspect-[3/4] rounded-2xl bg-slate-200" />)}
      </div>
    </section>
  );
}
