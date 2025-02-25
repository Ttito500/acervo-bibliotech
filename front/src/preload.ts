// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  savePdf: (response: any) => ipcRenderer.invoke('save-pdf', response),
  getStoreValue: (key: string) => ipcRenderer.invoke('getStoreValue', key),
  setStoreValue: (key: string, value: any) => ipcRenderer.invoke('setStoreValue', key, value),
  sairDoAplicativo: () => ipcRenderer.send('sair-do-aplicativo')
});
