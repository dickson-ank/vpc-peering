import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ImageContainer } from "../custom-image-container";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";
import ReadMore from "../read-more-less";
import Note from "../note";

interface Step2Props {
    setSelectedImage: (src: string) => void
}

export function Step2({setSelectedImage}: Step2Props){
    return(
        <ProjectSection id="step-2" title="Step 2: Routing" onImageClick={setSelectedImage}>
            <Paragraph>
              While still in the VPC Dashboard we'll create and configure three route tables. <br />
              The purpose of routing 
              is to control the traffic flow between the subnets, 
              or between the subnets and the internet
            </Paragraph>

            <Paragraph>
              What we'll create: <br />
              • A Route Table for the Public Subnet in Production with routes to an Internet Gateway to enable internet access. <br />
              • Another Route Table for the Public Subnet in Development with routes to it's own Internet Gateway to enable internet access. <br />
              • A Route Table for the Private Subnet with a route to the VPC Peering connection<br />
            </Paragraph>

            <Paragraph>
              That means the route tables have dependencies on Internet Gateways so let's create them first
              before we move on<br />
              Choose "Internet gateways" from the sidebar and click on 
              <span className="text-primary font-semibold"> Create Internet Gateway</span>.<br />
              • Name it "prod-igw" <br />
              and 
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">
                Create internet gateway
              </span>.<br /> <br />
            </Paragraph>

            <Paragraph>Select <span className="text-primary font-semibold">Attach to VPC </span>
             from the green pop-up and select the VPC ("prod-vpc").
             </Paragraph>
            <ImageContainer src="./igw-attach.jpeg" alt="Internet gateway attach" selectedImage={setSelectedImage} />

            <Paragraph>
              Create the second Internet Gateway call it "dev-igw" and attach it to "dev-vpc"
            </Paragraph>
            

            <Paragraph>
              Now that we have both Internet Gateways created, we can create the route tables
              Open "Route Tables" from the side menu <br />
              <span className="text-primary font-semibold">• Create Route Table.</span><br />
              • We'll name it "prod-public-rtb" and associate it with the prod-vpc. <br />
              • <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Create route table</span>
            </Paragraph>
            <ImageContainer className="mt-1" src="./public-rt-create.jpeg" alt="Public route table create" selectedImage={setSelectedImage} />

            <Paragraph>
              You'll be redirected to the dashboard of the just created route table<br />
              There, select the "Routes" tab. Click on <span className="text-primary font-semibold"> Edit routes </span>
               and then <span className="text-primary font-semibold"> Add route</span>. <br />
              • Set the destination to <span className="font-mono text-primary">0.0.0.0/0</span> and the target to the production Internet Gateway("prod-igw")<br />
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Save changes</span>
            </Paragraph>
            <ImageContainer className="mt-1" src="./public-rt-route.jpeg" alt="Public route table route" selectedImage={setSelectedImage} />

            <Paragraph>
              We need to associate this route table with the public subnet so that it's reachable from the internet.<br />
              • Select the "Subnet associations" tab and <span className="text-primary font-semibold">Edit subnet associations</span>.<br />
              • Select the public subnet ("prod-public-subnet) <br />
              <span className="text-black text-sm font-semibold px-2 py-0 bg-aws rounded-2xl">Save associations</span>
            </Paragraph>
            <ImageContainer className="mt-1" src="./public-rt-assoc.jpeg" alt="Public route table association" selectedImage={setSelectedImage} />

            <Paragraph>
              We repeat the process to create route tables for the prod private subnet and dev public subnet<br />
              Prod Private Route Table: <br />
              • Name: "prod-private-rtb" and associate it with the prod-vpc as well <br />
              • Don't set any routes yet as this subnet is private and can only relate with other subnets internally <br />
              <span className="block text-sm md:text-sm lg:text-sm sm:text-sm ml-4">
                we'll come back to add a route to the VPC Peering Connection later</span>
              • In the "Subnet associations" tab, associate the prod private subnet
              ("prod-private-subnet) with this route table.<br /> <br />

              Dev Public Route Table: <br />
              • Name: "dev-public-rtb" and associate it with the dev-vpc. <br />
              • Set a route with destination <span className="font-mono text-primary">0.0.0.0/0</span> and target to the development Internet Gateway("dev-igw")<br />  <br />
              <span className="block text-sm md:text-sm lg:text-sm sm:text-sm ml-4">
                we'll come back to add a route to the VPC Peering Connection later</span>
              • In the "Subnet associations" tab, associate the prod private subnet
              ("prod-private-subnet) with this route table.<br />
            </Paragraph>
            
            <Paragraph>
              If everything is done correctly the VPC resource map should look like this. <br />
              The additional route table was created by default by the lab environment I used. It doesn't affect anything
            </Paragraph>
            <ImageContainer className="mt-1" src="./vpc-resource-map.jpeg" alt="VPC resource map" selectedImage={setSelectedImage} />
            
            <Note grid={true} 
              note1={
                    <>- A NAT Gateway must always be in a public subnet <br />
                      - Private subnets should not have a direct route to the Internet Gateway, they only interact with the internet
                      for their needs through the NAT Gateway <br />
                    </>
                }
              
              note2={
              <>- Ensure that the route tables are correctly associated with their respective subnets <br />
                - Double-check the CIDR blocks to avoid overlaps and ensure proper segmentation <br />
              </>
            }
            />


            <div className="space-y-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Cloudformation Code for Step 2 - (Routing)</h3>
                <p className="text-xs text-muted-foreground sm:text-xs md:text-xs lg:text-xs mb-2">The part of the Cloudformation code that creates the IGW, 
                  NAT Gateway and Route Tables as discussed above<br/>
                Uploading only this part to Cloudformation will fail to create unless the VPC and Subnets from Step 1 are already created <br />
                Append this code to the code from Step 1 to make it work, and ensure the indentations are correct
                </p>
                <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto mb-4">
                  <ReadMore>
                    <SyntaxHighlighter style={{}} customStyle={{background: "transparent"}} language="yaml">
                      {`# Resources: ...

# VPC and Subnets section  
#    ....


# Routing section

  InternetGateway:
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags:
        - Key: Name
          Value: my-igw

  GatewayToInternet:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref VPC
      InternetGatewayId: !Ref InternetGateway
      
  ElasticIP:
    Type: AWS::EC2::EIP
    Properties:
      Domain: vpc
      Tags:
        - Key: Name
          Value: ngw-eip

  NATGateway:
    Type: AWS::EC2::NatGateway
    Properties:
      AllocationId: !GetAtt ElasticIP.AllocationId
      SubnetId: !Ref PublicSubnet1
      Tags:
        - Key: Name
          Value: my-ngw

  PublicRouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: public-rtb

  PublicRoute:
    Type: AWS::EC2::Route
    DependsOn: GatewayToInternet
    Properties:
      RouteTableId: !Ref PublicRouteTable
      DestinationCidrBlock: 0.0.0.0/0
      GatewayId: !Ref InternetGateway

  PublicSubnet1RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PublicSubnet1
      RouteTableId: !Ref PublicRouteTable

  PublicSubnet2RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PublicSubnet2
      RouteTableId: !Ref PublicRouteTable


  PrivateRouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: private-rtb

  PrivateRouteToNAT:
    Type: AWS::EC2::Route
    Properties:
      RouteTableId: !Ref PrivateRouteTable
      DestinationCidrBlock: 0.0.0.0/0
      NatGatewayId: !Ref NATGateway
  
  PrivateSubnetRouteTableAssociation1:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PrivateSubnet
      RouteTableId: !Ref PrivateRouteTable
      
              `}
              </SyntaxHighlighter>
            </ReadMore>
                  </div>
              </div>
            </div>
        </ProjectSection>
    )
}