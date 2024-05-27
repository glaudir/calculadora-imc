import { LabelHTMLAttributes } from "react";

function Label({children, ...props}: LabelHTMLAttributes<HTMLLabelElement> & {children: React.ReactNode, }) {
    return(
        <label className="block text-netral-600 font-light" {...props}>{children}</label>
    )
}

export default Label;