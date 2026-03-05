import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getYouTubeEmbedUrl(url: string | undefined | null): string {
  if (!url) return "";

  // If it's already an embed URL, just return it (but clean up potential double slashes or extra params if needed)
  if (url.includes("/embed/")) {
    const embedId = url.split("/embed/")[1]?.split(/[?#&]/)[0];
    return `https://www.youtube.com/embed/${embedId}`;
  }

  let videoId = "";

  // Handle standard watch URLs: youtube.com/watch?v=VIDEO_ID
  if (url.includes("watch?v=")) {
    videoId = url.split("watch?v=")[1].split("&")[0];
  }
  // Handle short URLs: youtu.be/VIDEO_ID
  else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split(/[?#&]/)[0];
  }
  // Handle other variations like youtube.com/v/VIDEO_ID
  else if (url.includes("/v/")) {
    videoId = url.split("/v/")[1].split(/[?#&]/)[0];
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}
