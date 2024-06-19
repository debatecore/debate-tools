const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      let binary = "";
      const bytes = new Uint8Array(arrayBuffer);
      const length = bytes.length;
      for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64Image = btoa(binary);
      resolve(base64Image);
    };
    fileReader.onerror = function (error) {
      Promise.reject(`Failed to convert image to Base64: ${error}`);
    };
    fileReader.readAsArrayBuffer(file);
  });
};

export { convertImageToBase64 };
