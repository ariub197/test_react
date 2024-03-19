
class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      valueA: 0,
      valueB: 0
    }
  }

  render() {
    const { valueA, valueB } = this.state;
    const sum = parseInt(valueA) + parseInt(valueB);
    return (<div>
      <input type="text" defaultValue={valueA} onInput={(e) => {
        this.setState({
          valueA: e.target.value
        });
      }} />
      +
          <input type="text" defaultValue={valueB} onInput={(e) => {
        this.setState({
          valueB: e.target.value
        });
      }} />
      =
          <input type="text" value={sum} readOnly />
    </div>);
  }
}

ReactDOM.render(<Calculator />, document.getElementById('app'));
