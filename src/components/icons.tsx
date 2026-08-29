import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleHelp,
  Clipboard,
  Clock,
  FileText,
  Folder,
  LayoutGrid,
  Menu,
  Minus,
  Monitor,
  PanelLeft,
  Plus,
  Settings,
  Sparkle,
  Upload,
  X,
} from "lucide-react";

type P = { className?: string };

function wrap(Lucide: React.ComponentType<{ className?: string; strokeWidth?: number }>) {
  return function Wrapped({ className = "" }: P) {
    return <Lucide className={className} strokeWidth={2} />;
  };
}

export function LogoMark({ className = "" }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="vedaLogoFold" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#c9c9c9" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="7.6" fill="#2E2E2E" />
      {/* Broad folded V from the supplied brand mark */}
      <path
        d="M6 10.9h9.3c2.5 0 4.6 1.5 5.4 3.9l2.6 7.8 2.7-7.8c.8-2.4 2.9-3.9 5.4-3.9H34l-6 17c-.8 2.3-2.8 3.6-5.2 3.6h-5.6c-2.4 0-4.4-1.4-5.2-3.7L6 10.9Z"
        fill="#ffffff"
      />
      {/* Folded left stroke */}
      <path
        d="M17.4 31.5h-.2c-2.4 0-4.4-1.4-5.2-3.7L6 10.9h9.3c2.5 0 4.6 1.5 5.4 3.9l2.6 7.8-3.8 7.3c-.5.9-1.2 1.5-2.1 1.6Z"
        fill="url(#vedaLogoFold)"
      />
    </svg>
  );
}

export function SparkleGlyph({ className = "" }: P) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <path
        d="M58 6c2.2 13.4 8.6 19.8 22 22-13.4 2.2-19.8 8.6-22 22-2.2-13.4-8.6-19.8-22-22 13.4-2.2 19.8-8.6 22-22z"
        fill="#F4571F"
      />
      <path
        d="M28 52c1.5 9 5.5 13 14.5 14.5C33.5 68 29.5 72 28 81c-1.5-9-5.5-13-14.5-14.5C22.5 65 26.5 61 28 52z"
        fill="#F4571F"
      />
      <circle cx="16" cy="30" r="4.5" fill="#F4571F" />
    </svg>
  );
}

export const IconSparkle = wrap(Sparkle);
export const IconGrid = wrap(LayoutGrid);
export const IconClassroom = wrap(Monitor);
export const IconAssignments = wrap(FileText);
export const IconExams = wrap(Clipboard);
export const IconLibrary = wrap(Clock);
export const IconSettings = wrap(Settings);
export const IconPanel = wrap(PanelLeft);
export const IconChevronsRight = wrap(ChevronsRight);
export const IconChevronsLeft = wrap(ChevronsLeft);
export const IconChevronDown = wrap(ChevronDown);
export const IconChevronLeft = wrap(ChevronLeft);
export const IconChevronRight = wrap(ChevronRight);
export const IconArrowLeft = wrap(ArrowLeft);
export const IconArrowRight = wrap(ArrowRight);
export const IconUpload = wrap(Upload);
export const IconX = wrap(X);
export const IconPlus = wrap(Plus);
export const IconMinus = wrap(Minus);
export const IconCheck = wrap(Check);
export const IconHelp = wrap(CircleHelp);
export const IconBell = wrap(Bell);
export const IconFolder = wrap(Folder);
export const IconMenu = wrap(Menu);

export function PdfBadge({ className = "" }: P) {
  return (
    <span
      className={
        "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#E5484D] text-[10px] font-extrabold tracking-wide text-white " +
        className
      }
    >
      PDF
    </span>
  );
}

export function ImgBadge({ className = "" }: P) {
  return (
    <span
      className={
        "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#3E7BFA] text-[10px] font-extrabold tracking-wide text-white " +
        className
      }
    >
      IMG
    </span>
  );
}
