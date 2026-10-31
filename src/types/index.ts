export type ContentCategory = 
  | 'course'       // Ethical Hacking & Paid Video Courses
  | 'tool'         // Cyber & Hacking Tools / Scripts
  | 'apk'          // Android APKs & Software Utilities
  | 'document'     // PDF Notes, Cheatsheets & Guides
  | 'photo'        // Blueprints & Architecture Diagrams
  | 'announcement';// Live alerts & Meeting links

export interface BaseItem {
  id: string;
  category: ContentCategory;
  title: string;
  description: string;
  tag: string;           // e.g. "Ethical Hacking", "Bug Bounty", "VIP Tool", "Module 01"
  createdAt: string;
  isPinned?: boolean;
  views: number;
}

export interface CourseContentItem extends BaseItem {
  category: 'course';
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;      // e.g. "32:15"
  quality: string;       // e.g. "1080p Full HD"
}

export interface ToolContentItem extends BaseItem {
  category: 'tool';
  toolUrl: string;       // Download or repo URL
  version: string;       // e.g. "v2.4"
  platform: string;      // e.g. "Linux / Termux / Windows"
  commandToRun?: string; // e.g. "python3 scanner.py -t target"
}

export interface ApkContentItem extends BaseItem {
  category: 'apk';
  apkUrl: string;
  version: string;       // e.g. "v4.5 PRO"
  fileSize: string;      // e.g. "38 MB"
  packageName: string;   // e.g. "com.manish.tool"
  minAndroid: string;    // e.g. "Android 8.0+"
  isSafeVerified: boolean;
  installGuide: string[];
}

export interface DocumentContentItem extends BaseItem {
  category: 'document';
  docUrl: string;
  fileFormat: 'PDF' | 'DOCX' | 'ZIP' | 'TXT';
  fileSize: string;
  pagesCount?: number;
}

export interface PhotoContentItem extends BaseItem {
  category: 'photo';
  imageUrl: string;
  resolution?: string;
}

export interface AnnouncementContentItem extends BaseItem {
  category: 'announcement';
  priority: 'high' | 'normal';
  actionUrl?: string;
  actionText?: string;
}

export type PortalItem = 
  | CourseContentItem 
  | ToolContentItem 
  | ApkContentItem 
  | DocumentContentItem 
  | PhotoContentItem 
  | AnnouncementContentItem;

export interface MentorProfile {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  isVerified: boolean;
  verifiedBadgeText: string;
  whatsappNumber: string;
  telegramHandle: string;
  youtubeChannel: string;
  offeringsSummary: string[];
}

export interface AuthSession {
  isLoggedIn: boolean;
  role: 'admin' | 'user';
  username: string;
  displayName: string;
}
