import ReturnButton from "../../components/Website/ReturnButton";

const TermsAndConditions = () => {
  return (
    <div className="w-full mx-auto">
      <ReturnButton path={"/"} />
      <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4">
        By accessing this website, you agree to be bound by these terms and conditions. If you do not agree, please do not use our website.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Use of Site</h2>
      <p className="mb-4">
        You agree to use this website for lawful purposes only. You must not use it in a way that may cause harm, disruption, or impairment to the website or
        others.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Intellectual Property</h2>
      <p className="mb-4">
        All content on this website is the property of [Your Website Name] unless otherwise noted. Unauthorized use may violate copyright laws.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Disclaimer</h2>
      <p className="mb-4">
        The information provided on this website is for general purposes only. We do not guarantee the accuracy, reliability, or completeness of any
        information.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
      <p className="mb-4">We are not liable for any damages arising from the use or inability to use the content of this website.</p>

      <h2 className="text-2xl font-semibold mb-2">Changes to Terms</h2>
      <p className="mb-4">We reserve the right to modify these terms at any time. Continued use of the website signifies your acceptance of any changes.</p>

      <p className="mt-6">Last updated: April 2025</p>
    </div>
  );
};

export default TermsAndConditions;
