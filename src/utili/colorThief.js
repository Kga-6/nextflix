import ColorThief from 'colorthief';

const get_Color = async (img) => {
  const image = new Image();
  image.src = img;

  const imageReady = () => {
    console.log("color thief working...");
    const colorThief = new ColorThief();
    try {
      return colorThief.getColor(image);
    } catch (error) {
      console.error("Error extracting color from image:", error);
      return [255, 255, 255];
    }
  };

  if (image.complete) {
    return imageReady();
  } else {
    return new Promise((resolve) => {
      image.addEventListener("load", () => {
        resolve(imageReady());
      });
    });
  }
  
};

export default get_Color;