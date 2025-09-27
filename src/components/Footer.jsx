import { FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold mb-2">GourmetNet</h2>
          <p className="text-gray-300">
            Your smart recipe generator & cooking assistant. Explore, cook, and enjoy!
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Contact</h2>
          <p>Email: info@gourmetnet.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Address: 123 Culinary Street, Food City, India</p>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-right">
          <h2 className="text-xl font-bold mb-2">Follow Us</h2>
          <div className="flex justify-center md:justify-end gap-4 mt-2 text-2xl">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <FaGithub className="hover:text-white transition-colors" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-pink-500 transition-colors" />
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="hover:text-green-500 transition-colors" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-400">
        © 2025 GourmetNet. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
