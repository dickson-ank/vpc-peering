import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ImageContainer } from "../custom-image-container";
import Note from "../note";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";
import ReadMore from "../read-more-less";

interface Step4Props {
    setSelectedImage: (src: string) => void
}

export function Step4({setSelectedImage}: Step4Props){
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
                possible, thanks to VPC Peering!</span>
            </Paragraph>

            <Paragraph>
              We'll start with the Bastion Security Groups <br />
              • Go to Security Groups in the VPC Dashboard. <br />
              • <span className="text-primary font-semibold">Create Security Group</span>.<br />
              • We'll name it "ProdBastionSG" <br />
              • Add a description <br />
              • Select VPC (prod-vpc) <br />
               For Inbound rules:<br />
              • Add a rule for SSH access from anywhere<br />
            </Paragraph>
            <ImageContainer  src="./ProdBastionSG-create.jpeg" alt="Prod Bastion SG screenshot" selectedImage={setSelectedImage} />
            
            <Paragraph>
              • Create another one with name "DevBastionSG" <br />
              • Add a description <br />
              • Select VPC (dev-vpc) <br />
              • Set ssh inbound rule from anywhere <br />
            </Paragraph>
            <ImageContainer  src="./DevBastionSG-create.jpeg" alt="Dev Bastion SG screenshot" selectedImage={setSelectedImage} />

            <Paragraph>
              • We also need a security group for the private instance <br />
               <span className="block text-sm md:text-sm lg:text-sm sm:text-sm ml-4">
                a secondary network interface (ENI) will be governed by the ENI security group</span> <br />
              <span className="block text-sm md:text-sm lg:text-sm sm:text-sm ml-4">
                - We'll create the ENI and attach it to the private instance in the next step </span> <br />
              • Let's name it "PrivateInstanceSG" <br />
              • Add a description <br />
              • Select VPC (prod-vpc) <br />
              • Set ssh inbound rule from "ProdBastionSG" (search "sg" from the dropdown and choose ProdBationSG ) <br />
            </Paragraph>
            <ImageContainer  src="./PrivateInstanceSG-create.jpeg" alt=" Private Instance SG screenshot" selectedImage={setSelectedImage} />

            <Paragraph>
              For ENI Security Group. <br />
              • We'll name it "ENISG" <br />
              • Will be in the prod-vpc <br />
              • Add inbound rule:<br />
              SSH - Source: Custom <span className="font-mono text-primary">192.168.1.0/24</span> from dev bastion's subnet <br />
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
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Cloudformation Code for Step 4 - (Security Groups)</h3>
                <p className="text-xs text-muted-foreground sm:text-xs md:text-xs lg:text-xs mb-2">The part of the Cloudformation code that creates
                 the Security Groups as dicussed above<br/>
                Uploading only this part to Cloudformation will fail to create unless the VPC and Subnets from Step 1 are already created <br />
                Append this code to the code from Step 1 and 2 to make it work, and ensure the indentations are correct
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