import { Avatar } from "@heroui/react";
import clsx from "clsx";

export function ICmsAvatar({
    url,
    alt,
    size,
    fontSizeClassName,
    className,
    backgroundClassName = 'bg-gradient-to-tr from-pink-500 to-yellow-500 p-0.5 text-white'
}: Readonly<{
    url?: string,
    alt: string,
    size?: "sm" | "lg" | "md"
    className?: string
    fontSizeClassName?: string
    backgroundClassName?: string
}>) {
    return (
        <Avatar className={className} size={size}>
            <Avatar.Image alt={alt} src={url} />
            <Avatar.Fallback className={clsx(backgroundClassName, fontSizeClassName)}>
                {alt.substring(0, 1)}
            </Avatar.Fallback>
        </Avatar>
    );
}