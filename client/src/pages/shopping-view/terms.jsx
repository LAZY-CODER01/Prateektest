import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function TermsAndConditions() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex flex-col items-center justify-center px-4 py-12"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 border border-amber-100">
        <h1
          className="text-4xl font-bold mb-6 text-center"
          style={{ fontFamily: "'Playfair Display', serif", color: "#A67C52" }}
        >
          Terms & Conditions
        </h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-amber-700">
            Website Rights
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              All content, images, and materials on this website are the
              property of Mudrika International (Regalo) unless otherwise
              stated.
            </li>
            <li>
              Unauthorized use, reproduction, or distribution of any content is
              strictly prohibited.
            </li>
            <li>
              We reserve the right to modify, update, or remove content at any
              time without prior notice.
            </li>
            <li>
              Access to certain features may require user registration and
              compliance with our policies.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-amber-700">
            Return Policy
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              Returns are accepted within <b>7 days</b> of delivery for eligible
              products.
            </li>
            <li>
              Products must be unused, in original packaging, and accompanied by
              proof of purchase.
            </li>
            <li>
              Custom or personalized items are not eligible for return unless
              defective or damaged.
            </li>
            <li>
              To initiate a return, contact our support team at{" "}
              <a
                href="mailto:support@artisanhome.com"
                className="text-blue-600 underline"
              >
                support@artisanhome.com
              </a>
              .
            </li>
            <li>
              Refunds will be processed within 7 business days after the
              returned item is received and inspected.
            </li>
            <li>
              Shipping charges are non-refundable unless the return is due to
              our error.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-amber-700">
            General Terms
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              By using this website, you agree to comply with all applicable
              laws and regulations.
            </li>
            <li>
              Users are responsible for maintaining the confidentiality of their
              account information.
            </li>
            <li>
              Any misuse, fraudulent activity, or violation of these terms may
              result in account suspension or legal action.
            </li>
            <li>
              We are not liable for any indirect, incidental, or consequential
              damages arising from the use of our website or products.
            </li>
            <li>
              These terms may be updated periodically. Continued use of the
              website constitutes acceptance of the revised terms.
            </li>
          </ul>
        </section>
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => navigate(-1)}
            className="px-8 py-3 text-lg font-semibold"
            style={{
              background: "linear-gradient(135deg, #C9A66B 0%, #A67C52 100%)",
              color: "#FFF",
              border: "none",
            }}
          >
            Back
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default TermsAndConditions;
