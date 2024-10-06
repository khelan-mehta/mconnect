import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function extractMiddlePart(url: string): string | null {
  try {
    // Use regex to extract the part between 'http://localhost:3001' and '/abc'
    const match = url.match(/http:\/\/localhost:3001\/([^/]+)/);

    if (match && match[1]) {
      // If a match is found, return the captured group
      return match[1];
    } else {
      // If no match is found, return null
      return null;
    }
  } catch (error) {
    // URL parsing failed
    console.error("Invalid URL:", error);
    return null;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const blobToBase64 = (blob: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

export function extractBase64Data(base64String: string): { mimeType: string, base64Data: string } {
  const matches = base64String.match(/^data:(\w+\/\w+);base64,(.+)$/);
  if (matches) {
      return {
          mimeType: matches[1],
          base64Data: matches[2],
      };
  } else {
      throw new Error('Invalid base64 string');
  }
}
