import { memo } from "react";

interface ISplitText {
  str: string;
}
const SplitText = memo<ISplitText>(({ str }) => {
  return (
    <div>
      {str.split("").map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </div>
  );
});

export default SplitText;
