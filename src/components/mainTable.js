import React from 'react';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boucle: {}
    };
  }

  async componentDidMount() {
    const res = await fetch('http://localhost:8000/api/boucles/1');
    this.setState({
      boucle: await res.json()
    });
  }

  render() {
    return (
      <table className='border border-black'>
        <thead className='border border-black'>
          <tr>
            <th colSpan='2'>{this.state.boucle._id}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border border-black'>The table body</td>
            <td>with two columns</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Table;
