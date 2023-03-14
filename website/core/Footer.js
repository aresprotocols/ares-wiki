/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {

  constructor(props)
  {
    super(props);
    const enFooterNavItemList = {
      aboutUs: {
        title: 'About Us',
        desc: "Ares is an on-chain-verified oracle platform that provides secure and reliable data services for the Polkadot DeFi ecosystem."
      },
      quickLinks: {
        title: 'Quick links',
        items: [
          {
            title: "Website",
            link: "https://www.aresprotocol.io/"
          },
          {
            title: "Blog",
            link: "https://aresprotocollab.medium.com/"
          },
          {
            title: "Tokenomics",
            link: "http://aresprotocollab.medium.com/ares-protocol-tokenomics-detail-3fcdd19e1bf0"
          },
          {
            title: "Buy Token",
            link: "https://www.gate.io/cn/trade/ARES_USDT"
          },
          {
            title: "Farms",
            link: "https://trojan.aresprotocol.io/"
          },
        ]
      },
      developers: {
        title: 'Resources',
        items: [
          {
            title: "Documentation",
            link: "https://docs.aresprotocol.io/#/"
          },
          {
            title: "Github",
            link: "https://github.com/aresprotocols"
          },
          {
            title: "Blockchain Explorer",
            link: "http://etherscan.io/token/0x358aa737e033f34df7c54306960a38d09aabd523"
          },
        ]
      },
      media: {
        title: 'Social Media',
        items: [
          {
            href: "https://t.me/AresProtocolLab",
            imgPath: "/img/telegram.png",
            className: "media-item"
          },
          {
            href: "https://twitter.com/AresProtocolLab",
            imgPath: "/img/twitter.png",
            className: ""
          },
          {
            href: "https://www.facebook.com/aresprotocollab",
            imgPath: "/img/facebook.png",
            className: ""
          },
          {
            href: "https://discord.com/invite/cqduK4ZNaY",
            imgPath: "/img/discord.png",
            className: ""
          },
          {
            href: "https://www.reddit.com/r/AresProtocolLabs/",
            imgPath: "/img/reddit.png",
            className: ""
          },
          {
            href: "https://aresprotocollab.medium.com/",
            imgPath: "/img/medium.png",
            className: ""
          },
          {
            href: "https://github.com/aresprotocols",
            imgPath: "/img/github.png",
            className: ""
          },
          {
            href: "https://www.instagram.com/aresprotocollab/",
            imgPath: "/img/instagram.png",
            className: ""
          },
          {
            href: "https://www.youtube.com/channel/UCgwY4NwkoP8Hx1Fqmp_rJUw",
            imgPath: "/img/youtube.png",
            className: ""
          },
        ]
      }
    }


    const zhFooterNavItemList = {
      aboutUs: {
        title: '关于我们',
        desc: "首个链上验证的去中心化跨链预言机服务协议，为万链互联和数字经济提供安全可信的数据服务。"
      },
      quickLinks: {
        title: '快速链接',
        items: [
          {
            title: "网站",
            link: "https://www.aresprotocol.io/"
          },
          {
            title: "博客",
            link: "https://aresprotocollab.medium.com/"
          },
          {
            title: "代币经济学",
            link: "http://aresprotocollab.medium.com/ares-protocol-tokenomics-detail-3fcdd19e1bf0"
          },
          {
            title: "购买代币",
            link: "https://www.gate.io/cn/trade/ARES_USDT"
          },
          {
            title: "挖矿",
            link: "https://trojan.aresprotocol.io/"
          },
        ]
      },
      developers: {
        title: '资源',
        items: [
          {
            title: "文档",
            link: "https://docs.aresprotocol.io/#/"
          },
          {
            title: "Github",
            link: "https://github.com/aresprotocols"
          },
          {
            title: "区块浏览器",
            link: "http://etherscan.io/token/0x358aa737e033f34df7c54306960a38d09aabd523"
          },
        ]
      },
      media: {
        title: '社会媒体',
        items: enFooterNavItemList.media.items
      }
    }

    this.state = {
      navList: this.props.language === "en" ? enFooterNavItemList : zhFooterNavItemList,
      copyright: this.props.language === "en" ? this.props.config.copyright : this.props.config.zhCopyright
    };
  }

  docUrl(doc) {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  render() {
    const {navList, copyright} = this.state;
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          {
            <div className="footerAbout">
              <h5>{navList.aboutUs.title}</h5>
              <p className="text-white">{navList.aboutUs.desc}</p>
              <a href="mailto:info@aresprotocol.io">
                <img src="/img/Email.png" alt="Email" width={18} height={11}/> &nbsp;
                info@aresprotocol.io
              </a>
            </div>
          }
          {
            <div>
              <h5>{navList.quickLinks.title}</h5>
              {
                navList.quickLinks.items.map(item => {
                  return (
                    <a href={item.link} target="_blank" key={item.link}>
                      {item.title}
                    </a>
                  )
                })
              }
            </div>
          }
          {
            <div>
              <h5>{navList.developers.title}</h5>
              {
                navList.developers.items.map(item => {
                  return (
                      <a href={item.link} target="_blank" key={item.link}>
                        {item.title}
                      </a>
                  )
                })
              }
            </div>
          }
          {
            <div>
              <h5>{navList.media.title}</h5>
              <div className="social-media">
                {
                  navList.media.items.map(item => {
                    return(
                        <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className={item.className}
                            key={item.href}
                        >
                          <img src={item.imgPath} alt="" width={24} height={22}/>
                        </a>
                    )
                  })
                }
              </div>
            </div>
          }
        </section>
        <section className="copyright">{copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
