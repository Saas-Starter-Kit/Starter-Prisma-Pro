import { SendVerificationRequestParams } from 'next-auth/providers';
import { resend } from '../init/resend';
import { GetUserByEmail } from '../../Database/user/queries';
import config from '@/lib/config/marketing';
import MagicLinkEmail from '../../../../../emails/MagicLink';
import { renderAsync } from '@react-email/render';

export const sendVerificationRequest = async ({
  url,
  identifier
}: SendVerificationRequestParams) => {
  const user = await GetUserByEmail({ email: identifier });
  const site = config.metadate.title.default;

  const userVerified = user?.emailVerified ? true : false;
  const authSubject = userVerified ? `Sign-in link for ${site}` : 'Activate your account';

  //https://github.com/resendlabs/resend-node/issues/256
  const html = await renderAsync(
    MagicLinkEmail({
      firstName: user?.name as string,
      actionUrl: url,
      mailType: userVerified ? 'login' : 'register',
      siteName: site
    })
  );

  try {
    await resend.emails.send({
      from: 'My SaaS <onboarding@resend.dev>',
      to: process.env.NODE_ENV === 'development' ? 'delivered@resend.dev' : identifier,
      subject: authSubject,
      html,
      // Set this to prevent Gmail from threading emails.
      // More info: https://resend.com/changelog/custom-email-headers
      headers: {
        'X-Entity-Ref-ID': new Date().getTime() + ''
      }
    });
  } catch (error) {
    throw new Error('Failed to send verification email.');
  }
};
