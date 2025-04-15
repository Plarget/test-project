import React, { memo, useCallback } from 'react';

const Button: React.FC<any> = ({children, ...rest}) => {
  return (
    <button {...rest}>{children}</button>
  )
}

export default memo(Button);
