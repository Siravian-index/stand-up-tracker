import { TemplateType } from "@/schema/template"
import Link from "next/link"


interface Props {
    template: TemplateType
}


const Template = ({ template }: Props) => {


    return (
        <div>
            <Link href={`/home/daily/${template.id}`}>{template.name} </Link>
        </div>
    )

}

export default Template