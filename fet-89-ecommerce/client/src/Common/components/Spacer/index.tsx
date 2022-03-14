type Height = {
  height?: number;
};

type Width = {
  width?: number;
};

export const Spacer = (props: Height | Width) => {
  if ('width' in props) {
    return <div style={{ width: props.width }} />;
  };

  if ('height' in props) {
    return <div style={{ height: props.height }} />;
  };

  return <></>;
};
