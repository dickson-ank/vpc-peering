import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ImageContainer } from "../custom-image-container";
import Note from "../note";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";
import ReadMore from "../read-more-less";

interface Step3Props {
    setSelectedImage: (src: string) => void
}

export function Step3({setSelectedImage}: Step3Props){
    return(
        <ProjectSection id="step-3" title="Step 3: VPC Peering" onImageClick={setSelectedImage}>
            <Paragraph>
              In this section we are going to a create a peering connection between the two VPCs we created in Step 1 <br />
            </Paragraph>
          
            <Paragraph>
              Go to Peering connections in the VPC side menu <br />
              • Click on <span className="text-primary font-semibold">Create peering connection</span><br />
              • Assign it a name, "peer-con-interface"<br />
              • We'll make the prod-vpc make the peering request to dev-vpc<br />
              <span className="block text-sm md:text-sm lg:text-sm sm:text-sm ml-4">
                required in VPC peering to establish the connection</span>
              • Review and 
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create peering connection</span> <br />
            </Paragraph>
            <ImageContainer className="mb-1"src="./vpc-peer-requester.jpeg" alt="RDS Subnet Group screenshot" selectedImage={setSelectedImage} />
            <ImageContainer className="mb-1"src="./vpc-peer-accepter.jpeg" alt="RDS Subnet Group screenshot" selectedImage={setSelectedImage} />


            <Paragraph>
              You'll see a alert at the top of the page asking to accept the connection request <br />
              <span className="block text-sm md:text-sm lg:text-sm sm:text-sm ml-4">
                you need to accept the connection request made by prod-vpc to dev-vpc
                 since they're both managed in the same account</span> <br />
              -Go to Actions and accept the request
            </Paragraph>
            <ImageContainer className="mb-1"src="./alb-listerners-and-routing.jpeg" alt="RDS Subnet Group screenshot" selectedImage={setSelectedImage} />

            <Paragraph>
              Now we can go and modify "prod-private-rtb" <br />
              -You can select "Modify route tables now" from the green popup or go to the Route tables from the sidebar <br />
              Set a new route to the dev-public-subnet CIDR <span className="font-mono text-primary">
                192.168.1.0/24 </span> and target the Peering Connection<br />
              - Update "dev-public-rtb" with a route to the prod-private-subnet CIDR 
              <span className="font-mono text-primary">
                10.0.2.0/28 </span> and target the Peering Connection<br />
                <span className="block text-sm md:text-sm lg:text-sm sm:text-sm ml-4">
                now both subnets know the route to communicate with each other is through the Peering Connection</span>
            </Paragraph>
            <ImageContainer  src="./alb-add-instances.jpeg" alt="RDS Subnet Group screenshot" selectedImage={setSelectedImage} />
            <ImageContainer  src="./alb-add-instances.jpeg" alt="RDS Subnet Group screenshot" selectedImage={setSelectedImage} />
            
            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Cloudformation Code for Step 3 - (VPC Peering)</h3>
                <p className="text-xs text-muted-foreground sm:text-xs md:text-xs lg:text-xs mb-2">The part of the Cloudformation code that creates
                 the Load Balancer dicussed above<br/>
                Uploading only this part to Cloudformation will fail to create unless the VPC and Subnets from Step 1 are already created <br />
                Append this code to the code from Step 1 and step 2 to make it work, and ensure the indentations are correct
                </p>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto mb-4">
                  <ReadMore>
                    <SyntaxHighlighter style={{}} customStyle={{background: "transparent"}} language="yaml">
                      {`# Resources: ...

# VPC and Subnets section  
#    ....
# Routing section
#    ....
# VPC Peering
  
              `}
                    </SyntaxHighlighter>
                  </ReadMore>
                                    </div>
                                </div>
                              </div>
          
        </ProjectSection>
    )
}