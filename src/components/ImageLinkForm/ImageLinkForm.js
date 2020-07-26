import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div>
     <p className='f3'>
         {'This reco dude recognise faces in the picture you give'}
     </p>
     <div className='center'>
        <div className='center form pa4 br3 shadow-5'>
         <input type='tex' className='f4 pa2 w-70 center' onChange={onInputChange} style={{border: 'none', outline:'none'}}/>
         <button className ='w-30 grow f4 ph3 pv2 dib white bg-light-purple btn-detect' onClick={onButtonSubmit} style={{border: 'none', outline:'none'}}>Detect</button>
         </div>
     </div>
    </div>
  );
};

export default ImageLinkForm;
