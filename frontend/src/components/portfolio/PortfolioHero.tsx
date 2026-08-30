import SectionHeading from "../common/SectionHeading";

export default function PortfolioHero() {
  return (
    <section className="pt-36 pb-16 md:pt-48 md:pb-24">
      <div className="container-rituals">
        <SectionHeading
          eyebrow="Selected work"
          title="Spaces, stories and details — made visible."
          description="A curated portfolio of interior design, architecture, modular planning and visualization work."
        />
      </div>
    </section>
  );
}
