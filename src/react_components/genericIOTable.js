import React, { Component } from 'react';

class GenericIOTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  renderTableHeader() {
    const { titleHeadings } = this.props; 

    if (!Array.isArray(titleHeadings)) {
        return null;
    }

    return (
      <tr>
        {titleHeadings.map((heading, index) => (
          <th key={index}>{heading}</th>
        ))}
      </tr>
    );
  }

  renderTableData() {
    const { numRows, numCols, disableEditing } = this.props;
    const { data } = this.state;

    return Array.from({ length: numRows }).map((_, rowIndex) => (
      <tr key={rowIndex}>
        {Array.from({ length: numCols }).map((_, colIndex) => (
          <td key={colIndex}>
            {disableEditing ? (
              data[rowIndex][colIndex]
            ) : (
              <input
                type="text"
                value={data[rowIndex][colIndex]}
                onChange={(e) => this.handleInputChange(e, rowIndex, colIndex)}
              />
            )}
          </td>
        ))}
      </tr>
    ));
  }

  handleInputChange(e, rowIndex, colIndex) {
    const { data } = this.state;
    const newData = [...data];
    newData[rowIndex][colIndex] = e.target.value;
    this.setState({ data: newData });
  }

  render() {
    return (
      <div>
        <h2>Generic Table</h2>
        <table>
          <thead>{this.renderTableHeader()}</thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default GenericIOTable;
