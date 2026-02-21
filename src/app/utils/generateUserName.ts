export const generateUserName = (
  firstName: string,
  lastName?: string
): string => {
  const randomNum = Math.floor(Math.random() * 900) + 100;
  const first = firstName?.replace(/\s+/g, '').substring(0, 6) || 'user';
  const lastInitial = lastName?.charAt(0) || '';

  const userName = `${first}${lastInitial}${randomNum}`.toLowerCase();

  return userName;
};
