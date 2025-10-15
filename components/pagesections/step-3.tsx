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
        <ProjectSection id="step-4" title="Step 4: Security Groups" onImageClick={setSelectedImage}>
            <Paragraph>
              In this step we will set up Security Groups to control access to the Instances we will create in the next step <br />
              We will create a Secuity Group for an Elastic Network Interface (ENI) <br />
              Security Groups act as virtual firewalls that regulate inbound and outbound traffic. 
              We will create rules to allow only necessary traffic, ensuring a robust architecture.
            </Paragraph>
            <Paragraph>
              What we'll create: <br />
              • A Security Groups for the Bastion Hosts in both VPCs to allow ssh connection from anywhere.<br />
              • A Security Group for the ENI to allow ssh from the bastion in dev-vpc<br />
              <span className="block text-sm md:text-sm lg:text-sm sm:text-sm ml-4">
                possible thanks to VPC Peering</span>
            </Paragraph>

            <Paragraph>
              We'll start with the Classic Load Balancer Group <br />
              • Go to Security in the VPC Dashboard. <br />
              • <span className="text-primary font-semibold">Create Security Group</span>.<br />
              • We'll name it "LoadBalancerSG" <br />
              • Add a description <br />
              • Select VPC (my-vpc) <br />
            </Paragraph>

            <Paragraph>
              For Inbound rules:<br />
              • Add a rule for SSH access from anywhere<br />
              • Choose "SSH" from the dropdown <br />
              • Set the Source to "Anywhere IPv4" <br />
              • Add another rule for HTTP also with Source "Anywhere IPv4" <br />
              • Review and
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">
                Create security group</span>
            </Paragraph>
            <ImageContainer src="./loadbalancer-sg-create.jpeg" alt="Load Balancer SG screenshot" selectedImage={setSelectedImage} />
            
            <Paragraph>
              For Instance Security Group. <br />
              • We'll name it "InstanceSG" <br />
              • Add inbound rules:<br />
              • SSH - Source: Custom - "LoadBalancerSG" (search "sg" and select LoadBalancerSG from the dropdown) <br />
              • HTTP - Source: Custom - also from "LoadBalancerSG"  <br />
            </Paragraph>
            <ImageContainer  src="./InstanceSG-create.jpeg" alt="Instance SG screenshot" selectedImage={setSelectedImage} />
                        
            
            <Note grid={false}
            note1={<>
              - The instances security should allow traffic from only the load balancer security group<br />
              - Ensure to use descriptive names and comments for rules to make management easier <br />
                  </>}        
            />
            
            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Cloudformation Code for Step 3 - (Security Groups)</h3>
                <p className="text-xs text-muted-foreground sm:text-xs md:text-xs lg:text-xs mb-2">The part of the Cloudformation code that creates
                 the Security Groups as dicussed above<br/>
                Uploading only this part to Cloudformation will fail to create unless the VPC and Subnets from Step 1 are already created <br />
                Append this code to the code from Step 1 and Step 2 to make it work, and ensure the indentations are correct
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

  LoadBalancerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable SSH and HTTP access from anywhere
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
      Tags:
        - Key: Name
          Value: LoadBalancerSG

  InstanceSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable HTTP and SSH access from Load Balancer Security Group
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          SourceSecurityGroupId: !Ref LoadBalancerSecurityGroup 
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          SourceSecurityGroupId: !Ref LoadBalancerSecurityGroup
      Tags:
        - Key: Name
          Value: InstanceSG

              `}
                    </SyntaxHighlighter>
                  </ReadMore>
                </div>
            </div>
          </div>
          
        </ProjectSection>
    )
}