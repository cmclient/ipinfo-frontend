"use client";

import { useState, useEffect } from "react";
import { Alert } from "@heroui/alert";
import { Input } from "@heroui/input";
import { Tooltip } from "@heroui/tooltip";
import { Chip } from "@heroui/chip";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { SearchIcon } from "@/components/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { siteConfig } from "@/config/site";
import { Code, Divider } from "@heroui/react";

export default function Home() {
  const [ipData, setIpData] = useState<any>(null);
  const [userIp, setUserIp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  const [errorObject, setErrorObject] = useState<Error | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const [browserDetails, setBrowserDetails] = useState<any>({
    browser: "",
    operatingSystem: "",
    device: "",
    screenResolution: "",
    windowResolution: "",
    preferredLanguage: "",
    referrer: "",
    userAgent: ""
  });

  useEffect(() => {
    const fetchUserIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIp(data.ip);
        setInputValue(data.ip);
        fetchIpData(data.ip);
      } catch (error) {
        setLoading(false);
        setErrorTitle("Failed to fetch your IP address");
        setErrorObject(error instanceof Error ? error : new Error("Unknown error"));
      }
    };

    fetchUserIp();
  }, []);

  const fetchIpData = async (ip: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.spacehost.me:2087/search/${ip}`);
      const data = await response.json();
      if (response.status !== 200) {
        setIpData(null);
        setLoading(false);
        setErrorTitle(`Failed to fetch IP data (${response.status})`);
        setErrorObject(new Error(data?.error ?? "Unknown error"));
        return;
      }
      setIpData(data);
      setLoading(false);
      setErrorTitle(null);
      setErrorObject(null);
    } catch (error) {
      setIpData(null);
      setLoading(false);
      setErrorTitle("Failed to fetch IP data");
      setErrorObject(error instanceof Error ? error : new Error("Unknown error"));
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (inputValue.trim()) fetchIpData(inputValue.trim());
  };

  const handleMyIpClick = () => {
    if (!userIp) return;
    setInputValue(userIp);
    fetchIpData(userIp);
  };

  useEffect(() => {
    const getOperatingSystem = (platform: string) => {
      if (/Win/.test(platform)) return "Windows";
      if (/Mac/.test(platform)) return "macOS";
      if (/Linux/.test(platform)) return "Linux";
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) return "iOS";
      if (/Android/.test(navigator.userAgent)) return "Android";
      return platform;
    };
  
    const getBrowserName = (userAgent: string) => {
      if (/Chrome/.test(userAgent) && !/Edge/.test(userAgent) && !/Opera/.test(userAgent)) return "Google Chrome";
      if (/Firefox/.test(userAgent)) return "Mozilla Firefox";
      if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) return "Apple Safari";
      if (/Edge/.test(userAgent)) return "Microsoft Edge";
      if (/Opera/.test(userAgent)) return "Opera";
      return "Unknown";
    };
  
    const getDeviceType = () => {
      const userAgent = navigator.userAgent;
      
      if (/Mobi|Android/i.test(userAgent)) {
        return "Mobile";
      } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        return "Mobile";
      } else {
        return "Desktop";
      }
    };
  
    setBrowserDetails({
      browser: getBrowserName(navigator.userAgent),
      operatingSystem: getOperatingSystem(navigator.platform),
      device: getDeviceType(),
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      windowResolution: `${window.innerWidth}x${window.innerHeight}`,
      preferredLanguage: navigator.language,
      referrer: document.referrer || "None",
      userAgent: navigator.userAgent,
    });
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
      <div className="flex flex-col items-center text-center max-w-xl mx-auto">
        <Icon fontSize="64px" icon="ri:search-2-line" />
        <h1 className="text-3xl font-bold">IP Info</h1>
        <p className="text-xl text-muted mt-2">Find accurate data about any IP address</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 items-center w-full max-w-lg">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-12",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type IP address..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Button color="primary" variant="shadow" type="submit">
          Search
        </Button>
        <Button color="danger" variant="shadow" onClick={handleMyIpClick}>
          My IP
        </Button>
      </form>

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

      {ipData && (
        <div className="flex flex-wrap justify-center gap-6 mt-8 w-full max-w-5xl">
          {/* Limited Alert */}
          {ipData.isLimited && (
            <Alert color="primary" title="Rate limit exceeded" description="Due to an exceeded rate limit some IP details may be unavailable" />
          )}

          {/* IP Address Card */}
          <Card className="w-80 bg-base-100 shadow-xl">
            <div className="card-body flex flex-col items-center">
              <Icon fontSize={32} icon="mdi:computer" />
              <h3 className="card-title">IP Address</h3>
              <p className="text-lg font-semibold">{ipData.ip}</p>
            </div>
          </Card>

          {/* Location Card */}
          <Card className="w-80 bg-base-100 shadow-xl">
            <div className="card-body flex flex-col items-center">
              <Icon fontSize={32} icon="ri:map-pin-2-fill" />
              <h3 className="card-title">Location</h3>
              <p>{ipData.city || "Unknown"} {ipData.region ?? ""}</p>
              <p>{ipData.country || "Unknown"}</p>
            </div>
          </Card>

          {/* Hostname Card */}
          {ipData.hostname && (
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="mdi:internet" />
                <h3 className="card-title">Hostname</h3>
                <p>{ipData.hostname}</p>
              </div>
            </Card>
          )}

          {/* Timezone Card */}
          <Card className="w-80 bg-base-100 shadow-xl">
            <div className="card-body flex flex-col items-center">
              <Icon fontSize={32} icon="mdi:globe" />
              <h3 className="card-title">Timezone</h3>
              <p>{ipData.timezone || "Unknown"}</p>
            </div>
          </Card>

          {/* ISP Card */}
          <Card className="w-80 bg-base-100 shadow-xl">
            <div className="card-body flex flex-col items-center">
              <Icon fontSize={32} icon="mdi:server-network" />
              <h3 className="card-title">ISP</h3>
              <p>{ipData.org || "Unknown"}</p>
            </div>
          </Card>

        </div>
      )}

      {ipData && (
        <div className="flex flex-wrap justify-center gap-6 mt-8 w-full max-w-5xl">
          {/* ASN Card */}
          {ipData.asn && !ipData.isLimited && (
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="ri:user-3-fill" />
                <h3 className="card-title">ASN</h3>
                <Tooltip content={`${ipData.asn.name}\n${ipData.asn.domain}\n${ipData.asn.route}\n${ipData.asn.type}`}>
                  <Button>{ipData.asn.asn || "Unknown"}</Button>
                </Tooltip>
              </div>
            </Card>
          )}

          {/* Company Card */}
          {ipData.company && !ipData.isLimited && (
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="mdi:company" />
                <h3 className="card-title">Company</h3>
                <Tooltip content={`${ipData.company.domain}\n${ipData.company.type}\n`}>
                  <Button>{ipData.company.name || "Unknown"}</Button>
                </Tooltip>
              </div>
            </Card>
          )}

          {/* Spam Card */}
          {ipData.privacy && !ipData.isLimited && (
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="ri:fire-fill" />
                <h3 className="card-title">Spam</h3>
                <Tooltip
                  content={
                    <ul className="space-y-1">
                      {["vpn", "proxy", "tor", "relay", "hosting"].map((key) => (
                        <li key={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                          <Chip color={ipData.privacy[key] ? "success" : "danger"}>
                            {ipData.privacy[key] ? "Yes" : "No"}
                          </Chip>
                        </li>
                      ))}
                      {ipData.privacy.service && (
                        <li key="service">
                          Service: <Chip color="success">{String(ipData.privacy.service)}</Chip>
                        </li>
                      )}
                    </ul>
                  }
                >
                  <Chip
                    color={
                      ["vpn", "proxy", "tor", "relay", "hosting"].some((key) => ipData.privacy[key])
                        ? "danger"
                        : "success"
                    }
                  >
                    {["vpn", "proxy", "tor", "relay", "hosting"].some((key) => ipData.privacy[key])
                      ? "Detected"
                      : "Undetected"}
                  </Chip>
                </Tooltip>
              </div>
            </Card>
          )}

          {/* Abuse Card */}
          {ipData.abuse && !ipData.isLimited && (
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="mdi:shield-alert" />
                <h3 className="card-title">Abuse</h3>
                <Tooltip content={`${ipData.abuse.address}\n${ipData.abuse.country}\n${ipData.abuse.email}\n${ipData.abuse.phone}`}>
                  <Button>{ipData.abuse.name || "Unknown"}</Button>
                </Tooltip>
              </div>
            </Card>
          )}

          {/* Domains Card */}
          {ipData.domains && ipData.domains.total > 0 && !ipData.isLimited && (
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="mdi:web" />
                <h3 className="card-title">Domains</h3>

                <Tooltip content={ipData.domains.domains.map((domain: string, index: number) => (
                  <li key={index}>{domain}</li>
                ))}>
                  <Button>{ipData.domains.total} total domains</Button>
                </Tooltip>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Browser Details */}
      {userIp && ipData?.ip === userIp && (
        <><>
          <Divider />

          <div className="flex flex-col items-center text-center max-w-xl mx-auto">
            <Icon fontSize="64px" icon="ri:computer-fill" />
            <h1 className="text-3xl font-bold">Browser details</h1>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8 w-full max-w-5xl">
            {/* Browser Card */}
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="ri:window-2-fill" />
                <h3 className="card-title">Browser</h3>
                <p className="text-lg font-semibold">{browserDetails.browser}</p>
              </div>
            </Card>

            {/* Device Card */}
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="ri:device-fill" />
                <h3 className="card-title">Device</h3>
                <p className="text-lg font-semibold">{browserDetails.device}</p>
              </div>
            </Card>

            {/* Operating System Card */}
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="ri:windows-fill" />
                <h3 className="card-title">Operating System</h3>
                <p className="text-lg font-semibold">{browserDetails.operatingSystem}</p>
              </div>
            </Card>

            {/* Screen Resolution Card */}
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="ri:fullscreen-line" />
                <h3 className="card-title">Screen Resolution</h3>
                <p className="text-lg font-semibold">{browserDetails.screenResolution}</p>
              </div>
            </Card>

            {/* Window Resolution Card */}
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="ri:aspect-ratio-line" />
                <h3 className="card-title">Window Resolution</h3>
                <p className="text-lg font-semibold">{browserDetails.windowResolution}</p>
              </div>
            </Card>

            {/* Preferred Language Card */}
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="mdi:language" />
                <h3 className="card-title">Preferred Language</h3>
                <p className="text-lg font-semibold">{browserDetails.preferredLanguage}</p>
              </div>
            </Card>

            {/* Referrer Card */}
            {browserDetails.referrer && browserDetails.referrer !== "None" && (
              <Card className="w-80 bg-base-100 shadow-xl">
                <div className="card-body flex flex-col items-center">
                  <Icon fontSize={32} icon="ri:links-fill" />
                  <h3 className="card-title">Referrer</h3>
                  <p className="text-lg font-semibold">{browserDetails.referrer}</p>
                </div>
              </Card>
            )}

            {/* User Agent Card */}
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="ri:information-fill" />
                <h3 className="card-title">User Agent</h3>
                <Tooltip content={browserDetails.userAgent}>
                  <Code>{browserDetails.userAgent}</Code>
                </Tooltip>
              </div>
            </Card>
          </div>
        </></>
      )}

      <div className="mt-8">
        <a
          href={siteConfig.links.docs}
          className="btn btn-primary shadow-lg"
        >
          Documentation
        </a>
        <a
          href={siteConfig.links.github}
          className="btn btn-bordered shadow-lg ml-4"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
