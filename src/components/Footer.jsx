import React from 'react';
import Subscription from './Subscription';
import Row from './Utilities/Row';

const styles = {
  footer: {
    backgroundColor: '#222',
    paddingTop: 100,
    paddingBottom: 100,
    marginTop: 100,
  },

  footerTxt: {
    color: '#fff',
  },
};

const Footer = () => {
  const d = new Date();
  const n = d.getFullYear();


  return (<footer style={styles.footer}>
    <div className="container">
      <Row offset={3} width={6}>
        <Subscription />
      </Row>
      <div style={styles.footerTxt} className="content has-text-centered">
        AFO IT © {n}
      </div>
    </div>
  </footer>);
}


export default Footer;
