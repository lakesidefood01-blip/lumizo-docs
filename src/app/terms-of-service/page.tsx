import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Lumizo Docs document generator tools.",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p><strong>Last updated:</strong> January 2024</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
        <p>
          By accessing and using Lumizo Docs (&quot;the Service&quot;), you agree to be bound by these Terms of Service.
          If you do not agree with any part of these terms, you may not use the Service.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">2. Description of Service</h2>
        <p>
          Lumizo Docs provides free online tools for creating professional business documents, including but not limited to
          invoices, quotations, receipts, delivery orders, packing lists, and payslips. The Service generates PDF documents
          based on user input.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">3. User Responsibilities</h2>
        <p>You agree to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Service only for lawful purposes</li>
          <li>Provide accurate and truthful information when creating documents</li>
          <li>Not use the Service to create fraudulent or misleading documents</li>
          <li>Not attempt to disrupt or compromise the Service&apos;s security</li>
          <li>Not use automated tools to access or use the Service without permission</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8">4. Intellectual Property</h2>
        <p>
          The Service, including its design, code, and content, is owned by Lumizo Docs and protected by intellectual
          property laws. Documents created using the Service are your property and may be used freely for their intended purpose.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">5. Data and Privacy</h2>
        <p>
          All data you enter into the Service is processed locally in your browser. We do not store, transmit, or have
          access to the content of documents you create. Please refer to our Privacy Policy for more details.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">6. Disclaimer of Warranties</h2>
        <p>
          The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the Service
          will be uninterrupted, error-free, or completely secure. You are responsible for verifying the accuracy of
          documents generated through the Service.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">7. Limitation of Liability</h2>
        <p>
          Lumizo Docs shall not be liable for any indirect, incidental, special, or consequential damages arising from
          your use of the Service. This includes but is not limited to loss of profits, data, or business opportunities.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">8. Third-Party Links</h2>
        <p>
          The Service may contain links to third-party websites or services. We are not responsible for the content,
          privacy policies, or practices of any third-party sites or services.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">9. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately
          upon posting. Your continued use of the Service constitutes acceptance of the modified terms.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">10. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at:
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:docs@lumizo.my.id" className="text-primary hover:underline">docs@lumizo.my.id</a>
        </p>
      </div>
    </div>
  );
}
