import fs from 'fs/promises';
import path from 'path';

import { HttpError } from '../helpers/index.js';

export const replaceFileToPublicFolder = async (
  fileName: string,
  publicFolderName: string
) => {
  try {
    const temporaryDirPath = path.resolve('./tmp');
    const publicDirPath = path.resolve('./public');

    const oldPath = path.join(temporaryDirPath, fileName);
    const newPath = path.join(publicDirPath, publicFolderName, fileName);

    await fs.rename(oldPath, newPath);

    const pathForApiRequest = path
      .join('/', publicFolderName, fileName)
      .replace(/\\/g, '/');

    return pathForApiRequest;
  } catch (error: any) {
    throw HttpError(
      500,
      `Something went wrong during file replacement. Here is an error message: ${error.message}`
    );
  }
};

export default replaceFileToPublicFolder;
