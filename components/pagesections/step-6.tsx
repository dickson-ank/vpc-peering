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
               We will verify that the Load Balancer can respond to requests, 
               and also test if it can connect to the instances via ssh <br />
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
              <br />
              Open a browser and run <span className="text-primary"> http://ALB-DNS-NAME/  </span> 
              and you see the hostname of the instance the Load balancer routed the request to <br />
              Note that if you run https insted of http it will not work because of the rules in the secuirty <br />
            </Paragraph>
            <ImageContainer src="./webpage-served-by-first-host.png" 
            alt="Webpage served by the web server" selectedImage={setSelectedImage}/>

            <Paragraph>
              Refresh the page a few more times until the Hostname changes to that of the second instance <br />
            </Paragraph>
            <ImageContainer src="./webpage-hostname-change.png" 
            alt="SSH into the Bastion Host instance" selectedImage={setSelectedImage}/> 

            <Paragraph>
              Confirmed! the Load Balancer is working as expected. <br /> <br />
              Let's try to ssh into either of the instances through the Load Balancer <br />
              <span className="bg-muted p-3 sm:p-4 rounded font-mono text-xs sm:text-sm block w-fit">
                <span className="text-muted-foreground mb-1 block">ssh -i YOUR-KEY-PAIR.pem ec2-user@ALB-DNS-NAME</span>
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
            <ImageContainer src="./private-attach-elb-topology.png" alt="Topology Diagram" selectedImage={setSelectedImage} />
        </ProjectSection>
    )
}






























               
 