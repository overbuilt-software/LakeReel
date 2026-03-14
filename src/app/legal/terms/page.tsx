import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Terms of Use – LakeReel",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" lastUpdated="March 2026">
      <div className="flex flex-col gap-5 text-slate-300 text-sm leading-relaxed">

        <p>
          These Terms of Use govern your use of LakeReel, operated by <strong className="text-white">Overbuilt Software LLC</strong>.
          By using this site, you agree to these terms.
        </p>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">1. Use of the Service</h2>
          <p>
            LakeReel provides fishing reports, lake conditions, and tackle recommendations for informational purposes.
            You agree to use the service lawfully and not to misuse, disrupt, or interfere with the site or its users.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">2. User-Submitted Content</h2>
          <p>
            When you submit a fishing report or other content, you grant Overbuilt Software LLC a non-exclusive,
            royalty-free license to display and distribute that content on LakeReel. You are responsible for
            the accuracy of content you submit. Do not submit false, misleading, or harmful content.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">3. Fishing Regulations</h2>
          <p>
            LakeReel does not provide legal fishing advice. It is your responsibility to know and comply with
            all applicable state and federal fishing regulations, licensing requirements, and size/bag limits
            for the waters you fish. Always verify current regulations with your state wildlife agency.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">4. Accuracy of Information</h2>
          <p>
            Fishing reports on LakeReel are submitted by users and are not verified by Overbuilt Software LLC.
            Conditions, bite reports, and tackle recommendations are provided for general guidance only.
            We make no warranties about the accuracy or completeness of any information on this site.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">5. Third-Party Links</h2>
          <p>
            LakeReel contains links to third-party retailers including Bass Pro Shops. We are not responsible
            for the content, pricing, or availability of products on those sites. See our Affiliate Disclosure
            for more information.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Overbuilt Software LLC shall not be liable for any
            indirect, incidental, or consequential damages arising from your use of LakeReel.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">7. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the site after changes constitutes
            acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Oklahoma, without regard to conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">9. Contact</h2>
          <p>
            Questions? Contact us at:<br />
            <strong className="text-white">Overbuilt Software LLC</strong><br />
            legal@lakereel.com
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
