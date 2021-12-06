/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc) {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>About Us</h5>
            <p className="text-white">Ares is an on-chain-verified oracle protocol that provides secure and reliable data services for the Polkadot DeFi ecosystem.</p>
            <a
              href="mailto:info@aresprotocol.io">
              <img src="./img/Email.png" alt="Email" width={18} height={11}/> &nbsp;
              info@aresprotocol.io
            </a>
          </div>
          <div>
            <h5>Quick Links</h5>
            <a href="https://www.aresprotocol.io/">
              Website
            </a>
            <a href="https://aresprotocollab.medium.com/">
              Blog
            </a>
            <a href="http://aresprotocollab.medium.com/ares-protocol-tokenomics-detail-3fcdd19e1bf0">
              Tokenomics
            </a>
            <a href="https://www.gateio.pro/cn/trade/ARES_USDT">
              Buy Token
            </a>
            <a href="https://trojan.aresprotocol.io/">
              Farms
            </a>
          </div>
          <div>
            <h5>Developers</h5>
            <a href="https://docs.aresprotocol.io/#/">
              Documentation
            </a>
            <a href="https://github.com/aresprotocols">
              Github
            </a>
            <a href="http://etherscan.io/token/0x358aa737e033f34df7c54306960a38d09aabd523">
              Blockchain Explorer
            </a>
          </div>
          <div>
            <h5>Social Media</h5>
            <div className="social-media">
              <a
                  href="https://t.me/AresProtocolLab"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="media-item"
              >
                <img src="./img/telegram.png" alt="" width={24} height={22}/>
              </a>
              <a
                  href="https://twitter.com/AresProtocolLab"
                  target="_blank"
                  rel="noreferrer noopener">
                <img src="/img/twitter.png" alt="" width={24} height={22}/>
              </a>
              <a
                  href="https://www.facebook.com/aresprotocollab"
                  target="_blank"
                  rel="noreferrer noopener">
                <img src="./img/facebook.png" alt="" width={24} height={22}/>
              </a>
              <a
                  href="https://discord.com/invite/cqduK4ZNaY"
                  target="_blank"
                  rel="noreferrer noopener">
                <img src="./img/discord.png" alt="" width={24} height={22}/>
              </a>
              <a
                  href="https://www.reddit.com/r/AresProtocolLabs/"
                  target="_blank"
                  rel="noreferrer noopener">
                <img src="./img/reddit.png" alt="" width={24} height={22}/>
              </a>
              <a
                  href="https://aresprotocollab.medium.com/"
                  target="_blank"
                  rel="noreferrer noopener">
                <img src="./img/medium.png" alt="" width={24} height={22}/>
              </a>
              <a
                  href="https://github.com/aresprotocols"
                  target="_blank"
                  rel="noreferrer noopener">
                <img src="./img/github.png" alt="" width={24} height={22}/>
              </a>
              <a
                  href="https://www.instagram.com/aresprotocollab/"
                  target="_blank"
                  rel="noreferrer noopener">
                <img src="./img/instagram.png" alt="" width={24} height={22}/>
              </a>
              <a
                  href="https://www.youtube.com/channel/UCgwY4NwkoP8Hx1Fqmp_rJUw"
                  target="_blank"
                  rel="noreferrer noopener">
                <img src="./img/youtube.png" alt="" width={24} height={22}/>
              </a>
            </div>
          </div>
          {/*<div>*/}
            {/*<h5>More</h5>*/}
            {/*<a*/}
            {/*    href="https://www.aresprotocol.io/"*/}
            {/*    target="_blank"*/}
            {/*    rel="noreferrer noopener">*/}
            {/*  Cooperation*/}
            {/*</a>*/}
            {/*/!*<a href={`${this.props.config.baseUrl}blog`}>Blog</a>*!/*/}
            {/*<a href="https://github.com/aresprotocols">GitHub</a>*/}
            {/*<a*/}
            {/*  className="github-button"*/}
            {/*  href={this.props.config.repoUrl}*/}
            {/*  data-icon="octicon-star"*/}
            {/*  data-count-href="/crust"*/}
            {/*  data-show-count="true"*/}
            {/*  data-count-aria-label="# stargazers on GitHub"*/}
            {/*  aria-label="Star this project on GitHub">*/}
            {/*  Star*/}
            {/*</a>*/}
            {/*{this.props.config.twitterUsername && (*/}
            {/*  <div className="social">*/}
            {/*    <a*/}
            {/*      href={`https://twitter.com/${this.props.config.twitterUsername}`}*/}
            {/*      className="twitter-follow-button">*/}
            {/*      Follow @{this.props.config.twitterUsername}*/}
            {/*    </a>*/}
            {/*  </div>*/}
            {/*)}*/}
            {/*{this.props.config.facebookAppId && (*/}
            {/*  <div className="social">*/}
            {/*    <div*/}
            {/*      className="fb-like"*/}
            {/*      data-href={this.props.config.url}*/}
            {/*      data-colorscheme="dark"*/}
            {/*      data-layout="standard"*/}
            {/*      data-share="true"*/}
            {/*      data-width="225"*/}
            {/*      data-show-faces="false"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*)}*/}
          {/*</div>*/}
        </section>

        {/*<a*/}
        {/*  href="https://opensource.facebook.com/"*/}
        {/*  target="_blank"*/}
        {/*  rel="noreferrer noopener"*/}
        {/*  className="fbOpenSource">*/}
        {/*  <img*/}
        {/*    src={`${this.props.config.baseUrl}img/oss_logo.png`}*/}
        {/*    alt="Facebook Open Source"*/}
        {/*    width="170"*/}
        {/*    height="45"*/}
        {/*  />*/}
        {/*</a>*/}
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
