import { transport } from '../constants/index.js';
import { HttpError } from '../helpers/index.js';

export const sendEmail = async (email: string, token: string) => {
  const mail = {
    from: {
      name: 'Node.js homework',
      address: 'memecom@meta.ua'
    },
    to: email,
    subject: 'Confirm your email',
    html: `<p>Hi. My name is Andrew. This email was sent to you as a part of homework on a node.js block. To verify your email you need either to run your backend on a port :3000 and just click on the link below or copy the link below and edit it to your needs<br/>
              Click here to verify your email: http://localhost:3000/api/users/verify/${token}
              </p>`
  };

  try {
    await transport.sendMail(mail);
  } catch (error) {
    throw HttpError(500, 'Something went wrong during sending an email');
  }
};
