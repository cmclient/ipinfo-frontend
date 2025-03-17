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
import { Divider } from "@heroui/react";
import { addToast } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";

export default function Home() {
  const [ipData, setIpData] = useState<any>(null);
  const [userIp, setUserIp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  const [errorObject, setErrorObject] = useState<Error | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAction = (key: any) => {
    if (!ipData || !ipData.ip) return;

    let textToCopy = key === "copy-ip" ? ipData.ip : JSON.stringify(ipData, null, 2);
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        addToast({
          title: "Clipboard",
          description: `${key === "copy-ip" ? "IP address" : "IP details"} copied to clipboard`,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      })
      .catch(() => {
        addToast({
          color: "danger",
          title: "Clipboard",
          description: `Failed to copy ${key === "copy-ip" ? "IP address" : "IP details"} to clipboard`,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      });
  };

  const countryNames: { [key: string]: string } = {
    "AF": "Afghanistan",
    "AX": "Aland Islands",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua and Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BQ": "Bonaire, Sint Eustatius and Saba",
    "BA": "Bosnia and Herz.",
    "BW": "Botswana",
    "BV": "Bouvet Island",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory",
    "BN": "Brunei",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "CV": "Cabo Verde",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "KY": "Cayman Islands",
    "CF": "Central African Rep.",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos (Keeling) Islands",
    "CO": "Colombia",
    "KM": "Comoros",
    "CG": "Congo",
    "CD": "Dem. Rep. Congo",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "CI": "Côte d'Ivoire",
    "HR": "Croatia",
    "CU": "Cuba",
    "CW": "Curaçao",
    "CY": "Cyprus",
    "CZ": "Czechia",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Rep.",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Eq. Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "SZ": "eSwatini",
    "ET": "Ethiopia",
    "FK": "Falkland Is.",
    "FO": "Faroe Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "TF": "Fr. S. Antarctic Lands",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GG": "Guernsey",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HM": "Heard Island and McDonald Islands",
    "VA": "Holy See",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IM": "Isle of Man",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JE": "Jersey",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KP": "North Korea",
    "KR": "South Korea",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Laos",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macao",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia (Federated States of)",
    "MD": "Moldova",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "MK": "Macedonia",
    "MP": "Northern Mariana Islands",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestine",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PN": "Pitcairn",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "RE": "Reunion",
    "RO": "Romania",
    "RU": "Russia",
    "RW": "Rwanda",
    "BL": "Saint Barthelemy",
    "SH": "Saint Helena, Ascension and Tristan da Cunha",
    "KN": "Saint Kitts and Nevis",
    "LC": "Saint Lucia",
    "MF": "Saint Martin (French part)",
    "PM": "Saint Pierre and Miquelon",
    "VC": "Saint Vincent and the Grenadines",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome and Principe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SX": "Sint Maarten (Dutch part)",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Is.",
    "SO": "Somalia",
    "ZA": "South Africa",
    "GS": "South Georgia and the South Sandwich Islands",
    "SS": "S. Sudan",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SJ": "Svalbard and Jan Mayen",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syria",
    "TW": "Taiwan",
    "TJ": "Tajikistan",
    "TZ": "Tanzania",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad and Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks and Caicos Islands",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States",
    "UM": "United States Minor Outlying Islands",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "VG": "Virgin Islands (British)",
    "VI": "Virgin Islands (U.S.)",
    "WF": "Wallis and Futuna",
    "EH": "W. Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
  };

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

      if (data.timezone) {
        const time = new Date().toLocaleString(navigator.language, {
          timeZone: data.timezone,
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        data.currentTime = time;
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

  const isDomain = (value: string) => {
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?=$|\/)/;
    return domainRegex.test(value);
  };

  const isValidIp = (ip: string) => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const getIpFromDomain = async (domain: string, retries = 3) => {
    try {
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
      const data = await response.json();

      if (data?.Answer && data.Answer.length > 0) {
        const result = data.Answer[0].data;

        if (isValidIp(result)) {
          return result;
        } else {
          if (retries > 0) {
            console.log(`Received a domain: ${result}. Retrying with this domain...`);
            return getIpFromDomain(result, retries - 1);
          } else {
            console.error("Max retries reached, still no IP.");
            return null;
          }
        }
      } else {
        console.error("No IP or domain found for the domain.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching IP:", error);
      return null;
    }
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();

    let value = inputValue.replace(/^https?:\/\//, "").trim();

    if (value.indexOf(":") !== -1 && value.split(":").length === 2) {
      value = value.split(":")[0].trim();
    }

    value = value.split("/")[0].replace(/\.$/, "");

    if (isDomain(value)) {
      const ip = await getIpFromDomain(value);
      if (ip) {
        value = ip;
        value = value.split("/")[0].replace(/\.$/, "");
      }
    }

    setInputValue(value);
    fetchIpData(value);
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
      if (/Android/.test(navigator.userAgent)) return "Android";
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) return "iOS";
      if (/Linux/.test(platform)) return "Linux";
      return platform;
    };

    const getBrowserName = (userAgent: string) => {
      if (/Edge/.test(userAgent)) return "Microsoft Edge";
      if (/Opera/.test(userAgent)) return "Opera";
      if (/Firefox/.test(userAgent)) return "Mozilla Firefox";
      if (/Chrome/.test(userAgent)) return "Google Chrome";
      if (/Safari/.test(userAgent)) return "Apple Safari";
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

      <form onSubmit={handleSearch} className="flex gap-3 items-center w-full max-w-lg justify-center">
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
          placeholder="Type IP address or domain..."
          size="sm"
          startContent={
            <Button
              disabled={ipData?.ip === userIp}
              size="sm"
              isIconOnly
              variant="light"
              onPress={handleMyIpClick}
            >
              {ipData?.ip !== userIp ? (
                <Tooltip content="Check my IP details">
                  <SearchIcon size={18} />
                </Tooltip>
              ) : (
                <SearchIcon size={18} />
              )}
            </Button>
          }

          endContent={ipData && ipData.ip && (
            <><>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly variant="light">
                    <Icon fontSize={24} icon="ri:file-copy-fill" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Copy Actions" onAction={handleAction}>
                  <DropdownItem key="copy-ip">Copy address</DropdownItem>
                  <DropdownItem key="copy-details">Copy details&nbsp;&nbsp;<Chip size="sm" radius="sm" variant="flat" color="warning">JSON</Chip></DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </></>
          )}
          type="search"
        />
        <Button color="primary" variant="shadow" type="submit">
          Search
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

      {!loading && ipData && (
        <div className="flex flex-wrap justify-center gap-6 mt-8 w-full max-w-5xl">
          {/* Limited Alert */}
          {ipData.isLimited && (
            <Alert color="primary" title="Rate limit exceeded" description="Due to an exceeded rate limit some IP details may be unavailable" />
          )}

          {/* Bogon Alert */}
          {ipData.bogon && (
            <Alert color="warning" title="Bogon IP Address" description="This IP address is a bogon (reserved or unallocated IP) and may not be routable on the public internet." />
          )}

          {/* Anycast Alert */}
          {ipData.is_anycast && (
            <Alert
              color="primary"
              title="Anycast IP Address"
              description="This IP address is an anycast address, meaning it is shared across multiple locations for routing efficiency."
            />
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
              {ipData.loc ? (
                <a className="text-lg font-semibold" href={`https://www.google.com/maps?q=${ipData.loc}`} target="_blank" rel="noopener noreferrer">
                  {ipData.city || "Unknown"}{ipData.city && ipData.region ? ", " : ""}{ipData.region || ""}
                </a>
              ) : (
                <p className="text-lg font-semibold">{ipData.city || "Unknown"}{ipData.city && ipData.region ? ", " : ""}{ipData.region || ""}</p>
              )}
              <div className="flex items-center">
                {ipData.postal && (<p className="mr-2">{ipData.postal}</p>)}
                {ipData.country && (
                  <Tooltip content={countryNames[ipData.country.toUpperCase()] || 'Unknown'}>
                    <Icon
                      icon={`flagpack:${ipData.country.toLowerCase()}`}
                      style={{ borderRadius: '20%' }}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </Card>

          {/* Hostname Card */}
          {ipData.hostname && (
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="mdi:internet" />
                <h3 className="card-title">Hostname</h3>
                <p className="text-lg font-semibold">{ipData.hostname}</p>
              </div>
            </Card>
          )}

          {/* Timezone Card */}
          <Card className="w-80 bg-base-100 shadow-xl">
            <div className="card-body flex flex-col items-center">
              <Icon fontSize={32} icon="mdi:globe" />
              <h3 className="card-title">Timezone</h3>
              {
                ipData.currentTime ? (
                  <Tooltip content={ipData.currentTime}>
                    <p className="text-lg font-semibold">{ipData.timezone}</p>
                  </Tooltip>
                ) : (
                  <p className="text-lg font-semibold">Unknown</p>
                )
              }
            </div>
          </Card>

          {/* ISP Card */}
          <Card className="w-80 bg-base-100 shadow-xl">
            <div className="card-body flex flex-col items-center">
              <Icon fontSize={32} icon="mdi:server-network" />
              <h3 className="card-title">ISP</h3>
              <p className="text-lg font-semibold">{ipData.org || "Unknown"}</p>
            </div>
          </Card>
        </div>
      )}

      {!loading && ipData && (
        <div className="flex flex-wrap justify-center gap-6 mt-8 w-full max-w-5xl">
          {/* ASN Card */}
          {ipData.asn && !ipData.isLimited && (
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="ri:user-3-fill" />
                <h3 className="card-title">ASN</h3>
                <Tooltip content={`${ipData.asn.name}\n${ipData.asn.domain}\n${ipData.asn.route}\n${ipData.asn.type}`}>
                  <Button
                    onPress={() => {
                      navigator.clipboard.writeText(JSON.stringify(ipData.asn, null, 2)).then(() => {
                        addToast({
                          title: "Clipboard",
                          description: "ASN data has been copied to the clipboard",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        });
                      }).catch(() => {
                        addToast({
                          color: "danger",
                          title: "Clipboard",
                          description: "Failed to copy ASN data to clipboard",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        });
                      })
                    }}
                  >
                    {ipData.asn.asn.slice(0, 30) || "Unknown"}{ipData.asn.asn.length > 30 ? '...' : ''}
                  </Button>
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
                <Tooltip content={`${ipData.company.domain}\n${ipData.company.type}`}>
                  <Button
                    onPress={() => {
                      navigator.clipboard.writeText(JSON.stringify(ipData.company, null, 2)).then(() => {
                        addToast({
                          title: "Clipboard",
                          description: "Company data has been copied to the clipboard",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        });
                      }).catch(() => {
                        addToast({
                          color: "danger",
                          title: "Clipboard",
                          description: "Failed to copy company data to clipboard",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        });
                      })
                    }}
                  >
                    {ipData.company.name.slice(0, 30) || "Unknown"}{ipData.company.name.length > 30 ? '...' : ''}
                  </Button>
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
                  <Button
                    onPress={() => {
                      navigator.clipboard.writeText(JSON.stringify(ipData.abuse, null, 2)).then(() => {
                        addToast({
                          title: "Clipboard",
                          description: "Abuse data has been copied to the clipboard",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        });
                      }).catch(() => {
                        addToast({
                          color: "danger",
                          title: "Clipboard",
                          description: "Failed to copy abuse data to clipboard",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        });
                      })
                    }}
                  >
                    {ipData.abuse.name.slice(0, 30) || "Unknown"}{ipData.abuse.name.length > 30 ? '...' : ''}
                  </Button>
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
                  <Button
                    onPress={() => {
                      navigator.clipboard.writeText(JSON.stringify(ipData.domains, null, 2)).then(() => {
                        addToast({
                          title: "Clipboard",
                          description: "Domains data has been copied to the clipboard",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        });
                      }).catch(() => {
                        addToast({
                          color: "danger",
                          title: "Clipboard",
                          description: "Failed to copy domains data to clipboard",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        });
                      })
                    }}
                  >
                    {ipData.domains.total} total domains
                  </Button>
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
                          <Chip variant="flat" color={ipData.privacy[key] ? "danger" : "default"}>
                            {ipData.privacy[key] ? "Yes" : "No"}
                          </Chip>
                        </li>
                      ))}
                      {ipData.privacy.service && (
                        <li key="service">
                          Service: <Chip variant="flat" color="danger">{String(ipData.privacy.service)}</Chip>
                        </li>
                      )}
                    </ul>
                  }
                >
                  <Button
                    onPress={() => {
                      const privacyDataWithDetection = { detected: ["vpn", "proxy", "tor", "relay", "hosting"].some((key) => ipData.privacy[key]), ...ipData.privacy };

                      navigator.clipboard.writeText(JSON.stringify(privacyDataWithDetection, null, 2)).then(() => {
                        addToast({
                          title: "Clipboard",
                          description: "Spam data has been copied to the clipboard",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        });
                      }).catch(() => {
                        addToast({
                          color: "danger",
                          title: "Clipboard",
                          description: "Failed to copy spam data to clipboard",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        });
                      })
                    }}
                    color={
                      ["vpn", "proxy", "tor", "relay", "hosting"].some((key) => ipData.privacy[key])
                        ? "danger"
                        : "success"
                    }
                  >
                    {["vpn", "proxy", "tor", "relay", "hosting"].some((key) => ipData.privacy[key])
                      ? "Detected"
                      : "Undetected"}
                  </Button>
                </Tooltip>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Browser Details */}
      {!loading && browserDetails && userIp && ipData?.ip === userIp && (
        <><>
          <Divider />

          <div className="flex flex-col items-center text-center max-w-xl mx-auto">
            <Icon fontSize="64px" icon="ri:computer-fill" />
            <h1 className="text-3xl font-bold flex items-center">
              Browser details
              <Icon
                fontSize={24}
                icon="ri:file-copy-fill"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(browserDetails, null, 2)).then(() => {
                    addToast({
                      title: "Clipboard",
                      description: `Your browser details have been copied to clipboard`,
                      timeout: 3000,
                      shouldShowTimeoutProgress: true,
                    });
                  }).catch(() => {
                    addToast({
                      color: "danger",
                      title: "Clipboard",
                      description: "Failed to copy browser details to clipboard",
                      timeout: 3000,
                      shouldShowTimeoutProgress: true,
                    });
                  })
                }}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </h1>
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
                  <Tooltip content={browserDetails.referrer}>
                    <Button
                      onPress={() => {
                        navigator.clipboard.writeText(browserDetails.referrer).then(() => {
                          addToast({
                            title: "Clipboard",
                            description: "Your referrer has been copied to the clipboard",
                            timeout: 3000,
                            shouldShowTimeoutProgress: true,
                          });
                        }).catch(() => {
                          addToast({
                            color: "danger",
                            title: "Clipboard",
                            description: "Failed to copy your referrer to clipboard",
                            timeout: 3000,
                            shouldShowTimeoutProgress: true,
                          });
                        })
                      }}
                    >
                      {browserDetails.referrer.slice(0, 30)}{browserDetails.referrer.length > 30 ? '...' : ''}
                    </Button>
                  </Tooltip>
                </div>
              </Card>
            )}

            {/* User Agent Card */}
            <Card className="w-80 bg-base-100 shadow-xl">
              <div className="card-body flex flex-col items-center">
                <Icon fontSize={32} icon="ri:information-fill" />
                <h3 className="card-title">User Agent</h3>
                <Tooltip content={browserDetails.userAgent}>
                  <Button
                    onPress={() => {
                      navigator.clipboard.writeText(browserDetails.userAgent).then(() => {
                        addToast({
                          title: "Clipboard",
                          description: "Your user agent has been copied to the clipboard",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        });
                      }).catch(() => {
                        addToast({
                          color: "danger",
                          title: "Clipboard",
                          description: "Failed to copy your user agent to clipboard",
                          timeout: 3000,
                          shouldShowTimeoutProgress: true,
                        });
                      })
                    }}
                  >
                    {browserDetails.userAgent.slice(0, 30)}{browserDetails.userAgent.length > 30 ? '...' : ''}
                  </Button>
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
