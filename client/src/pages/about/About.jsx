import React from 'react';
import './about.css';

export default function About() {
  return (
    <div className="about-container">
      <h1 className="about-heading">About InkInsight</h1>

      <div className="about-section">
        <p>Welcome to <span className="brand">InkInsight</span>, where creativity meets expression!</p>
      </div>

      <div className="about-section">
        <h2 className="section-heading">Our Story</h2>
        <p>
          At <span className="brand">InkInsight</span>, we believe in the power of words and the magic of storytelling. Our platform serves as a sanctuary for writers, poets, artists, and creative minds from all walks of life. We understand the importance of sharing stories, ideas, and perspectives, which is why we strive to provide a vibrant and inclusive space for individuals to unleash their creativity and connect with like-minded souls.
        </p>
      </div>

      <div className="about-section">
        <h2 className="section-heading">Our Mission</h2>
        <p>
          Our mission is simple yet profound: to inspire, empower, and ignite the flames of creativity within each individual who crosses our path. Whether you're a seasoned wordsmith or a budding artist, <span className="brand">InkInsight</span> is here to support you on your creative journey. We believe that everyone has a story worth sharing and a voice that deserves to be heard.
        </p>
      </div>

      <div className="about-section">
        <h2 className="section-heading">What We Offer</h2>
        <ul>
          <li>Inspiring Content: Dive into a treasure trove of articles, essays, poems, and artworks that celebrate the beauty of human expression.</li>
          <li>Community Engagement: Join our thriving community of creatives and engage in lively discussions, workshops, and collaborative projects.</li>
          <li>Opportunities for Growth: Explore writing prompts, artistic challenges, and resources to hone your craft and expand your horizons.</li>
          <li>Support and Encouragement: Receive feedback, encouragement, and support from fellow creators and our dedicated team of moderators.</li>
        </ul>
      </div>

      <div className="about-section">
        <h2 className="section-heading">Meet the Team</h2>
        <p>Behind every great platform is a passionate team dedicated to making a difference. Get to know the faces and stories behind <span className="brand">InkInsight</span> and discover the diverse talents that drive our vision forward.</p>
      </div>

      <div className="about-section">
        <h2 className="section-heading">Connect With Us</h2>
        <p>Have questions, suggestions, or just want to say hello? We'd love to hear from you! Connect with us on social media, drop us an email, or reach out through our contact form. Let's create, inspire, and build a vibrant community together!</p>
      </div>

      <div className="about-section">
        <h2 className="section-heading">Join the Movement</h2>
        <p>Ready to embark on a journey of creativity, self-discovery, and connection? Join the <span className="brand">InkInsight</span> community today and let your imagination soar!</p>
      </div>
    </div>
  );
}
