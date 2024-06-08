const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
            const arrayBuffer = event.target?.result;
            const base64Image = btoa(
                String.fromCharCode(...new Uint8Array(arrayBuffer as ArrayBuffer))
            );
            resolve(base64Image);
        };
        fileReader.onerror = function (error) {
            Promise.reject(`Failed to convert image to Base64: ${error}`);
        };
        fileReader.readAsArrayBuffer(file);
    });
};

export { convertImageToBase64 };