import { ImageContainer } from "../custom-image-container";
import { Paragraph } from "../paragraph";
import { ProjectSection } from "../project-section";


interface Step6Props {
    setSelectedImage: (src: string) => void
}

export function Step6({setSelectedImage}: Step6Props){
    return(
        <ProjectSection id="step-6" title="Step 6: Testing" onImageClick={setSelectedImage}>
            <Paragraph>
              In this final step, we will test the entire setup to ensure that all components are functioning correctly.
               We will verify that the Bastion in the development environment can ssh into the private instance in the
                production environment
                 <br />
            </Paragraph>

            <div className="space-y-6 mt-6">
              <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                <p className="text-xs sm:text-sm text-muted-foreground text-pretty mb-4">
                  Make sure your key pair file has the right permissions set. <br /> <br />
                  Run this command to do so: <br /></p>
                  <div className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm">
                  <div className="text-muted-foreground mb-1">
                    chmod 400 YOUR-KEY-PAIR.pem
                  </div>
                </div>
              </div>
            </div>
            

            <Paragraph>
              Upload your Key Pair .pem file to the dev bastion so you can use it to ssh into the prod private instance <br />
              Run the command below to do that(make sure the key pair file is in the current working directory): <br /> <br />
              <span className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm block w-fit">
                <span className="text-muted-foreground mb-1 block">scp -i YOUR-KEY-PAIR.pem YOUR-KEY-PAIR.pem ec2-user@DEV-BASTION-PUBLIC-IP:~/</span>
              </span> 
              Note that the repetition of "YOUR-KEY-PAIR.pem" isn't a mistake<br />
              <br />
              Let's try to ssh into the private instance from the dev bastion <br />
              <span className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm block w-fit">
                <span className="text-muted-foreground mb-1 block">ssh -i YOUR-KEY-PAIR.pem ec2-user@ENI-PRIVATE-IP</span>
              </span> <br />
            </Paragraph>
            <ImageContainer src="./ssh-into-instance.png" 
            alt="SSH into the App server instance from the Bastion Host" selectedImage={setSelectedImage}/>

            <Paragraph>
               We have confirmed the whole setup is working as expected! <br />
            </Paragraph>

            <Paragraph>
              You can run further tests on your own to verify if the security groups are working as intended <br />
              For example try to send http requests to the site on a different port (eg, 54322) to see if it will respond or not <br />
              You can also try to ssh into the instances directly using their private IPs to see if it will work or not <br />
            </Paragraph>
            <h4 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold text-foreground mb-4 text-balance">
               Congratulations!</h4>
            That's all about it, we've been able to successfully complete the design
            <ImageContainer src="./vpc-peering-topology.png" alt="Topology Diagram" selectedImage={setSelectedImage} />
        </ProjectSection>
    )
}






























               
 