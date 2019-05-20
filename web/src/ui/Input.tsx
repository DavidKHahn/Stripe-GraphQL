import * as React from "react";
import styled from 'styled-components';
// hover over "input" element + copy and paste React.Detailed... (alternate method instead of labeling out types for each element)
interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  label: string;
//   type: string;
//   name: string;
//   placeholder: string;
//   value: string;
//   onChange: any;
}

const Label = styled("div")`
    font-size: 11px;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgb(55, 53, 47, 0.6);
    font-weight: 500;
`

export class Input extends React.PureComponent<Props> {
  render() {
    const { label, ...inputProps} = this.props;
    return (
      <div>
        <Label>{label}</Label>
        <div>
          <input {...inputProps} />
        </div>
      </div>
    );
  }
}
