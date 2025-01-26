import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {toast} from "sonner";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function ToastMessage(message: string, descriptionMessage: string) {
    console.log("inside toast");
    toast(message, {
        description: descriptionMessage,
        action: {
            label: "ok",
            onClick: () => console.log(""),
        },
    })
}
