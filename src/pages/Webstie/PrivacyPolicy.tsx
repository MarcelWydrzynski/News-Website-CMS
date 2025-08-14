import ReturnButton from "../../components/Website/ReturnToHomeButton";

const PrivacyPolicy = () => {
  return (
    <div className="w-full mx-auto">
      <ReturnButton path={"/"} />
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">We value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.</p>

      <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
      <p className="mb-4">We may collect information such as your name, email address, and any other details you provide when interacting with our website.</p>

      <h2 className="text-2xl font-semibold mb-2">How We Use Information</h2>
      <p className="mb-4">
        Your information is used to improve our services, communicate updates, and personalize your experience. We do not sell your personal data.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
      <p className="mb-4">Our site uses cookies to enhance your browsing experience. You can modify your browser settings to decline cookies if you prefer.</p>

      <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
      <p className="mb-4">We may use third-party services like analytics tools, but they are also obligated to keep your information secure.</p>

      <h2 className="text-2xl font-semibold mb-2">Changes to This Policy</h2>
      <p className="mb-4">We may update this Privacy Policy occasionally. Changes will be posted on this page, and we encourage you to review it regularly.</p>

      <p className="mt-6">Last updated: April 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
