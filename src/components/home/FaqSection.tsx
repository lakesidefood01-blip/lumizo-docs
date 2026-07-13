"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Lumizo Docs really free?",
    answer:
      "Yes, Lumizo Docs is completely free to use. There are no hidden fees, no subscriptions, and no account required.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No, you don't need to create an account. Simply visit a generator, fill out the form, and download your PDF.",
  },
  {
    question: "Are my documents saved anywhere?",
    answer:
      "No, all documents are created locally in your browser. Your data never leaves your device. We don't have access to your documents.",
  },
  {
    question: "Can I customize the PDF templates?",
    answer:
      "Yes, you can choose from three professional templates: Modern, Professional, and Minimal. Each template offers a different design style.",
  },
  {
    question: "What file format are the documents?",
    answer:
      "Documents are generated as PDF files that you can download, print, or share directly from your browser.",
  },
  {
    question: "Can I add my company logo and signature?",
    answer:
      "Yes, you can set up your company profile with your logo and signature, and it will automatically appear on all generated documents.",
  },
];

export function FaqSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            FAQ
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Common questions about Lumizo Docs
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="text-left py-5 text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
