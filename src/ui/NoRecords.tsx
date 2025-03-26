import { FileX } from "lucide-react";


export default function NoRecords() {
  return (
    <div className=" flex flex-col items-center justify-center p-8  rounded-3xl    border border-gray/20 w-full">
        <FileX size={100} className="text-blue" />
        <h2 className="text-2xl font-semibold text-gray/20">No records found</h2>
        <p className="text-gray/10">There are not records to display</p>
        
    </div>
  )
}
