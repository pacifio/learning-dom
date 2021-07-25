const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 450;

const image1 = new Image();
image1.src = "./yoda.jpeg";

image1.addEventListener("load", function () {
  ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
  const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const scannedData = scannedImage.data;
  for (let i = 0; i < scannedData.length; i += 4) {
    const total = scannedData[i] + scannedData[i + 1] + scannedData[i + 2];
    const avg = total / 3;
    scannedData[i] = avg + 2;
    scannedData[i + 1] = avg + 10;
    scannedData[i + 2] = avg - 100;
  }

  scannedImage.data = scannedData;
  ctx.putImageData(scannedImage, 0, 0);
});
