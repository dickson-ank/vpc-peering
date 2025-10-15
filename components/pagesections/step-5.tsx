import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ImageContainer } from "../custom-image-container";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";
import ReadMore from "../read-more-less";

interface Step5Props {
    setSelectedImage: (src: string) => void
}

export function Step5({setSelectedImage}: Step5Props){
    return(
        <ProjectSection id="step-5" title="Step 5: ENI & EC2 Instances" onImageClick={setSelectedImage}>
          <Paragraph>
            In this step, we will launch three EC2 instances and attach a Network Interface to one of them, 
            and configure them with their appropriate security groups created in the previous step
          </Paragraph>

          <Paragraph>
            • Search for "EC2" in the Search bar and open the EC2 Dashboard. <br/>
            • Go to "Network Interfaces". <br/>
            • Create a new network interface <br />
            • Add a description <br/>
            • Select prod-private-subnet, so that it will be assigned a private ip form this subnet <br/>
            • Check the "ENISG" security group and 
            <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">
                Create network interface</span>
          </Paragraph>
          <ImageContainer src="./ec2-instance-type.jpeg" alt="EC2 Instance Type Selection" selectedImage={setSelectedImage} />
          <ImageContainer src="./ec2-instance-type.jpeg" alt="EC2 Instance Type Selection" selectedImage={setSelectedImage} />


          <Paragraph>
            Now create the private instance first:
            • Go "Instances" and create a new instance. <br/>
            • We'll name it "PrivateInstance". <br/>
            • Leave the next sections as default go to Key Pair <br/>
            • Select a key pair for SSH access. If you don't have one, 
            create a new key pair and download the ".pem" file <br/>
            <span className="text-sm md:text-sm lg:text-sm sm:text-sm block ml-4">will be required to connect to the instances 
              later when we test ssh access.</span>
          </Paragraph>

          <Paragraph> 
            Edit Network Settings: <br/>
            - Select the VPC  (prod-vpc) <br/>
            - Select the the subnet (prod-private-subnet) <br/>
            - Disable Auto-assign Public IP <br/>
            <span className="text-sm md:text-sm lg:text-sm sm:text-sm block ml-4">the instance is private and doesn't
              require a public IP.</span>
            - Under Security Group, "Select an existing security group" 
            and choose the  "PrivateInstanceSG" security <br/> <br />
         </Paragraph>
          <ImageContainer src="./ec2-network-settings.jpeg" alt="EC2 Network Settings" selectedImage={setSelectedImage} />

          <Paragraph>
            • Leave everything else untouched and review <br />  
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">
                Launch instance</span> when done.
          </Paragraph>

          <Paragraph>
            Lauch two more instance for bastion hosts: <br /> <br />
            For "ProdBastion Server": <br />
            In the network settings select prod-vpc and the prod-public-subnet <br />
            - And then select the ProdBastionSG security group <br />
          </Paragraph>
         
      <div className="space-y-6">
                    <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                      <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Cloudformation Code for Step 4 - (EC2 Instances)</h3>
                      <p className="text-xs text-muted-foreground sm:text-xs md:text-xs lg:text-xs mb-2">The part of the Cloudformation code that creates
                       the EC2 Instances as dicussed above<br/>
                      Uploading only this part to Cloudformation will fail to create unless you combine with the codes from the previous steps,
                       and ensure the indentations are correct
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

  Instance1:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: t2.micro
      KeyName: vockey
      ImageId: !Ref AL2023AMI
      NetworkInterfaces:
        - AssociatePublicIpAddress: false
          DeviceIndex: 0
          SubnetId: !Ref PrivateSubnet
          GroupSet:
            - !Ref InstanceSecurityGroup
      UserData:
        Fn::Base64: !Sub |
          #!/bin/bash
          set -euxo pipefail
          sudo yum update -y
          sudo yum install -y httpd
          sudo systemctl start httpd
          sudo systemctl enable httpd
          sudo echo "$HOSTNAME" > /var/www/html/index.html
      Tags:
        - Key: Name
          Value: Instance1

  Instance2:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: t2.micro
      KeyName: vockey
      ImageId: !Ref AL2023AMI
      NetworkInterfaces:
        - AssociatePublicIpAddress: false
          DeviceIndex: 0
          SubnetId: !Ref PrivateSubnet
          GroupSet:
            - !Ref InstanceSecurityGroup
      UserData:
        Fn::Base64: !Sub |
          #!/bin/bash
          set -euxo pipefail
          sudo yum update -y
          sudo yum install -y httpd
          sudo systemctl start httpd
          sudo systemctl enable httpd
          sudo echo "$HOSTNAME" > /var/www/html/index.html
      Tags:
        - Key: Name
          Value: Instance2

      
                    `}
                          </SyntaxHighlighter>
                        </ReadMore>
                      </div>
                  </div>
                </div>

             </ProjectSection>
    )
}