import axios from "axios";

/**
 * Returns a file extension from a file name.
 * @param {string} fileName - File name.
 * @return File extension.
 */
export function getExtensionFromFileName(fileName: string): string {
  return fileName.split(".").pop() as string;
}

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * @return Formatted string.
 */
export function fileSizeReadable(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(dp) + " " + units[u];
}

/**
 * Downloads a file provided in the function parameters as a public url.
 * @param {string} url - File url.
 */
export async function downloadFileFromUrl(url: string, fileName: string): Promise<void> {
  const resp = await axios.get(url, {
    responseType: "blob"
  });
  downloadBlob(resp, fileName);
}

/**
 * Downloads a file provided in the function parameters.
 * @param {File} file - File.
 */
export async function downloadFile(file: File) {
  const fileURL = window.URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = fileURL;
  link.setAttribute("download", file.name);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function downloadBlob(response: { data: BlobPart }, fileName: string) {
  const fileURL = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = fileURL;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function fileToBase64DataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result.toString());
      } else {
        reject(new Error("FileReader did not produce a result."));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
