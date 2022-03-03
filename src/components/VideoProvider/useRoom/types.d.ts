export { }

declare global {
  interface Window { TwilioVideo: typeof import('twilio-video'); }
}