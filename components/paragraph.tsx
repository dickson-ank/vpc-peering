interface ParagraphProps {
    children?: React.ReactNode
}

export function Paragraph({ children }: ParagraphProps) {
    return (
        <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">{children}</p>
    )
}