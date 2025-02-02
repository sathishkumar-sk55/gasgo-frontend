// lib/enga_venumo/passwordUtils.ts
// utils/password.ts
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 12;

if (!SALT_ROUNDS || SALT_ROUNDS < 10) {
    throw new Error('Invalid/Missing SALT_ROUNDS environment variable');
}

export async function saltAndHashPassword(password:any): Promise<string> {
    if (!password || password.length < 8) {
        throw new Error('Password must be at least 8 characters');
    }

    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error('Password hashing error:', error);
        throw new Error('Password processing failed');
    }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    if (!password || !hashedPassword) return false;

    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error('Password verification error:', error);
        return false;
    }
}