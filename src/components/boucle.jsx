import React from 'react';

class Boucle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boucle: {}
    };
  }

  async componentDidMount() {
    const res = await fetch(process.env.NEXT_PUBLIC_BOUCLE_URL);
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
            <td className='border border-black'>
              {this.state.boucle.createdAt}
            </td>
            <td>{this.state.boucle.updatedAt}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Boucle;
