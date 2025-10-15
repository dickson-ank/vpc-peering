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
              In this section we are going to a create The Load Balancer which will forward user requests to the instances
            </Paragraph>
          
            <Paragraph>
              Locate Load Balancers on the EC2 sidebar under "Load Balancing" <br />
              • Click on <span className="text-primary font-semibold">Create load balancer</span><br />
              • Choose Classic Load Balancer<br />
              • We'll name it "my-alb" <br />
              • We'll make it internet-facing <br />
              • Select the VPC <br />
              • Check the 2 AZs and select the public subnet in each <br />
              • Choose "LoadBalancerSG" as the security group
            </Paragraph>
            <ImageContainer className="mb-1"src="./alb-create.jpeg" alt="RDS Subnet Group screenshot" selectedImage={setSelectedImage} />


            <Paragraph>
              Inside listeners and routing: <br />
              -Set an HTTP listener on port 80 <br />
              -Set another listener for SSH (tcp on port 22) <br />
            </Paragraph>
            <ImageContainer className="mb-1"src="./alb-listerners-and-routing.jpeg" alt="RDS Subnet Group screenshot" selectedImage={setSelectedImage} />

            <Paragraph>
              Add instances <br />
            </Paragraph>
            <ImageContainer  src="./alb-add-instances.jpeg" alt="RDS Subnet Group screenshot" selectedImage={setSelectedImage} />

            <Paragraph>
               <span className="text-sm md:text-sm lg:text-sm sm:text-sm block ml-4">- Instance1 and Instance2 if you named them so</span><br /> <br />
              Leave everything else as-is and 
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create load balancer</span>
            </Paragraph>

            <Paragraph>
             It will take a few minutes to set up <br />
             Once it's done, copy the ALB DNS name and note it somewhere
            </Paragraph>
            <ImageContainer className="mb-1"src="./alb-dns-name.jpeg" alt="RDS Engine screenshot" selectedImage={setSelectedImage} />
            
            
            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Cloudformation Code for Step 5 - (Load Balancer)</h3>
                <p className="text-xs text-muted-foreground sm:text-xs md:text-xs lg:text-xs mb-2">The part of the Cloudformation code that creates
                 the Load Balancer dicussed above<br/>
                Uploading only this part to Cloudformation will fail to create unless the VPC and Subnets from Step 1 are already created <br />
                Append this code to the code from Step 1 through Step 4 to make it work, and ensure the indentations are correct
                </p>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto mb-4">
                  <ReadMore>
                    <SyntaxHighlighter style={{}} customStyle={{background: "transparent"}} language="yaml">
                      {`# Resources: ...

# VPC and Subnets section  
#    ....
# Routing section
#    ....
# Security groups
#    ....
# EC2 Instances
#    ....
# Load Balancer

  LoadBalancer:
    Type: AWS::ElasticLoadBalancing::LoadBalancer
    Properties:
      Scheme: internet-facing
      LoadBalancerName: my-alb
      Subnets:
        - !Ref PublicSubnet1
        - !Ref PublicSubnet2
      Listeners: 
        - LoadBalancerPort: 80
          InstancePort: 80
          Protocol: HTTP
          InstanceProtocol: HTTP
        - LoadBalancerPort: 22
          InstancePort: 22
          Protocol: TCP 
          InstanceProtocol: TCP
      SecurityGroups: 
        - !Ref LoadBalancerSecurityGroup
      HealthCheck: 
        Target: HTTP:80/index.html 
        HealthyThreshold: '3'
        UnhealthyThreshold: '5'
        Interval: '30'
        Timeout: '5'
      Instances: 
        - !Ref Instance1
        - !Ref Instance2


  
              `}
                    </SyntaxHighlighter>
                  </ReadMore>
                                    </div>
                                </div>
                              </div>
          
        </ProjectSection>
    )
}