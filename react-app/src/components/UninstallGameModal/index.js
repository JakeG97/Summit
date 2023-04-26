import React, { useEffect } from 'react';
import { useModal } from '../../context/Modal';

const UninstallGameModal = ({ game, onClose }) => {
  const { setModalContent, setOnModalClose, closeModal } = useModal();

  const handleRemove = () => {
    onClose(); 
  };

  const handleCancel = () => {
    onClose(); 
  };

  const content = (
    <div>
      <h2>Are you sure you want to uninstall "{game.title}"?</h2>
      <div>
        <button onClick={handleRemove}>Uninstall</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );

  useEffect(() => {
    setModalContent(content);
    setOnModalClose(onClose);
    closeModal();
  }, []);

  return null;
};

export default UninstallGameModal;
