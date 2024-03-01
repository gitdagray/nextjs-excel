import Link from "next/link"

export default function TableExportRow(
    { table }: { table: string }
) {

    const lowercaseTable = table.toLowerCase()

    return (
        <div className="flex flex-col sm:flex-row justify-between sm:px-2 py-4 border-solid border-b-2 last:border-none hover:bg-accent text-sm sm:text-base">
            <p>{table}</p>
            <span className="flex gap-4 pt-2 sm:pt-0">
                <Link className="hover:underline" href={`/api/tables/${lowercaseTable}?format=xlsx`}>XLSX</Link>
                <Link className="hover:underline" href={`/api/tables/${lowercaseTable}?format=csv`}>CSV</Link>
                <Link className="hover:underline" href={`/api/tables/${lowercaseTable}?format=txt`}>TXT</Link>
                <Link className="hover:underline" href={`/api/tables/${lowercaseTable}?format=json`}>JSON</Link>
                <Link className="hover:underline" href={`/api/tables/${lowercaseTable}`}>HTML</Link>
            </span>
        </div>
    )
}