import ReturnButton from "../../components/Website/ReturnButton";

const Licensing = () => {
  return (
    <div className="w-full mx-auto">
      <ReturnButton path={"/"} />
      <h1 className="text-4xl font-bold mb-6">Licensing</h1>
      <p className="mb-4">
        Unless stated otherwise, all content on this website, including text, graphics, and code, is the intellectual property of [Your Website Name].
      </p>

      <h2 className="text-2xl font-semibold mb-2">Usage Rights</h2>
      <p className="mb-4">
        You are permitted to view, download, and print content for personal and non-commercial use only. Redistribution or reproduction of any content for
        commercial purposes is prohibited without prior written consent.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Third-Party Resources</h2>
      <p className="mb-4">
        Some materials may be sourced from third parties and used under their respective licenses. Please refer to those licenses for more information.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
      <p className="mb-4">For any questions regarding licensing, please contact us at [Your Contact Email].</p>

      <p className="mt-6">Last updated: April 2025</p>
    </div>
  );
};

export default Licensing;
