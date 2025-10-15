export function Hero(){
    return(
      <>
        <div className="top-4 z-40 max-w-[calc(100vw-2rem)] backdrop-blur-sm px-3 py-2">
            <p className="text-xs text-muted-hero text-center">
              Last updated: <span className="font-medium text-foreground">15th October, 2025</span>
            </p>
        </div>
        <section className="gradient-bg py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
              Secure Multi-VPC Cloud Architecture with VPC Peering
            </h1>
            <p className="text-sm sm:text-lg text-primary mb-10 text-pretty max-w-2xl mx-auto">
              Building a Secure Jump-Point to Connect Development to Production.            </p>
            <p className="font-mono text-left text-xs sm:text-sm text-muted-hero mb-8 text-pretty max-w-2xl mx-auto">
              This project was developed within a lab environment that automatically terminates 
              all resources when lab timer lapses. To ensure continuity,
               I created an Infrastructure as Code (IaC) solution using CloudFormation. 
               This allowed me to quickly redeploy the entire stack when the lab is restarted and pick up from where
                I left off without any manual reconfiguration.
            </p>
            
            <div className="px-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open("https://github.com/dickson-ank/private-instances-attach-load-balancer/blob/main/cloudformation/cloudformation.yaml", "_blank")}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                View CloudFormation Code
              </button>
            </div>
          </div>
        </section>
      </>
    )
}