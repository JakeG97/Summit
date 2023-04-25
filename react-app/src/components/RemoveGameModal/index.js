import React from 'react';
import { useModal } from '../../context/Modal';

const RemoveGameModal = ({ game, onClose }) => {
  const { closeModal } = useModal();

  const handleRemove = async () => {
    await fetch(`/api/library/${game.game_id}`, {
      method: 'DELETE'
    });
    onClose();
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to uninstall {game.title}?</h2>
        <div className="modal-actions">
          <button onClick={handleRemove}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveGameModal;
