export function environmentService() {
    return {
        baseApiUrl: import.meta.env.VITE_APP_BASE_API_URL,
    }
}