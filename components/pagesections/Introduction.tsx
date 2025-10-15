import { ImageContainer } from "../custom-image-container";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";

interface IntroductionProps {
    setSelectedImage: (src: string) => void
}

export function Introduction({setSelectedImage}: IntroductionProps){
    return(
        
        <ProjectSection id="introduction" title="Introduction: Initial Setup & Prerequisites" onImageClick={setSelectedImage}>
            <Paragraph>
                This project establishes two separate VPC environments (PROD and DEV) 
                and then connects them securely using VPC Peering.
            </Paragraph>

            <Paragraph>
                Below is the architecture of the project, we would build it step by step throughout this document
            </Paragraph>

            <ImageContainer src="./vpc-peering-topology.png" alt="Topology Diagram" selectedImage={setSelectedImage}>
                <div className="text-center p-1 rounded text-xs sm:text-sm text-muted-foreground mt-1">
                Topology Diagram
                </div>
            </ImageContainer>

            <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border mb-6">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Prerequisites</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>• AWS Account with appropriate IAM users and permissions</li>
                <li>• Familiarity with AWS Management Console</li>
                <li>• A Command Line Interface (CLI) tool</li>
                <p className="text-xs text-muted-foreground mt-1 pl-4">I will be using a WSL terminal </p>
                <li>• Familiarity with basic Linux Commands</li>
                <li>• Familiarity with AWS CloudFormation (optional but recommended)</li>
                </ul>
            </div>
        </ProjectSection>
    )
}