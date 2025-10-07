import { notFound } from "next/navigation";
import LayoutV2 from "../../../components/Layouts/LayoutV2";
import ProjectDetailsContent from "../../../components/project/ProjectDetailsContent";
import PortfolioData from "../../../assets/jsonData/portfolio/PortfolioData.json";

interface PageProps {
    params: {
        id: string;
    };
}

const ProjectDetailsPage = ({ params }: PageProps) => {
    const { id } = params;
    const data = PortfolioData.find(portfolio => portfolio.id === parseInt(id));

    if (!data) {
        notFound();
    }

    return (
        <>
            <LayoutV2 breadCrumb='project-details' title='Digital marketing and analytical solution'>
                <ProjectDetailsContent projectData={data} />
            </LayoutV2>
        </>
    );
};

export default ProjectDetailsPage;