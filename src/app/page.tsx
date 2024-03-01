import TableExportRow from "./components/TableExportRow";

export default async function page() {

  // Check auth and permission for export page

  // You might want to request ALL table names from 
  // your database. MySQL example: 

  // `SELECT table_name FROM information_schema.tables 
  // WHERE table_schema = 'your-database-name'`


  return (
    <section className="container flex flex-col p-12 min-h-screen text-base">
      <TableExportRow table="Todos" />
      <TableExportRow table="Users" />
      <TableExportRow table="Books" />
    </section>
  )

}