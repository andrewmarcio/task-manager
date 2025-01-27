import { useEffect, useRef, useState } from "react";

export function useDebounce(value: string, delay: number = 500) {
    const timer = useRef<NodeJS.Timeout>()
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        if (timer.current) clearTimeout(timer.current)
            
        timer.current = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer.current);
        };
    }, [value, delay]);

    return debouncedValue;

}