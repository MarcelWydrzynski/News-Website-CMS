import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

const FooterComponent = () => {
  return (
    <Footer className="!bg-transparent border-t border-gray-300">
      <div className="w-full">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 py-8 w-full max-w-6xl text-black items-center">
            <div className="flex flex-col items-center">
              <FooterLinkGroup col className="text-left">
                <p className="text-black font-bold text-lg">Contact us</p>

                <FooterLink href="#" className="!text-black">
                  Twitter
                </FooterLink>
                <FooterLink href="#" className="!text-black">
                  Facebook
                </FooterLink>
                <FooterLink href="#" className="!text-black">
                  Contact Us
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div className="flex flex-col items-center">
              <FooterLinkGroup col className="text-left">
                <p className="text-black font-bold text-lg">Terms and policies</p>
                <FooterLink href="#" className="!text-black">
                  Privacy Policy
                </FooterLink>
                <FooterLink href="#" className="!text-black">
                  Licensing
                </FooterLink>
                <FooterLink href="#" className="!text-black">
                  Terms &amp; Conditions
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div className="flex flex-col items-center">
              <FooterLinkGroup col className="text-left">
                <p className="text-black font-bold text-lg">Get our app</p>
                <FooterLink href="#" className="!text-black">
                  iOS
                </FooterLink>
                <FooterLink href="#" className="!text-black">
                  Android
                </FooterLink>
                <FooterLink href="#" className="!text-black">
                  Windows
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>

        <div className="w-full px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Flowbite™" year={2022} />
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
