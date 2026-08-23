/**
 * Utility functions for parsing, embedding, and displaying Google Drive URLs
 * (Supports PDFs, Images, Folders, and direct Drive view links)
 */

export interface ParsedDriveUrl {
  fileId: string | null;
  isDriveUrl: boolean;
  embedUrl: string | null;
  imageUrl: string | null;
  viewUrl: string;
  downloadUrl: string | null;
}

/**
 * Extracts Google Drive File ID from various Drive URL formats:
 * - https://drive.google.com/file/d/1A2B3C4D5E6F7G/view?usp=sharing
 * - https://drive.google.com/open?id=1A2B3C4D5E6F7G
 * - https://drive.google.com/uc?id=1A2B3C4D5E6F7G
 * - https://lh3.googleusercontent.com/d/1A2B3C4D5E6F7G
 */
export function extractDriveFileId(url?: string): string | null {
  if (!url) return null;

  // Match /file/d/FILE_ID
  const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) return fileDMatch[1];

  // Match id=FILE_ID or ?id=FILE_ID
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) return idMatch[1];

  // Match googleusercontent /d/FILE_ID
  const gucMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (gucMatch && gucMatch[1]) return gucMatch[1];

  return null;
}

/**
 * Converts any Google Drive or standard link into iframe embeddable URL,
 * high-res thumbnail URL, and direct view URLs.
 */
export function parseDriveLink(url?: string): ParsedDriveUrl {
  const fallbackView = url || '#';
  if (!url) {
    return {
      fileId: null,
      isDriveUrl: false,
      embedUrl: null,
      imageUrl: null,
      viewUrl: fallbackView,
      downloadUrl: null,
    };
  }

  const fileId = extractDriveFileId(url);
  const isDriveUrl = url.includes('drive.google.com') || url.includes('googleusercontent.com') || !!fileId;

  if (fileId) {
    return {
      fileId,
      isDriveUrl: true,
      // Drive embed iframe preview (works for PDFs and documents)
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      // Direct high-res image thumbnail link
      imageUrl: `https://lh3.googleusercontent.com/d/${fileId}`,
      // Direct view link in Google Drive
      viewUrl: `https://drive.google.com/file/d/${fileId}/view?usp=sharing`,
      // Direct download link
      downloadUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
    };
  }

  return {
    fileId: null,
    isDriveUrl,
    embedUrl: url,
    imageUrl: url,
    viewUrl: url,
    downloadUrl: url,
  };
}
