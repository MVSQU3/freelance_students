import { Phone, Mail, Globe, MapPin, User } from "lucide-react";

export default function Lab() {
  return (
    <div className="card w-80 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
      {/* Avatar */}
      <div className="flex flex-col items-center p-6">
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 group-hover:ring-secondary transition-all duration-300">
            <User className="w-20 h-20 text-neutral" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-neutral mt-3">Anna Wilson</h2>
        <p className="text-sm text-secondary font-semibold">Developer</p>
      </div>

      {/* Infos */}
      <div className="p-4">
        <ul className="space-y-3 text-sm font-medium text-neutral">
          <li className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            <span>+123-458-784</span>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            <span>smkys@gmail.com</span>
          </li>
          <li className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <span>smkydevelopr.com</span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>456 Anytown, Near Anywhere, ST 47523</span>
          </li>
        </ul>
      </div>

      {/* Footer accent */}
      <div className="h-2 w-full bg-primary group-hover:bg-secondary transition-colors duration-300" />
    </div>
  );
}
