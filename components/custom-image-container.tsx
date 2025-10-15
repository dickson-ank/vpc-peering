import { ReactNode } from "react"


interface ImageAttributes{
    src: string
    alt: string
    id?: string
    className?: string
    children?: ReactNode

    selectedImage: (src: string) => void
}

export function ImageContainer({src, alt, id,className, children, selectedImage} : ImageAttributes){
    return(

        <div className={`bg-card my-6 !scroll-mt-120 border border-border rounded-lg p-1 ${className}`}>
            <img
            src={src}
            alt={alt}
            id={id}
            className="w-full h-auto rounded cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => selectedImage(src)}
            />
            
            {children}
        </div>

    )
}
