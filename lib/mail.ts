/**
 * Mail is unset. This foundation does not connect an email provider and does
 * not read credentials, so submissions fail closed instead of reporting success.
 */
export function isMailConfigured(): boolean {
  return false;
}
