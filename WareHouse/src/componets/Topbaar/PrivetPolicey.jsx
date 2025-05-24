import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="px-4 md:px-20 py-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

      {/* 1. Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-700">
          Welcome to our application. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our application. Please read this policy carefully.
        </p>
      </section>

      {/* 2. Information We Collect */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
        <p className="text-gray-700">
          We may collect personal information such as your name, email address, contact number, and payment details when you register or use our services. We also collect non-personal information such as browser type, device type, and usage data.
        </p>
      </section>

      {/* 3. How We Use Your Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our services</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information to improve our service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>
      </section>

      {/* 4. Sharing Your Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Sharing Your Information</h2>
        <p className="text-gray-700">
          We do not sell or rent your personal data to third parties. However, we may share your data with service providers who assist us in delivering our services, under strict confidentiality agreements.
        </p>
      </section>

      {/* 5. Cookies */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Cookies</h2>
        <p className="text-gray-700">
          We use cookies to enhance your browsing experience. Cookies help us understand user behavior and improve our services. You can disable cookies in your browser settings.
        </p>
      </section>

      {/* 6. Data Security */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">6. Data Security</h2>
        <p className="text-gray-700">
          We implement appropriate technical and organizational security measures to protect your personal data. However, no method of transmission over the Internet is 100% secure.
        </p>
      </section>

      {/* 7. Your Rights */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">7. Your Rights</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Right to access your data</li>
          <li>Right to correct your data</li>
          <li>Right to delete your data</li>
          <li>Right to withdraw consent</li>
        </ul>
      </section>

      {/* 8. Third-Party Links */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">8. Third-Party Links</h2>
        <p className="text-gray-700">
          Our service may contain links to third-party websites. We are not responsible for the content or privacy practices of those websites.
        </p>
      </section>

      {/* 9. Changes to Privacy Policy */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">9. Changes to This Privacy Policy</h2>
        <p className="text-gray-700">
          We may update our privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>
      </section>

      {/* 10. Contact Us */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions or suggestions about our privacy policy, contact us at: <br />
          <span className="font-medium">support@example.com</span>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
