import { useState } from "react";
import { Copy, Download, FileText, Github, Linkedin, Mail, MessageCircle, MessageSquare, Phone, Send, UserPlus, X } from "lucide-react";
import { resumeUrl } from "../data";

const NUMBER = "+251940715427";
const DISPLAY = "+251 940 715 427";
const EMAIL = "ezadinbadru55@gmail.com";

const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:Ezadin Badiru\nTEL;TYPE=CELL:${NUMBER}\nEMAIL:${EMAIL}\nURL:https://github.com/ezadin2\nADR:;;;Addis Ababa;;;Ethiopia\nEND:VCARD`;

const actions = [
  { label: "Call", icon: Phone, href: `tel:${NUMBER}` },
  { label: "WhatsApp", icon: MessageCircle, href: `https://wa.me/${NUMBER.slice(1)}`, ext: true },
  { label: "Telegram", icon: Send, href: `https://t.me/${NUMBER}`, ext: true },
  { label: "SMS", icon: MessageSquare, href: `sms:${NUMBER}` },
  { label: "Email", icon: Mail, href: `mailto:${EMAIL}` },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/ezadinbadru/", ext: true },
  { label: "GitHub", icon: Github, href: "https://github.com/ezadin2", ext: true },
  { label: "CV", icon: FileText, href: resumeUrl, download: "Ezadin_Resume.pdf" },
];

export default function PhoneContacts({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState("");
  const copy = async (text: string, what: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(what); setTimeout(() => setCopied(""), 1500); } catch { /* ignore */ }
  };
  const saveContact = () => {
    const url = URL.createObjectURL(new Blob([vcard], { type: "text/vcard" }));
    const a = document.createElement("a"); a.href = url; a.download = "Ezadin_Badiru.vcf"; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="phone-backdrop" onClick={onClose}>
      <div className="phone-device" role="dialog" aria-modal="true" aria-label="Ezadin's contacts" onClick={(e) => e.stopPropagation()}>
        <div className="phone-notch" />
        <button className="phone-close" aria-label="Back to room" onClick={onClose}><X size={18} /></button>
        <div className="phone-profile">
          <div className="phone-avatar">E</div>
          <h3>Ezadin Badiru</h3>
          <p>Full-stack & Flutter developer · Addis Ababa</p>
        </div>
        <div className="phone-grid">
          {actions.map(({ label, icon: Icon, href, ext, download }) => (
            <a key={label} href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...(download ? { download } : {})}>
              <span><Icon size={20} /></span>{label}
            </a>
          ))}
        </div>
        <div className="phone-rows">
          <button onClick={() => copy(DISPLAY, "number")}><Phone size={16} />{DISPLAY}<Copy size={14} /></button>
          <button onClick={() => copy(EMAIL, "email")}><Mail size={16} />{EMAIL}<Copy size={14} /></button>
          <button onClick={saveContact}><UserPlus size={16} />Save to my contacts<Download size={14} /></button>
        </div>
        <p className="phone-toast" aria-live="polite">{copied ? `Copied ${copied}` : "\u00a0"}</p>
      </div>
    </div>
  );
}
