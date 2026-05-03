export type ProfileStatus = "pending" | "approved" | "rejected";
export type ProfileRole = "member" | "leader" | "admin";
export type CourseStatus = "draft" | "published" | "inactive";
export type CourseLevel = "basic" | "intermediate" | "leadership";
export type MaterialType = "pdf" | "image" | "video";

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: ProfileRole;
  status: ProfileStatus;
  created_at: string;
};

export type Course = {
  id: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  status: CourseStatus;
  level: CourseLevel;
  access_mode: "all" | "specific";
  created_at: string;
  updated_at: string;
};

export type Module = {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  position: number;
};

export type Lesson = {
  id: string;
  module_id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  pdf_url: string | null;
  image_url: string | null;
  video_file_url: string | null;
  position: number;
};

export type Announcement = {
  id: string;
  title: string;
  body: string;
  is_active: boolean;
  created_at: string;
};
