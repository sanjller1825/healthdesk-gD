export default function Table({ columns = [], data = [] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map(c => <th key={c.key || c.header}>{c.header}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row,idx)=>(
          <tr key={row.id || idx} className="hover:bg-slate-50">
            {columns.map(c => (
              <td key={c.key || c.header}>
                {c.render ? c.render(row) : row[c.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
