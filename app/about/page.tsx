import { Card, CardHeader, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";
import { Alert } from "@heroui/alert";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
      <div className="flex flex-col items-center text-center max-w-xl mx-auto">
        <Icon fontSize="64px" icon="mdi:information-outline" />
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-base text-muted mt-2">
          IP Info provides accurate IP data like location, ISP, and more, helping you make better online decisions.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-8 w-full max-w-5xl">
        <Card className="w-80 bg-base-100 shadow-xl">
          <CardHeader>
            <h3 className="text-lg font-semibold">Our Mission</h3>
          </CardHeader>
          <CardBody>
            <p>
              Our mission is simple: to give you reliable, accurate IP data so you can make better decisions online.
            </p>
          </CardBody>
        </Card>

        <Card className="w-80 bg-base-100 shadow-xl">
          <CardHeader>
            <h3 className="text-lg font-semibold">Get in Touch</h3>
          </CardHeader>
          <CardBody>
            <p>
              Got questions or need help? Reach out to us at{" "}
              <a href="mailto:support@cmclient.pl" className="text-blue-600">
                support@cmclient.pl
              </a>.
            </p>
          </CardBody>
        </Card>
      </div>

      <div className="flex items-center justify-center w-full">
        <Alert
          color="primary"
          title="Usage Policy"
          description="No automated use, spam, or illegal stuff allowed. We want to keep things safe and fair for everyone."
        />
      </div>

      <div className="mt-8 flex gap-4 justify-center">
        <a href={siteConfig.links.docs} className="btn btn-primary shadow-lg">
          Documentation
        </a>
        <a href={siteConfig.links.github} className="btn btn-bordered shadow-lg">
          GitHub
        </a>
      </div>
    </section>
  );
}
