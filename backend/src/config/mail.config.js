import Resend from 'resend';
import Mailgen from 'mailgen';
import config from './index.js';

let resendClient = null;
let mailGenerator = null;

if (config.mail.apiKey) {
  resendClient = new Resend(config.mail.apiKey);
}

mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: config.mail.appName,
    link: process.env.APP_URL || 'http://localhost:3000',
  },
});

export { resendClient, mailGenerator };
export default { resendClient, mailGenerator };
