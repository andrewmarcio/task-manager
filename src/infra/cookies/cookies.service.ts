import { CookiesService } from '@domain/cookies/cookies.service'
import Cookies from 'js-cookie'

export function cookiesService(): CookiesService {
    return {
        get: (name: string): string | undefined => {
            return Cookies.get(name)
        },
        set: (name: string, value: string, options?: Cookies.CookieAttributes): void => {
            Cookies.set(name, value, options)
        },
        remove: (name: string) => Cookies.remove(name)
    }
}