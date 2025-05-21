import React from 'react';
import './assistant.css';

const AssistantButton = () => {
  return (
    <a 
      href="https://chatgpt.com/g/g-680e07daf0808191b6a8c2f2f2d12df2-crco-dpdpa-counsel-gpt" 
      target="_blank" 
      rel="noopener noreferrer"
      className="assistant-button"
      aria-label="Chat with DPDPA Guide"
    >
      <img src="/images/assistant.png" alt="DPDPA Guide" />
      <div className="assistant-tooltip">Your DPDPA Guide</div>
    </a>
  );
};

export default AssistantButton;
