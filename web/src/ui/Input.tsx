import * as React from "react";
import styled from "styled-components";
// hover over "input" element + copy and paste React.Detailed... (alternate method instead of labeling out types for each element)
interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
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
`;

const InputContainer = styled("div")`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 15px;
  line-height: 26px;
  padding: 4px 10px;
  position: relative;
  border-radius: 3px;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset,
    rgba(15, 15, 15, 0.1) 0px 1px 1px inset;
  background: white;
  cursor: text;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const InputWithoutBorder = styled("input")`
  font-size: inherit;
  line-height: inherit;
  border: none;
  background: none;
  width: 100%;
  display: block;
  resize: none;
  padding: 0px;
  &::placeholder {
    color: #b6b6b5;
    font-weight: 200;
  }
`;

export class Input extends React.PureComponent<Props> {
  render() {
    const { label, ...inputProps } = this.props;
    return (
      <div>
        <Label>{label}</Label>
        <InputContainer>
          <InputWithoutBorder {...inputProps as any} />
        </InputContainer>
      </div>
    );
  }
}
