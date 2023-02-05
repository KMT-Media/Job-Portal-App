import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  let url = '';
  return (
    <footer className='footer'>
      <Container>
        <div class='footer-container'>
          <div class='row'>
            <div class='footer-col'>
              <h4>Company</h4>
              <ul>
                <li>
                  <a href={url}>about us</a>
                </li>
                <li>
                  <a href={url}>our services</a>
                </li>
                <li>
                  <a href={url}>contact us</a>
                </li>
                <li>
                  <a href={url}>terms and condition</a>
                </li>
              </ul>
            </div>
            <div class='footer-col'>
              <h4>Quick links</h4>
              <ul>
                <li>
                  <a href={url}>About us</a>
                </li>
                <li>
                  <a href={url}>Contact us</a>
                </li>
                <li>
                  <a href={url}>privact policy</a>
                </li>
                <li>
                  <a href={url}>terms & condition</a>
                </li>
              </ul>
            </div>
            <div class='footer-col'>
              <h4>contact</h4>
              <ul>
                <li>
                  <a href={url}>Dire Dawa, Ethiopia</a>
                </li>
                <li>
                  <a href={url}>+251909290457</a>
                </li>
                <li>
                  <a href={url}>name@example.com</a>
                </li>
              </ul>
            </div>
            <div class='footer-col'>
              <h4>Follow Us</h4>
              <div class='social-links'>
                <a href={url}>
                  <i class='fab fa-facebook-f'></i>
                </a>
                <a href={url}>
                  <i class='fab fa-twitter'></i>
                </a>
                <a href={url}>
                  <i class='fab fa-instagram'></i>
                </a>
                <a href={url}>
                  <i class='fab fa-linkedin-in'></i>
                </a>
              </div>
            </div>
          </div>
          <hr />
          <p class='footer-text'>
            &copy; <span>JobPortal</span>, all right reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
