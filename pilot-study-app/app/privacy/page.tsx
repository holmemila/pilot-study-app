export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "60px 20px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <div style={{ marginBottom: "48px" }}>
          <a href="/" style={{ color: "var(--text2)", fontSize: "14px", textDecoration: "none" }}>← Back to Squawk</a>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "var(--text)", marginTop: "24px", marginBottom: "8px", letterSpacing: "-0.02em" }}>Privacy Policy</h1>
          <p style={{ color: "var(--text2)", fontSize: "14px" }}>Last updated: July 2026</p>
        </div>

        {[
          {
            title: "1. Who we are",
            content: "Squawk is a free EASA PPL theory study application. We are committed to protecting your personal information and being transparent about what data we collect and how we use it. If you have any questions about this policy, contact us at holmemila@gmail.com."
          },
          {
            title: "2. What data we collect",
            content: "We collect the following information when you use Squawk:",
            list: [
              "Email address — used to create and manage your account",
              "Display name — optionally set by you in Settings",
              "Study progress — questions answered, rounds completed, and flashcard activity",
              "Logbook entries — flight data you choose to enter manually",
              "Exam date and daily study goal — optionally set in Settings",
              "Usage data — which subjects and lessons you study"
            ]
          },
          {
            title: "3. How we use your data",
            content: "We use your data solely to provide and improve the Squawk service:",
            list: [
              "To authenticate your account and keep it secure",
              "To save and display your study progress across sessions and devices",
              "To show you personalised statistics about your study activity",
              "To store your logbook entries so you can access them later"
            ]
          },
          {
            title: "4. Data storage",
            content: "Your data is stored securely using Supabase, a cloud database provider. Data is stored on servers within the European Union. We do not sell, rent, or share your personal data with third parties for marketing purposes."
          },
          {
            title: "5. Cookies",
            content: "Squawk uses essential cookies only — these are required for authentication and keeping you logged in. We do not use tracking cookies or advertising cookies. If we introduce advertising in the future (such as Google AdSense), this policy will be updated to reflect any additional cookie use."
          },
          {
            title: "6. Third party services",
            content: "Squawk uses the following third party services:",
            list: [
              "Supabase — database and authentication (supabase.com/privacy)",
              "Vercel — hosting and content delivery (vercel.com/legal/privacy-policy)",
              "Google Fonts — typography (policies.google.com/privacy)"
            ]
          },
          {
            title: "7. Your rights",
            content: "Under GDPR and UK data protection law, you have the right to:",
            list: [
              "Access the personal data we hold about you",
              "Request correction of inaccurate data",
              "Request deletion of your account and all associated data",
              "Object to processing of your data",
              "Data portability — receive your data in a machine-readable format"
            ],
            after: "To exercise any of these rights, contact us at holmemila@gmail.com. We will respond within 30 days."
          },
          {
            title: "8. Data retention",
            content: "We retain your data for as long as your account is active. If you delete your account, all associated personal data including study progress and logbook entries will be permanently deleted within 30 days."
          },
          {
            title: "9. Children",
            content: "Squawk is not directed at children under the age of 13. We do not knowingly collect personal data from children under 13. If you believe a child has provided us with personal data, please contact us and we will delete it."
          },
          {
            title: "10. Changes to this policy",
            content: "We may update this privacy policy from time to time. We will notify registered users of significant changes by email. The date at the top of this page will always reflect when the policy was last updated."
          },
          {
            title: "11. Contact",
            content: "If you have any questions, concerns, or requests regarding this privacy policy or your personal data, please contact us at holmemila@gmail.com."
          },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>{section.title}</h2>
            <p style={{ color: "var(--text2)", fontSize: "15px", lineHeight: 1.7, marginBottom: section.list ? "12px" : "0" }}>{section.content}</p>
            {section.list && (
              <ul style={{ paddingLeft: "20px", margin: "0" }}>
                {section.list.map(item => (
                  <li key={item} style={{ color: "var(--text2)", fontSize: "15px", lineHeight: 1.7, marginBottom: "4px" }}>{item}</li>
                ))}
              </ul>
            )}
            {section.after && (
              <p style={{ color: "var(--text2)", fontSize: "15px", lineHeight: 1.7, marginTop: "12px" }}>{section.after}</p>
            )}
          </div>
        ))}

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "32px", marginTop: "40px" }}>
          <p style={{ color: "var(--text2)", fontSize: "13px" }}>
            Squawk — Free EASA PPL Theory Study App · <a href="mailto:holmemila@gmail.com" style={{ color: "var(--text2)" }}>holmemila@gmail.com</a>
          </p>
        </div>

      </div>
    </div>
  )
}