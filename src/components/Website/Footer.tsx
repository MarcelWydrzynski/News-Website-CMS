import { Footer, FooterLink, FooterLinkGroup } from "flowbite-react";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <Footer className="!bg-transparent border-t border-gray-300 py-16 px-4 mb-0">
      <div className="w-12/12 max-w-[1440px] justify-between mx-auto ">
        <div className="w-full text-black justify-between flex flex-wrap gap-x-10 gap-y-6 max-[500px]:justify-center">
          <div className="flex flex-col items-center">
            <FooterLinkGroup col className="text-left max-[500px]:text-center w-fit">
              <p className="text-black font-bold text-lg">Contact us</p>

              <FooterLink href="https://x.com/" target="_blank" className="!text-black">
                Twitter
              </FooterLink>
              <FooterLink href="https://www.facebook.com/" target="_blank" className="!text-black">
                Facebook
              </FooterLink>
              <FooterLink href="https://www.linkedin.com/in/marcel-wydrzy%C5%84ski-23896b239/" target="_blank" className="!text-black">
                Contact Us
              </FooterLink>
            </FooterLinkGroup>
          </div>
          <div className="flex flex-col items-center">
            <FooterLinkGroup col className="text-left max-[500px]:text-center w-fit">
              <p className="text-black font-bold text-lg">Terms and policies</p>
              <Link to={"/privacy-policy"}>
                <FooterLink href="#" className="!text-black">
                  Privacy Policy
                </FooterLink>
              </Link>
              <Link to={"/licensing"}>
                {" "}
                <FooterLink href="#" className="!text-black">
                  Licensing
                </FooterLink>
              </Link>

              <Link to={"terms-conditions"}>
                {" "}
                <FooterLink href="#" className="!text-black">
                  Terms &amp; Conditions
                </FooterLink>
              </Link>
            </FooterLinkGroup>
          </div>
          <div className="flex flex-col items-center">
            <FooterLinkGroup col className="text-left max-[500px]:text-center w-fit">
              <p className="text-black font-bold text-lg">Get our app</p>
              <FooterLink href="https://www.apple.com/pl/app-store/" target="_blank" className="!text-black">
                iOS
              </FooterLink>
              <FooterLink href="https://play.google.com/store/apps?hl=pl" target="_blank" className="!text-black">
                Android
              </FooterLink>
              <FooterLink href="https://apps.microsoft.com/home?hl=pl-PL&gl=PL" target="_blank" className="!text-black">
                Windows
              </FooterLink>
            </FooterLinkGroup>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
