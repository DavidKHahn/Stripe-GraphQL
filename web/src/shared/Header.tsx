import * as React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          height: 50,
          width: "100%",
          backgroundColor: "#fafafa",
          display: "flex",
          justifyContent: 'space-around',
          padding: 10
        }}
      >
        <Link to='/'>
        <h2>Striple Example</h2>
        </Link>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
      </div>
    );
  }
}
