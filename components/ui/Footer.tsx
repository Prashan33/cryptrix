import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full border-t border-dark-400 bg-dark-700 py-5 px-4 sm:px-6 mt-auto">
      <div className="mx-auto max-w-360 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-purple-100">
        <p>&copy; 2026 Prashan Adhikari. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link
            href="https://www.linkedin.com/in/prashan-adhikari-902915242/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
