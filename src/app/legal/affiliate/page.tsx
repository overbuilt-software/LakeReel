import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Affiliate Disclosure – LakeReel",
};

export default function AffiliatePage() {
  return (
    <LegalLayout title="Affiliate Disclosure" lastUpdated="March 2026">
      <div className="flex flex-col gap-5 text-slate-300 text-sm leading-relaxed">

        <p>
          LakeReel is operated by <strong className="text-white">Overbuilt Software LLC</strong>.
          We believe in full transparency about how this site earns revenue.
        </p>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">FTC Disclosure</h2>
          <p>
            In accordance with the Federal Trade Commission&apos;s guidelines (16 CFR Part 255),
            LakeReel participates in affiliate marketing programs. This means that when you click
            certain product links on our site and make a purchase, <strong className="text-white">we may earn a commission
            at no additional cost to you.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">Our Affiliate Partners</h2>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li><strong className="text-white">Bass Pro Shops</strong> — We link to fishing tackle and gear on basspro.com and may earn a commission on qualifying purchases.</li>
            <li><strong className="text-white">Cabela&apos;s</strong> — A Bass Pro Shops company. Same affiliate relationship applies.</li>
            <li><strong className="text-white">Amazon Associates</strong> — We may link to products on Amazon and earn from qualifying purchases as an Amazon Associate.</li>
            <li><strong className="text-white">Other Retailers</strong> — From time to time we may partner with other fishing and outdoor retailers. These will be noted where applicable.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">Our Editorial Standards</h2>
          <p>
            Affiliate relationships do not influence our fishing reports, lake conditions, or editorial content.
            Tackle recommendations on LakeReel are based on what anglers are actually reporting is working —
            not on commission rates. We only recommend products we believe are genuinely useful to anglers.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">Advertising</h2>
          <p>
            LakeReel also displays advertisements through Google AdSense and may display sponsored content
            from time to time. Sponsored content will always be clearly labeled.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">Questions</h2>
          <p>
            If you have any questions about our affiliate relationships or how we earn revenue, contact us at:<br />
            <strong className="text-white">Overbuilt Software LLC</strong><br />
            info@lakereel.com
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
