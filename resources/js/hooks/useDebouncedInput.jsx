import { debounce } from "lodash";
import { useRef } from "react";

export default function useDebouncedInput (fn,delay) {
    return useRef(
        debounce((event) => {
            fn(event)
        }, delay)
    ).current;
}
