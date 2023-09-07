import React from 'react';
import { BackTop } from '@douyinfe/semi-ui';
import { IconArrowUp } from '@douyinfe/semi-icons';

const Custom = () => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    borderRadius: '100%',
    backgroundColor: '#0077fa',
    color: '#fff',
    bottom: 100,
  };

  return (
    <div>
      <BackTop style={style}>
        <IconArrowUp />
      </BackTop>
    </div>
  );
};

export default Custom;
