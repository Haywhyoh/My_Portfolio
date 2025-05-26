import AboutV1 from "../../components/about/AboutV1";
import BannerV1 from "../../components/banner/BannerV1";
import BlogV1 from "../../components/blog/BlogV1";
import BodyDark from "../../components/classes/BodyDark";
import ContactV1 from "../../components/contact/ContactV1";
import FactV1 from "../../components/fact/FactV1";
import FaqV2 from "../../components/faq/FaqV2";
import LayoutV3 from "../../components/Layouts/LayoutV3";
import PartnerV2 from "../../components/partner/PartnerV2";
import PortfolioV1 from "../../components/portfolio/PortfolioV1";
import PriceV1 from "../../components/price/PriceV1";
import PromoV1 from "../../components/promo/PromoV1";
import ResumeV1 from "../../components/resume/ResumeV1";
import ServicesV1 from "../../components/services/ServicesV1";
import TestimonialV2 from "../../components/testimonial/TestimonialV2";

const HomeDark = () => {
    return (
        <>
            <LayoutV3>
                <BannerV1 />
                <AboutV1 />
                <ServicesV1 sectionClass="default-padding" hasTitle={true} />
                <PortfolioV1 sectionClass="bg-gray default-padding" hasTitle={true} />
                <FactV1 />
                <ResumeV1 sectionClass="bg-gray default-padding" />
                <PartnerV2 />
                <TestimonialV2 sectionClass="bg-gray" />
                <PriceV1 sectionClass="default-padding bg-light" hasTitle={true} />
                <FaqV2 />
                <ContactV1 sectionClass="bg-gray default-padding" />
                <BlogV1 />
                <PromoV1 />
                <BodyDark />
            </LayoutV3>
        </>
    );
};

export default HomeDark;