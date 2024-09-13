import React, { useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { EmojiModalWrapper } from './styled';

const EmojiModal = ({ onConfirm, onCancel }) => {
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        onCancel();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);

  return (
    <EmojiModalWrapper ref={emojiPickerRef}>
      <EmojiPicker onEmojiClick={onConfirm} />
    </EmojiModalWrapper>
  );
};

export default React.memo(EmojiModal);
