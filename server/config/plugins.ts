export default ({ env }) => ({
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM', 'noreply@aiflawreport.com'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'noreply@aiflawreport.com'),
      },
    },
  },
});
