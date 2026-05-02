import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set JWT as HTTP-Only cookie, wait, standard JWT usually sends it in JSON
  // but let's just return it for the standard Authorization header approach
  // Let's stick to standard returning token in body if they want standard JWT Auth,
  // or I can do cookies. "standard JWT auth" usually means sending token in JSON response and client stores in localstorage or Redux state.
  return token;
};

export default generateToken;
