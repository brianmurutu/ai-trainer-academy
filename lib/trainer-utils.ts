/**
 * Helper to parse a trainer's bio and extract video introduction metadata.
 */
export function parseTrainerBio(rawBio: string | null) {
  if (!rawBio) return { bio: "", videoUrl: "", videoUnlocked: false };
  // Match the tag [VIDEO_INTRO:url|UNLOCKED:true|false]
  const match = rawBio.match(/\[VIDEO_INTRO:(.*?)\|UNLOCKED:(true|false)\]/);
  if (match) {
    const videoUrl = match[1];
    const videoUnlocked = match[2] === "true";
    const bio = rawBio.replace(/\[VIDEO_INTRO:(.*?)\|UNLOCKED:(true|false)\]/, "").trim();
    return { bio, videoUrl, videoUnlocked };
  }
  return { bio: rawBio, videoUrl: "", videoUnlocked: false };
}

/**
 * Helper to construct a raw bio with video introduction metadata.
 */
export function stringifyTrainerBio(cleanBio: string, videoUrl: string, videoUnlocked: boolean) {
  const clean = cleanBio ? cleanBio.trim() : "";
  const url = videoUrl ? videoUrl.trim() : "";
  const unlocked = videoUnlocked ? "true" : "false";
  return `${clean}\n\n[VIDEO_INTRO:${url}|UNLOCKED:${unlocked}]`;
}

/**
 * Parses YouTube, Vimeo, and Loom URLs into their iframe-embeddable equivalents.
 */
export function getEmbedUrl(url: string): string {
  if (!url) return "";
  let cleanUrl = url.trim();

  // YouTube
  if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) {
    let videoId = "";
    if (cleanUrl.includes("watch?v=")) {
      videoId = cleanUrl.split("watch?v=")[1]?.split("&")[0] || "";
    } else if (cleanUrl.includes("youtu.be/")) {
      videoId = cleanUrl.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (cleanUrl.includes("youtube.com/embed/")) {
      videoId = cleanUrl.split("youtube.com/embed/")[1]?.split("?")[0] || "";
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : cleanUrl;
  }

  // Vimeo
  if (cleanUrl.includes("vimeo.com")) {
    if (!cleanUrl.includes("player.vimeo.com")) {
      const parts = cleanUrl.split("/");
      const videoId = parts[parts.length - 1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return cleanUrl;
  }

  // Loom
  if (cleanUrl.includes("loom.com")) {
    if (cleanUrl.includes("/share/")) {
      const videoId = cleanUrl.split("/share/")[1]?.split("?")[0] || "";
      return `https://www.loom.com/embed/${videoId}`;
    }
    return cleanUrl;
  }

  return cleanUrl;
}

