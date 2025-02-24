export {};

declare global {
  interface Window {
    electron: {
      savePdf: (pdfUrl: string) => Promise<{ success: boolean; error?: string }>;
    };
  }
}
