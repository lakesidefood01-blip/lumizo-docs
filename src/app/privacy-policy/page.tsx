import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Lumizo Docs - how we handle your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p><strong>Last updated:</strong> January 2024</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">1. Introduction</h2>
        <p>
          Lumizo Docs (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, and safeguard information when you use our document
          generation tools and website.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">2. Information We Collect</h2>

        <h3 className="text-lg font-semibold text-foreground mt-6">2.1 Information You Provide</h3>
        <p>
          When you use our document generators, you enter information such as names, addresses, amounts, and other
          business details. <strong>This data is processed entirely in your browser and is never transmitted to our servers.</strong>
        </p>

        <h3 className="text-lg font-semibold text-foreground mt-6">2.2 Automatically Collected Information</h3>
        <p>We may automatically collect certain information when you visit our website:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Pages visited and time spent</li>
          <li>Referring website addresses</li>
          <li>IP address (anonymized)</li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground mt-6">2.3 Cookies and Similar Technologies</h3>
        <p>
          We use cookies and similar technologies to improve your experience, analyze site traffic, and personalize content.
          You can control cookie settings through your browser preferences.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">3. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Operate and maintain the Service</li>
          <li>Improve user experience</li>
          <li>Analyze site usage and trends</li>
          <li>Detect and prevent security issues</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8">4. Data Storage and Security</h2>
        <p>
          <strong>Document Data:</strong> All data you enter into our document generators is stored locally in your
          browser using Local Storage and is never transmitted to our servers. You can delete this data at any time
          by clearing your browser&apos;s Local Storage.
        </p>
        <p>
          <strong>Analytics Data:</strong> We use Google Analytics to collect anonymized usage statistics. This data
          is stored on Google&apos;s servers and is subject to Google&apos;s Privacy Policy.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">5. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Google Analytics:</strong> For website analytics and traffic analysis</li>
          <li><strong>Google AdSense:</strong> For displaying advertisements (if enabled)</li>
          <li><strong>Vercel:</strong> For website hosting and deployment</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8">6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
          <li>Disable cookies through your browser settings</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8">7. Children&apos;s Privacy</h2>
        <p>
          Our Service is not intended for children under 13 years of age. We do not knowingly collect personal
          information from children. If you are a parent or guardian and believe your child has provided us with
          personal information, please contact us.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
          new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:rizal.h33@gmail.com" className="text-primary hover:underline">rizal.h33@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
