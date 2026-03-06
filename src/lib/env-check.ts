export interface EnvCheckResult {
  isValid: boolean;
  missingVars: string[];
  errorMessage?: string;
}

export function checkRequiredEnvVars(): EnvCheckResult {
  const requiredVars = [
    { key: 'VITE_GOOGLE_MAPS_API_KEY', name: 'Google Maps API Key' },
    { key: 'VITE_GEMINI_API_KEY', name: 'Gemini API Key' },
  ];

  const missingVars: string[] = [];

  for (const { key, name } of requiredVars) {
    const value = import.meta.env[key];
    if (!value || value.trim() === '') {
      missingVars.push(name);
    }
  }

  if (missingVars.length > 0) {
    return {
      isValid: false,
      missingVars,
      errorMessage: `Missing required environment variables: ${missingVars.join(', ')}. Please check your .env file.`,
    };
  }

  return {
    isValid: true,
    missingVars: [],
  };
}
