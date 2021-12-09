/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: '/img/undraw_open_source.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: ' Ares Wiki', // Title for your website.
  tagline: 'Wiki for Ares Network',
  url: 'https://wiki.Ares.network', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  // Used for publishing and more
  projectName: 'Ares-wiki',
  organizationName: 'Ares network',
  headerLinks: [
    {doc: 'aresOverview', label: 'Docs'},
    // {href: 'https://wiki-maxwell.Ares.network', label: 'Maxwell'},
    // {blog: true, label: 'Blog'},
    {search: true},
    {doc: "contributing", label: "Contribute"},
    {languages: true},
  ],

  /* path to images for header/footer */
  headerIcon: "img/logo_ares_wiki.png",
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#128dff',
    secondaryColor: '#585474',
  },

  algolia: {
    // apiKey: "",
    // indexName: "",
    algoliaOptions: {
      facetFilters: ["language:LANGUAGE"],
    }, // Optional, if provided by Algolia
  },

  /* Custom fonts for website */
  fonts: {
    myFont: ["Work Sans", "sans-serif"],
  },

  onPageNav: "separate",

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.js",
    "https://unpkg.com/aos@next/dist/aos.js",
    "/js/custom.js",
    "/js/klaro-config.js",
    "/js/klaro.js",
    '/js/packaged/addressChanger.js',
    "/js/clipboard.min.js",
    "/js/copycode.js",
  ],

  stylesheets: [
    "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css",
    "https://fonts.googleapis.com/css?family=Work+Sans:400,700&display=swap",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
    "https://unpkg.com/aos@next/dist/aos.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "/css/klaro.css",
    "/css/copycode.css",
  ],

  docsSideNavCollapsible: true,

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} The Ares Protocol All rights reserved`,
  zhCopyright: `Copyright © ${new Date().getFullYear()} Ares Protocol 保留所有权利.`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "default",
  },

  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },

  markdownPlugins: [
    (md) => {
      md.use(require("remarkable-katex"));
    },
  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  // docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  
};

module.exports = siteConfig;
