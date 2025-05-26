import LayoutV2 from '../../components/Layouts/LayoutV2';
import ServicesDetailsContent from '../../components/services/ServicesDetailsContent';

const ServicesDetailsPage = () => {
    return (
        <>
            <LayoutV2 breadCrumb='services-details' title='Professional service websites design'>
                <ServicesDetailsContent />
            </LayoutV2>
        </>
    );
};

export default ServicesDetailsPage;