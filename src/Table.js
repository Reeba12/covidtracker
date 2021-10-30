import React from 'react'

const Table = ({countries}) => {
    return (
        <>
            <div className="tabledata">
               {countries.map(({country,cases})=>(
                    <tr>
                        <td>{country}</td>
                        <td><strong>{cases}</strong></td>
                    </tr>
                ))
                }
            </div>
        </>
    )
}

export default Table