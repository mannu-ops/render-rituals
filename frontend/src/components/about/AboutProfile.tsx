export default function AboutProfile() {
  return (
    <section className="border-t border-black/10 py-20 md:py-28">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">Profile</p>

        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="font-display text-4xl leading-none md:text-6xl">
              An independent designer building a practice around thoughtful
              interiors and visual storytelling.
            </h2>
            <p className="mt-7 max-w-2xl text-sm leading-7 text-black/50">
              For hiring, collaborations or freelance work, the portfolio and
              project brief are the best places to start. A detailed CV can be
              made available as part of the hiring conversation.
            </p>
          </div>

          <a
            href="/resume"
            className="w-fit rounded-full border border-black/15 px-5 py-3.5 text-xs transition-colors hover:bg-black hover:text-white"
          >
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
}
