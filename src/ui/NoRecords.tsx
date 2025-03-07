import { FileX } from "lucide-react";


export default function NoRecords() {
  return (
    <div className=" flex flex-col items-center justify-center p-8  rounded-2xl border border-gray/20 w-96 mx-auto">
        <FileX size={100} className="text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-800">No records found</h2>
        <p className="text-gray-500">There are not records to display</p>
        
    </div>
  )
}
