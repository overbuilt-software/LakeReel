import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Privacy Policy – LakeReel",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="March 2026">
      <div className="flex flex-col gap-5 text-slate-300 text-sm leading-relaxed">

        <p>
          LakeReel ("we," "our," or "us") is operated by <strong className="text-white">Overbuilt Software LLC</strong>.
          This Privacy Policy explains how we collect, use, and protect your information when you use our website at lakereel.com.
        </p>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">1. Information We Collect</h2>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li><strong className="text-white">Location data</strong> — With your permission, we use your device location to show nearby lakes and fishing reports.</li>
            <li><strong className="text-white">Usage data</strong> — Pages visited, features used, and device/browser type via analytics tools.</li>
            <li><strong className="text-white">User-submitted content</strong> — Fishing reports, catch logs, and any information you voluntarily submit.</li>
            <li><strong className="text-white">Account information</strong> — If you create an account, we collect your email address and display name.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>To provide and improve the LakeReel service</li>
            <li>To show you relevant fishing reports and lake conditions near you</li>
            <li>To send bite alerts and notifications you have opted into</li>
            <li>To analyze usage and improve our features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">3. Third-Party Services</h2>
          <p>We use the following third-party services that may collect data:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1 mt-1">
            <li><strong className="text-white">Google AdSense</strong> — Displays advertisements. Google may use cookies to serve ads based on your interests.</li>
            <li><strong className="text-white">Affiliate Partners</strong> — Links to Bass Pro Shops and other retailers. Clicking these links may set cookies on those sites.</li>
            <li><strong className="text-white">Analytics</strong> — We use analytics tools to understand how users interact with the site.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">4. Cookies</h2>
          <p>
            We use cookies to improve your experience, remember preferences, and serve relevant advertisements.
            You can control cookies through your browser settings. Disabling cookies may affect some site functionality.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">5. Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share anonymized, aggregated data with partners.
            We may disclose information if required by law.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">6. Children&apos;s Privacy</h2>
          <p>
            LakeReel is not directed to children under 13. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">7. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at:<br />
            <strong className="text-white">Overbuilt Software LLC</strong><br />
            privacy@lakereel.com
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
