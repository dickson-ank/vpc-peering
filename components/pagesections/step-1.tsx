import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ImageContainer } from "../custom-image-container";
import { ProjectSection } from "../project-section";
import { Paragraph } from "../paragraph";
import ReadMore from "../read-more-less";

interface Step1Props {
    setSelectedImage: (src: string) => void
}

export function Step1({setSelectedImage}: Step1Props){
    return(
        <ProjectSection id="step-1" title="Step 1: Creating VPC and Subnets" onImageClick={setSelectedImage}>
            <Paragraph>
              We will first create an isoloated network using a VPC and create 3 subnets inside it
              <span className="block text-sm md:text-sm lg:text-sm sm:text-sm ml-4">
                Two public and one private
              </span>
            </Paragraph>

            <Paragraph>
                • In the Management Console search for VPC and open the VPC Dashboard. <br/>
                • <span className="text-primary font-semibold">Create VPC</span>. <br/>
                • "VPC only" and provide a name ("my-vpc" in my case). <br/>
                 <span className="block text-sm md:text-sm lg:text-sm sm:text-sm ml-4">
                  I will be using this name format for the entire project for simplicity, 
                 you can use any format that works for you</span>
                • Set an IPv4 CIDR block of <span className="font-mono text-primary">10.0.0.0/16</span><br/>
                • Review and <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create VPC</span><br/>
            </Paragraph>
            <ImageContainer className="mb-1"src="./vpc-create.jpeg" alt="Container setup" selectedImage={setSelectedImage} />
            
            <Paragraph>
              Now to create subnets, <br />
              <span className="block text-sm md:text-sm lg:text-sm sm:text-sm ml-4">If you're wondering why create subnets by the way, 
              they're used to sectionalize the VPC. 
              They allow us to easily apply rules that determine which sections of 
              the network have access to the internet and which do not.</span> 
            </Paragraph>

            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
              Expand the VPC Dashboard sidebar if closed and go to Subnets
            </p>
            <Paragraph>
              <span className="text-primary font-semibold">Create Subnet</span><br />
              Choose the VPC created earlier ("my-vpc"). <br />
              We will create Public Subnets first <br />
              • So name it "public-subnet-1" since it's the only public subnet <br />
              • Set the Availability Zone to your preference (e.g., us-west-2a) and note it somewhere<br />
               <span className="block text-sm md:text-sm lg:text-sm sm:text-sm ml-4">
                becasue the second public subnet must be in a different AZ</span>
              • Set the IPv4 subnet CIDR block to <span className="font-mono text-primary">10.0.1.0/28</span> <br />
              • Review and click <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create Subnet</span> <br />
            </Paragraph>
            <ImageContainer className="mb-1"src="./create-public-subnet-1.jpeg" alt="Subnet create screenshot" selectedImage={setSelectedImage} />
            <Paragraph>
              We will follow similar procedure to create the second public subnet <br />
              • Name: public-subnet-2 <br />
              • Different AZ from prublic-subnet-1 <br />
              • CIDR: <span className="font-mono text-primary">10.0.2.0/28</span>
            </Paragraph>
            <ImageContainer className="mb-1"src="./create-public-subnet-2.jpeg" alt="Subnet create screenshot" selectedImage={setSelectedImage} />
            
            <Paragraph>
              And then a private subnet <br />
              • Name: private-subnet<br />
              • Same AZ as public-subnet-1 <br />
              • CIDR: <span className="font-mono text-primary">10.0.3.0/28</span>
            </Paragraph>
            <ImageContainer className="mb-1"src="./create-private-subnet.jpeg" alt="Subnet create screenshot" selectedImage={setSelectedImage} />

            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Cloudformation Code for Step 1 - (VPC and Subnets)</h3>
                <p className="text:xm text-muted-foreground md:text:xs lg:text-xs mb-2">The part of the Cloudformation code that creates vpc and subnets as we discussed above
                </p>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto mb-4">
                <ReadMore>
                <SyntaxHighlighter style={{}} customStyle={{background: "transparent"}} language="yaml">
                  {`AWSTemplateFormatVersion: "2010-09-09"
                    
Description: >-
  This template creates a loadbalancer for 2 instances in a private network          
Parameters:
  VPCName:
    Description: The name of the VPC being created.
    Type: String
    Default: my-vpc
  
  AL2023AMI:
    Type: AWS::SSM::Parameter::Value<AWS::EC2::Image::Id>
    Default: /aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64

Mappings:
  SubnetConfig:
    VPC:
      CIDR: 10.0.0.0/16
    Public1:
      CIDR: 10.0.1.0/28
    Public2:
      CIDR: 10.0.2.0/28
    Private:
      CIDR: 10.0.3.0/28
  
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      EnableDnsSupport: "true"
      EnableDnsHostnames: "true"
      CidrBlock: !FindInMap
        - SubnetConfig
        - VPC
        - CIDR
      Tags:
        - Key: Name
          Value: !Ref VPCName

  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select
        - 0
        - !GetAZs
      CidrBlock: !FindInMap
        - SubnetConfig
        - Public1
        - CIDR
      Tags:
        - Key: Name
          Value: public-subnet-1

  PublicSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select
        - 1
        - !GetAZs
      CidrBlock: !FindInMap
        - SubnetConfig
        - Public2
        - CIDR
      Tags:
        - Key: Name
          Value: public-subnet-2

  PrivateSubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select
        - 0
        - !GetAZs
      CidrBlock: !FindInMap
        - SubnetConfig
        - Private
        - CIDR
      Tags:
        - Key: Name
          Value: private-subnet
                    `}
                   </SyntaxHighlighter>
                  </ReadMore>
                </div>
              </div>
            </div>
          </ProjectSection>
    )
}