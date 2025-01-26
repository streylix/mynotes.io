import React, { useState } from 'react';
import { Modal, ItemPresets } from './Modal';

function UnlockNoteModal({ isOpen, onClose, onConfirm }) {
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const [showPassword, setShowPassword] = useState(false);

 const handleSubmit = () => {
   if (!password) {
     setError('Please enter the password');
     return;
   }
   onConfirm(password);
 };

 const handleKeyPress = (e) => {
   if (e.key === 'Enter') {
     handleSubmit();
   }
 };

 const sections = [{
   items: [{
     content: (
       <div className="outer-small">
         <div className="inner-small">
           <label>Password</label>
           <input 
             type={showPassword ? "text" : "password"}
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             onKeyPress={handleKeyPress}
             placeholder="Enter password"
           />
         </div>
         {error && <div style={{ color: '#ff4444', fontSize: '14px', marginTop: '8px' }}>{error}</div>}
         <ItemPresets.TEXT_SWITCH
           label="Show password"
           value={showPassword}
           onChange={() => setShowPassword(!showPassword)}
         />
         <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
           <button onClick={onClose} style={{ flex: 1 }}>Cancel</button>
           <button className="primary" onClick={handleSubmit} style={{ flex: 1 }}>Unlock</button>
         </div>
       </div>
     )
   }]
 }];

 return (
   <Modal
     isOpen={isOpen}
     onClose={onClose}
     title="Unlock Note"
     sections={sections}
     size="small"
   />
 );
}

export default UnlockNoteModal;