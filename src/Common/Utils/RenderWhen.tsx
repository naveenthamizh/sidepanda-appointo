import React from "react";

type WhenProps = {
  children: React.ReactNode;
  isTrue?: boolean;
  limit?: number;
};
interface IfProps {
  children: any;
  isTrue: boolean;
}
export const RenderWhen = ({
  limit = 1,
  isTrue = true,
  children,
}: WhenProps): JSX.Element => {
  const list: React.ReactNode[] = [];
  if (isTrue !== true) {
    return <></>;
  }
  React.Children.map(children, (child: any) => {
    const { isTrue: isChildTrue } = child?.props || {};
    if (isChildTrue === true && list.length < limit!) {
      list.push(child);
    }
  });
  return <>{list}</>;
};

RenderWhen.If = ({ children, isTrue }: IfProps) => isTrue && children;
