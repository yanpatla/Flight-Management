import { memo } from "react";
import styled from "@emotion/styled";
interface ISplitText {
  str: string;
}
const SplitText = memo<ISplitText>(({ str }) => {
  return (
    <td>
      {str.split("").map((item, index) => {
        return (
          <Flight str={str} key={index}>
            {item}
          </Flight>
        );
      })}
    </td>
  );
});

const Flight = styled.div<ISplitText>`
  border: solid 4px rgb(26, 26, 26);
  background-color: #000;
  float: left;
  color: ${({ str }) => (str === "malfunction" ? "red" : "white")};
`;

export default SplitText;
