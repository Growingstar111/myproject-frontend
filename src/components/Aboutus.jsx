import React from 'react';
// import './AboutUs.css'; /// Optional: for styling

const AboutUs = () => {
  return (
    <div className="about-us-container p-5">
     <div className='py-5 col-md-8 mx-auto'>
     <h1>About Us</h1>
      <p>
        Welcome to <strong>Tech Haven</strong>, your number one source for all things electronic! 
        We're dedicated to giving you the very best of electronic devices, with a focus on dependability, customer service, and uniqueness.
      </p>
      <p>
        Founded in 2023, Tech Haven has come a long way from its beginnings in a home office. 
        
        We now serve customers all over the country and are thrilled to be a part of the quirky, eco-friendly, and innovative wing of the tech industry.
      </p>
     
      {/* <h2>Our Values</h2>
      <ul>
        <li><strong>Customer Satisfaction:</strong> We prioritize our customers and their needs.</li>
        <li><strong>Innovation:</strong> We stay ahead of the curve by offering the latest technology.</li>
        <li><strong>Integrity:</strong> We believe in honest and transparent business practices.</li>
        <li><strong>Sustainability:</strong> We are committed to eco-friendly practices in our operations.</li>
      </ul> */}
      <h2 className='text-center'>Get in Touch</h2>
      <p>
        We love to hear from our customers! If you have any questions or comments, 
        please don't hesitate to reach out to us at <a href="mailto:support@techhaven.com">support@techhaven.com</a>.
      </p>
      <p>
        Thank you for choosing Tech Haven. We look forward to serving you!
      </p>
     </div>
    </div>
  );
};

export default AboutUs;