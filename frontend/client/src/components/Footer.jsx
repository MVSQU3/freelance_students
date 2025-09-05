import { Link } from "react-router-dom";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Logo + description */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              FreelStudent
            </Link>
            <p className="text-sm text-base-content/70 mt-2 max-w-sm">
              Trouve des stages et des talents. Plateforme simple et efficace
              pour mettre en relation étudiants et entreprises.
            </p>
          </div>

          {/* Liens */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-base-content">
                Découvrir
              </h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/stages" className="link link-hover text-primary">
                    Stages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/student/liste"
                    className="link link-hover text-primary"
                  >
                    Talents
                  </Link>
                </li>
                <li>
                  <Link to="/lab" className="link link-hover text-primary">
                    Laboratoire
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-base-content">Société</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/about" className="link link-hover text-primary">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="link link-hover text-primary">
                    Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="link link-hover text-primary">
                    Confidentialité
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-base-content">Contact</h4>
              <div className="flex flex-col gap-2 text-sm">
                <a
                  href="mailto:contact@freelstudent.local"
                  className="link link-hover inline-flex items-center gap-2 text-primary"
                >
                  <Mail className="w-4 h-4" /> contact@freelstudent.local
                </a>
                <div className="flex gap-3 mt-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-90 hover:opacity-100 text-base-content"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-90 hover:opacity-100 text-base-content"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-90 hover:opacity-100 text-base-content"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="border-t mt-8 pt-4 text-sm text-base-content/60 flex flex-col sm:flex-row sm:justify-between items-center gap-3">
          <span>
            © {new Date().getFullYear()} FreelStudent. Tous droits réservés.
          </span>
          <div className="text-xs">
            Conçu avec ❤️ pour les étudiants et les entreprises.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
