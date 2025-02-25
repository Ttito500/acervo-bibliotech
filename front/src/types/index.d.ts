export {};

declare global {
  interface Window {
    electron: {
      savePdf: (pdfUrl: string) => Promise<{ success: boolean; error?: string }>;
      getStoreValue: (key: string) => Promise<any>;
      setStoreValue: (key: string, value: any) => Promise<any>;
      sairDoAplicativo: () => void;
    };
  }
}
