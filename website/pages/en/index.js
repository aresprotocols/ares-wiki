/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const Container = require("react-bootstrap/Container");
const Row = require("react-bootstrap/Row");
const Col = require("react-bootstrap/Col");

class HomeNav extends React.Component {
    render() {
        // const {siteConfig, language = ''} = this.props;

        const NavContainer = (props) => (
            <section className="homeNavContainer">
                <Container className="h-100">
                    <p className="homeNavContainerTitle">Learn all about the Ares Protocol</p>
                    <Row className="h-100 d-flex align-items-center justify-content-around homeNavItems">{props.children}</Row>
                </Container>
            </section>
        );

        const NavItem = (props) => (
            <Col xs={12} md={12} lg={3} className="homeNavItem rounded-lg">
                <a
                    href={props.href}
                    className="h-100 d-flex align-items-center"
                    data-aos="fade-up"
                    data-aos-delay={props.aosDelay}
                >
                    <div className="mx-auto">
                        <img className={`navItemIcon ${props.styleName}`} src={props.icon} alt="" />
                        <p className="navItemTitle mt-0 text-dark font-weight-bold text-center">{props.title}</p>
                        <p className="text-secondary px-4 pb-5">{props.content}</p>
                    </div>
                </a>
            </Col>
        );


        return (
            <NavContainer>
                <NavItem
                    href={this.props.docUrl("aresOverview.html")}
                    title="General"
                    content="A completely decentralized oracle platform"
                    aosDelay="0"
                    icon="/img/general-icon.png"
                />
                <NavItem
                    href={this.props.docUrl("buildGettingStarted.html")}
                    title="Build"
                    content="Build your decentralized application on Ares Protocol."
                    aosDelay="300"
                    icon="/img/build-icon.png"
                    styleName = "navItemIcon1"
                />
                <NavItem
                    href={this.props.docUrl("faq.html")}
                    title="Node"
                    content="Information and guides on how to deploy a node and run the network."
                    aosDelay="600"
                    icon="/img/node-icon.png"
                    styleName = "navItemIcon2"
                />
            </NavContainer>
        );
    }
}

class Index extends React.Component {
    render() {
        const { config: siteConfig, language = "" } = this.props;
        const { baseUrl, docsUrl } = siteConfig;
        const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
        const langPart = `${language ? `${language}/` : ""}`;
        const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

        return (
            <div className="homeContainer">
                <HomeNav siteConfig={siteConfig} docUrl={docUrl} />
            </div>
        );
    }
}

module.exports = Index;
