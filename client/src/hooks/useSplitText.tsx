import { memo } from "react";

interface ISplitText {
  str: string;
}
const SplitText = memo<ISplitText>(({ str }) => {
  return (
    <td>
      {str.split("").map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </td>
  );
});

export default SplitText;
