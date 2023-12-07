import React from 'react';
import '../css/genericTable.css';

class GenericTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: props.columns,
      data: props.data,
      numRows: props.numRows,
      numCols: props.numCols
    };
  }

  render() {
    const { columns, data, numRows, numCols } = this.state;
    return (
      <table className='generic-table'>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default GenericTable;
