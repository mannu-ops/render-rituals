export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f6f2]">
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-black/45">
          Render Rituals
        </p>
        <div className="mx-auto mt-5 h-px w-24 overflow-hidden bg-black/10">
          <div className="h-full w-1/2 animate-pulse bg-[#a88d64]" />
        </div>
      </div>
    </main>
  );
}
