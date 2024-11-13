import { Tokens } from 'csrf';

const tokens = new Tokens();
const SECRET = process.env.CSRF_SECRET || 'your-csrf-secret-key';

export function generateToken() {
  return tokens.create(SECRET);
}

export function verifyToken(token) {
  return tokens.verify(SECRET, token);
}