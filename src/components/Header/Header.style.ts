import { css } from '@emotion/react';

export const header = css({
  position: 'fixed',
  top: '0%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  height: '64px',
  width: '382px',
  backgroundColor: 'black',
  padding: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 100,
  p: { color: 'white', fontWeight: 800, fontSize: '20px' }
});

export const cartIcon = css({
  position: 'relative',

  img: {
    width: '32px',
    height: '32px'
  },
  span: {
    position: 'absolute',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: 'white',
    bottom: '0%',
    right: '0%',
    textAlign: 'center',
    fontSize: '14px'
  }
});

export const modalContent = css({
  height: '444px',
  overflowY: 'auto',
  paddingRight: '4px'
});

export const cartItem = css({
  display: 'flex',
  gap: '12px',
  padding: '12px 0',
  borderBottom: '1px solid #eee'
});

export const cartImageWrapper = css({
  width: '80px',
  height: '80px',
  flexShrink: 0
});

export const cartTextBlock = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '4px',
  fontSize: '14px'
});
