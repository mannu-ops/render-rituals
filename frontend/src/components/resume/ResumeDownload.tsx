import { Download } from "lucide-react";

type ResumeDownloadProps = {
  href?: string;
};

export default function ResumeDownload({
  href = "/resume.pdf",
}: ResumeDownloadProps) {
  return (
    <a
      href={href}
      download
      className="group inline-flex w-fit items-center gap-3 rounded-full bg-black px-6 py-4 text-xs text-white"
    >
      Download resume
      <Download
        size={14}
        className="transition-transform group-hover:translate-y-0.5"
      />
    </a>
  );
}
