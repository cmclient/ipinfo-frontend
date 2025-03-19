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

      <div className="flex items-center justify-center w-full">
        <Alert
          color="primary"
          title="Rate Limit"
          description="You can make up to 1000 requests per 24 hours. Bypassing limits or engaging in spam is strictly forbidden."
        />
      </div>

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

      {!loading && (
        <div className="space-y-4">
          <Card>
            <CardBody>
              <h2>Endpoint</h2>
              <Code>
                GET https://api.spacehost.me:2087/search/:ip?/:prettyPrint?
              </Code>
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
                        <li>
                          Description:{" "}
                          <Chip>The IP address used to fetch data</Chip>
                        </li>
                        <li>
                          Default:{" "}
                          <Chip color="primary">{userIp} (your IP)</Chip>
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
                        <li>
                          Description:{" "}
                          <Chip>Formats output for readability</Chip>
                        </li>
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
                &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;ip&quot;: &quot;83.21.70.1&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;hostname&quot;:
                &quot;83.21.70.1.ipv4.supernova.orange.pl&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;city&quot;: &quot;Poznań&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;region&quot;: &quot;Greater
                Poland&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;country&quot;: &quot;PL&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;loc&quot;:
                &quot;52.4069,16.9299&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;org&quot;: &quot;AS5617 Orange
                Polska Spolka Akcyjna&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;postal&quot;: &quot;61-101&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;timezone&quot;:
                &quot;Europe/Warsaw&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;is_anycast&quot;: false,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;is_mobile&quot;: false,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;is_anonymous&quot;: false,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;is_satellite&quot;: false,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;is_hosting&quot;: false,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;asn&quot;: &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;asn&quot;:
                &quot;AS5617&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:
                &quot;Orange Polska Spolka Akcyjna&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;domain&quot;:
                &quot;orange.pl&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;route&quot;:
                &quot;83.16.0.0/13&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;type&quot;:
                &quot;isp&quot;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&#125;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;company&quot;: &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:
                &quot;Orange Polska Spolka Akcyjna&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;domain&quot;:
                &quot;orange.com&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;type&quot;:
                &quot;isp&quot;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&#125;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;privacy&quot;: &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;detected&quot;:
                false,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;vpn&quot;:
                false,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;proxy&quot;:
                false,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;tor&quot;:
                false,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;relay&quot;:
                false,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;hosting&quot;:
                false,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;service&quot;:
                &quot;&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&#125;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;abuse&quot;: &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;address&quot;:
                &quot;Orange Polska S.A., Jerozolimskie 160, 02-326 Warsaw&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;country&quot;:
                &quot;PL&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;email&quot;:
                &quot;cert.opl@orange.com&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:
                &quot;OPL - Hostmaster&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;network&quot;:
                &quot;83.21.0.0/16&quot;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;phone&quot;:
                &quot;+48 800 120810&quot;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&#125;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;domains&quot;: &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;page&quot;:
                0,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;total&quot;:
                0,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;domains&quot;:
                []
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&#125;,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;isLimited&quot;: false
                <br />
                &#125;
              </Code>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h2>Error Responses</h2>
              <Divider />
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>400 Bad Request</strong>:{" "}
                  <Code>
                    &#123; &quot;error&quot;: &quot;Invalid IP format or unable
                    to detect IP&quot; &#125;
                  </Code>
                </li>
                <li>
                  <strong>429 Too Many Requests</strong>:{" "}
                  <Code>
                    &#123; &quot;error&quot;: &quot;Rate limit exceeded. Try
                    again later&quot; &#125;
                  </Code>
                </li>
                <li>
                  <strong>500 Internal Server Error</strong>:{" "}
                  <Code>
                    &#123; &quot;error&quot;: &quot;Unexpected server error.
                    Please try again later&quot; &#125;
                  </Code>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
