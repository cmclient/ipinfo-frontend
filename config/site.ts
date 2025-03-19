export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "IP Info",
  description: "Find accurate data about any IP address.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs.html",
    },
    {
      label: "About",
      href: "/about.html",
    }
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs.html",
    },
    {
      label: "About",
      href: "/about.html",
    }
  ],
  links: {
    github: "https://github.com/cmclient",
    twitter: "https://twitter.com/cmclient",
    docs: "/docs.html",
    discord: "https://discord.gg/cmclient",
    sponsor: "https://patreon.com",
  },
};
