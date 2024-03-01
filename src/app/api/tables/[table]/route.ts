import { type NextRequest } from "next/server"
import * as XLSX from 'xlsx'

// For loading example data 
import { promises as fs } from 'fs';

export async function GET(
    request: NextRequest,
    { params }: { params: { table: string } }
) {

    // Check auth & permission here

    const searchParams = request.nextUrl.searchParams
    const format = searchParams.get('format')

    try {
        const { table } = params

        if (!table) throw new Error('Table name required')

        // Pseudo-code steps:
        // 1. GET all table names from db

        // 2. Find the table that matches the param

        // 3. If table name doesn't exist, throw error 

        // 4. If it does exist, use the matching table name 
        // for the proper case
        const tableName = "Todos"

        // 5. Query the table data from database
        // ** Using static data in this example

        // Loading example data 
        const file = await fs.readFile(process.cwd() + '/example-data/data.json', 'utf8');
        const jsonTableData = JSON.parse(file);

        console.log(jsonTableData)



        const worksheet = XLSX.utils.json_to_sheet(jsonTableData)

        if (format === 'csv') {

            const csv = XLSX.utils.sheet_to_csv(worksheet, {
                forceQuotes: true,
            })

            return new Response(csv, {
                status: 200,
                headers: {
                    'Content-Disposition': `attachment; filename="${tableName}.csv"`,
                    'Content-Type': 'text/csv',
                }
            })
        }
        else if (format === 'txt') { // tab-separated values

            const txt = XLSX.utils.sheet_to_txt(worksheet, {
                forceQuotes: true,
            })

            return new Response(txt, {
                status: 200,
                headers: {
                    'Content-Disposition': `attachment; filename="${tableName}.txt"`,
                    'Content-Type': 'text/csv',
                }
            })
        }
        else if (format === 'xlsx') {
            const workbook = XLSX.utils.book_new()

            XLSX.utils.book_append_sheet(workbook, worksheet, "MySheet")

            const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

            return new Response(buf, {
                status: 200,
                headers: {
                    'Content-Disposition': `attachment; filename="${tableName}.xlsx"`,
                    'Content-Type': 'application/vnd.ms-excel',
                }
            })
        }
        else if (format === 'json') {
            return Response.json(jsonTableData)
        }
        else {

            const html = XLSX.utils.sheet_to_html(worksheet)

            return new Response(html, {
                status: 200,
                headers: {
                    'Content-Type': 'text/html',
                }
            })
        }
    } catch (e) {
        if (e instanceof Error) {
            console.error(e)
            return new Response(e.message, {
                status: 400,
            })
        }
    }
}