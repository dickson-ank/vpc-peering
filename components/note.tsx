import React from "react"
import { Paragraph } from "./paragraph"

interface NoteProps {
    note1: React.ReactNode
    note2?: React.ReactNode
    grid?: boolean
}

export default function Note({ note1, note2, grid }: NoteProps){
        if (grid){
            return(
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6" >
                <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Key Points / Best Practices</h3>
                    <Paragraph>
                        {note1}
                    </Paragraph>
                </div>
                <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border">
                    <Paragraph>
                        {note2}
                    </Paragraph>
                </div>
            </div>
        )
        }
    return(
        <div className="gradient-card p-4 sm:p-6 rounded-lg border border-border mb-6">
            <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Key Points / Best Practices</h3>
            <Paragraph>
                {note1}
            </Paragraph>
        </div>
    )
}