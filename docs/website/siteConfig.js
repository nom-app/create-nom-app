/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: 'Create Nom App',
  tagline: 'Begin your next module in seconds.',
  url: 'https://md.github.io', // Your website URL
  baseUrl: '/create-nom-app/', // TODO: I think this needs to be '/create-nom-app/' when publish to Github Pages.
  // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',
  editUrl: 'https://github.com/MaximDevoir/create-nom-app/edit/master/docs/docs/',
  enableUpdateBy: true,
  enableUpdateTime: true,

  // Used for publishing and more
  projectName: 'create-nom-app',
  organizationName: 'MaximDevoir',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {
      doc: 'getting-started',
      label: 'Docs'
    },
    {
      doc: 'contributing-introduction',
      label: 'Contribute'
    },
    {
      href: 'https://www.github.com/MaximDevoir/create-nom-app',
      label: 'GitHub',
    },
    // TODO: Add Algolia search integration after public release.
    // https://docusaurus.io/docs/en/search
  ],

  /* path to images for header/footer */
  headerIcon: 'img/favicon.ico',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#434b5d',
    secondaryColor: '#465069',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © 2019 Maxim Devoir`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  docsSideNavCollapsible: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
    repoUrl: 'https://github.com/MaximDevoir/create-nom-app',
  scrollToTop: true,
};

module.exports = siteConfig;
