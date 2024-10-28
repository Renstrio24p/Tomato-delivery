
export const getEnvVariable = (key: string, defaultValue?: string): string => {
    const value = process.env[key];
    if (!value) {
        if (defaultValue) {
            return defaultValue;
        }
        throw new Error(`Environment variable ${key} is required but not defined.`);
    }
    return value;
}
