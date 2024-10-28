import jwt from 'jsonwebtoken';
import { getEnvVariable } from './getEnv.mts';

export const createToken = (id: string): string => {
    const secret = getEnvVariable('JWT_SECRET')
    return jwt.sign({ id }, secret, { expiresIn: '1d' })
}