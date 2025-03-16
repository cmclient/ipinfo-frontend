"use client";

import { useState, useEffect } from "react";
import { Alert } from "@heroui/alert";
import { title } from "@/components/primitives";
import { Card, CardBody } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import { Code } from "@heroui/code";
import { Divider } from "@heroui/divider";
import { Tooltip } from "@heroui/tooltip";
import { Chip } from "@heroui/chip";

export default function DocsPage() {
  const [userIp, setUserIp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  const [errorObject, setErrorObject] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIp(data.ip);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrorTitle("Failed to fetch your IP address");
        setErrorObject(error instanceof Error ? error : new Error("Unknown error"));
      }
    };

    fetchUserIp();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className={`${title()} mb-6`}>API Documentation</h1>

      {/* Show error message if there is an error */}
      {errorTitle && errorObject && (
        <div className="mt-8">
          <Alert
            color="danger"
            title={errorTitle}
            description={errorObject.message || "An unknown error occurred"}
          />
        </div>
      )}

      {/* Show loading indicator if fetching IP data */}
      {loading && (
        <div className="mt-8">
          <Spinner />
        </div>
      )}

      <div className="flex items-center justify-center w-full">
        <Alert
          color="primary"
          title="Rate Limit"
          description="You can make up to 1000 requests per 24 hours. Bypassing limits or engaging in spam is strictly forbidden."
        />
      </div>

      {!loading && (
        <div className="space-y-4">
          <Card>
            <CardBody>
              <h2>Endpoint</h2>
              <Code>GET https://api.spacehost.me:2087/search/:ip?/:prettyPrint?</Code>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h2>Parameters</h2>
              <Divider />
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <Tooltip
                    content={
                      <ul>
                        <li>Description: <Chip>The IP address used to fetch data</Chip></li>
                        <li>
                          Default: <Chip color="primary">{userIp} (your IP)</Chip>
                        </li>
                        <li>
                          Optional: <Chip color="success">yes</Chip>
                        </li>
                      </ul>
                    }
                  >
                    <Chip color="primary">ip</Chip>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip
                    content={
                      <ul>
                        <li>Description: <Chip>Formats output for readability</Chip></li>
                        <li>
                          Default: <Chip color="danger">false</Chip>
                        </li>
                        <li>
                          Optional: <Chip color="success">yes</Chip>
                        </li>
                      </ul>
                    }
                  >
                    <Chip color="primary">prettyPrint</Chip>
                  </Tooltip>
                </li>
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h2>Response</h2>
              <Divider />
              <li>Returns IP data in JSON format</li>
              <Code>
                &#123;<br />
                &emsp;&quot;ip&quot;: &quot;141.95.202.239&quot;,<br />
                &emsp;&quot;hostname&quot;: &quot;fr-gra01-e1.spacehost.me&quot;,<br />
                &emsp;&quot;city&quot;: &quot;Calais&quot;,<br />
                &emsp;&quot;region&quot;: &quot;Hauts-de-France&quot;,<br />
                &emsp;&quot;country&quot;: &quot;FR&quot;,<br />
                &emsp;&quot;loc&quot;: &quot;50.9519,1.8563&quot;,<br />
                &emsp;&quot;org&quot;: &quot;AS16276 OVH SAS&quot;,<br />
                &emsp;&quot;postal&quot;: &quot;62100&quot;,<br />
                &emsp;&quot;timezone&quot;: &quot;Europe/Paris&quot;,<br />
                &emsp;&quot;is_anycast&quot;: false,<br />
                &emsp;&quot;is_mobile&quot;: false,<br />
                &emsp;&quot;is_anonymous&quot;: false,<br />
                &emsp;&quot;is_satellite&quot;: false,<br />
                &emsp;&quot;is_hosting&quot;: true,<br />
                &emsp;&quot;asn&quot;: &#123;<br />
                &emsp;&emsp;&quot;asn&quot;: &quot;AS16276&quot;,<br />
                &emsp;&emsp;&quot;name&quot;: &quot;OVH SAS&quot;,<br />
                &emsp;&emsp;&quot;domain&quot;: &quot;ovhcloud.com&quot;,<br />
                &emsp;&emsp;&quot;route&quot;: &quot;141.95.128.0/17&quot;,<br />
                &emsp;&emsp;&quot;type&quot;: &quot;hosting&quot;<br />
                &emsp;&#125;,<br />
                &emsp;&quot;company&quot;: &#123;<br />
                &emsp;&emsp;&quot;name&quot;: &quot;OVH SAS&quot;,<br />
                &emsp;&emsp;&quot;domain&quot;: &quot;ovh.net&quot;,<br />
                &emsp;&emsp;&quot;type&quot;: &quot;hosting&quot;<br />
                &emsp;&#125;,<br />
                &emsp;&quot;privacy&quot;: &#123;<br />
                &emsp;&emsp;&quot;vpn&quot;: false,<br />
                &emsp;&emsp;&quot;proxy&quot;: false,<br />
                &emsp;&emsp;&quot;tor&quot;: false,<br />
                &emsp;&emsp;&quot;relay&quot;: false,<br />
                &emsp;&emsp;&quot;hosting&quot;: true,<br />
                &emsp;&emsp;&quot;service&quot;: &quot;&quot;<br />
                &emsp;&#125;,<br />
                &emsp;&quot;abuse&quot;: &#123;<br />
                &emsp;&emsp;&quot;address&quot;: &quot;OVH SAS, 2 Rue Kellermann, 59100 ROUBAIX, FRANCE&quot;,<br />
                &emsp;&emsp;&quot;country&quot;: &quot;FR&quot;,<br />
                &emsp;&emsp;&quot;email&quot;: &quot;abuse@ovh.net&quot;,<br />
                &emsp;&emsp;&quot;name&quot;: &quot;Abuse-C Role&quot;,<br />
                &emsp;&emsp;&quot;network&quot;: &quot;141.95.202.0/24&quot;,<br />
                &emsp;&emsp;&quot;phone&quot;: &quot;&quot;<br />
                &emsp;&#125;,<br />
                &emsp;&quot;domains&quot;: &#123;<br />
                &emsp;&emsp;&quot;page&quot;: 0,<br />
                &emsp;&emsp;&quot;total&quot;: 0,<br />
                &emsp;&emsp;&quot;domains&quot;: &#91;&#93;<br />
                &emsp;&#125;,<br />
                &emsp;&quot;isLimited&quot;: false,<br />
                &emsp;&quot;tokenDetails&quot;: &#123;<br />
                &emsp;&emsp;&quot;core&quot;: &#123;<br />
                &emsp;&emsp;&emsp;&quot;daily&quot;: 2147483647,<br />
                &emsp;&emsp;&emsp;&quot;monthly&quot;: 50000<br />
                &emsp;&emsp;&#125;,<br />
                &emsp;&emsp;&quot;hostio&quot;: &#123;<br />
                &emsp;&emsp;&emsp;&quot;daily&quot;: 2147483647,<br />
                &emsp;&emsp;&emsp;&quot;monthly&quot;: 1000,<br />
                &emsp;&emsp;&emsp;&quot;result_limit&quot;: 5<br />
                &emsp;&emsp;&#125;<br />
                &#125;
              </Code>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h2>Error Responses</h2>
              <Divider />
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>400 Bad Request</strong>: <Code>&#123; &quot;error&quot;: &quot;Invalid IP format or unable to detect IP&quot; &#125;</Code></li>
                <li><strong>429 Too Many Requests</strong>: <Code>&#123; &quot;error&quot;: &quot;Rate limit exceeded. Try again later&quot; &#125;</Code></li>
                <li><strong>500 Internal Server Error</strong>: <Code>&#123; &quot;error&quot;: &quot;Unexpected server error. Please try again later&quot; &#125;</Code></li>
              </ul>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
