export default function Loading() {
  return (
    <section className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="aspect-square rounded-xl bg-slate-200" />
        <div className="space-y-4">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-10 w-3/4 rounded bg-slate-200" />
          <div className="h-8 w-1/3 rounded bg-slate-200" />
          <div className="h-24 rounded bg-slate-200" />
          <div className="h-11 w-40 rounded bg-slate-200" />
        </div>
      </div>
    </section>
  );
}
