export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4" aria-label="Đang tải sản phẩm">
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="aspect-square bg-slate-200" />
          <div className="space-y-3 p-4"><div className="h-3 w-1/3 rounded bg-slate-200" /><div className="h-5 rounded bg-slate-200" /><div className="h-4 w-2/3 rounded bg-slate-200" /><div className="h-10 rounded-xl bg-slate-200" /></div>
        </div>
      ))}
    </div>
  )
}
