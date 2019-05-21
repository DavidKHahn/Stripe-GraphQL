import styled from 'styled-components';

export const HeaderButton = styled('div')`
cursor: pointer;
user-select: none;
transition: background 120ms ease-in 0s;
width: auto;
padding: 4px 10px;
border-radius: 3px;
flex-shrink: 0;
font-size: 15px;
margin-left: 2px;
margin-right: 2px;
font-weight: 500;
&: hover {
    background-color: rgba(50, 50, 50, .08);
}
`