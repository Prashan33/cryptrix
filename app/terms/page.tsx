const TermsPage = () => {
  return (
    <main className="main-container min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6">Terms &amp; Conditions</h1>

      <div className="space-y-6 text-purple-100 text-sm leading-relaxed max-w-3xl">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Cryptrix, you agree to be bound by these Terms &amp; Conditions.
            If you do not agree with any part of these terms, please do not use the platform.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. Use of Service</h2>
          <p>
            Cryptrix provides cryptocurrency market data for informational purposes only.
            The data displayed is sourced from third-party APIs and may be subject to delays.
            Nothing on this platform constitutes financial advice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. Disclaimer</h2>
          <p>
            Cryptrix is provided &ldquo;as is&rdquo; without warranty of any kind. We do not
            guarantee the accuracy, completeness, or timeliness of the information displayed.
            Use the data at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. Privacy</h2>
          <p>
            We do not collect personal data beyond what is necessary for the service to function.
            No user accounts or login information are stored.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. Changes</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the
            platform after changes constitutes acceptance of the updated terms.
          </p>
        </section>
      </div>
    </main>
  );
};

export default TermsPage;
