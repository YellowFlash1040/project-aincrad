import Jimp from 'jimp';

import { HttpError } from '../helpers/index.js';

const resizeImage = async (
  imagePath: string,
  width: number = 250,
  height: number = 250
) => {
  try {
    const image = await Jimp.read(imagePath);
    await image.cover(width, height).writeAsync(imagePath);
  } catch (error: any) {
    throw HttpError(
      500,
      `Something went wrong during image resizing. Here is error message: ${error.message}`
    );
  }
};

export default resizeImage;
