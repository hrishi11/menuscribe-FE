import React, { useState } from 'react';

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vw',
  height: 'auto',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
  backgroundColor: '#fff',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const captureButtonStyles = {
  position: 'absolute',
  bottom: '50px',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  border: '2px solid #fff',
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const uploadTextStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '14px',
  color: '#fff',
  cursor: 'pointer',
  opacity: 1,
  transition: 'opacity 0.3s ease-in-out',
};

const closeButtonStyles = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
  zIndex:1002
};

const retryButtonStyles = {
  position: 'absolute',
  bottom: '50px',
  width: '50px',
  height: '50px',
  backgroundColor: '#fff',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex:1001
};

const CameraModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [stream, setStream] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = React.useRef();
  const uploadTextRef = React.useRef();
  const [showRetryButton, setShowRetryButton] = useState(false);

  const openModal = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        setStream(stream);
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  };

  const closeModal = () => {
    if (stream) {
        // Stop all tracks in the MediaStream
        stream.getTracks().forEach((track) => {
          track.stop();
        });
        setStream(null); // Reset the stream state to null
      }
      setImageSrc(null);
      setShowRetryButton(false);
      onRequestClose();
    const videoElement = videoRef.current;
  if (videoElement) {
    videoElement.srcObject = null;
  }
  };
  const capture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');
    setImageSrc(imageData);
    setShowRetryButton(true);
  };


  const retryCapture = () => {
    setImageSrc(null);
    setShowRetryButton(false);
    openModal();
  };

  React.useEffect(() => {
    if (isOpen) {
      openModal();
    }
    return ()=>{
        if (stream) {
            // Stop all tracks in the MediaStream
            stream.getTracks().forEach((track) => {
              track.stop();
            });
            setStream(null); // Reset the stream state to null
          }
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  const handleSubmit = () => {
    onSubmit(imageSrc)
    setImageSrc(null);
    setShowRetryButton(false);
    onRequestClose();
  }
  return (
    <div style={overlayStyles} onClick={closeModal}>
      <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} style={closeButtonStyles}>X</button>
        {imageSrc ? (
          <>
            <img 
            src={imageSrc} alt="Captured" style={{ maxWidth: '100%', maxHeight: 'calc(100% - 70px)', marginBottom: '20px',borderRadius: '8px' }}/>
            <div 
              ref={uploadTextRef} 
              style={{ ...uploadTextStyles, backgroundColor: '#007bff', padding: '5px 10px', borderRadius: '5px' }}
              onClick={handleSubmit}
              >
              Upload
            </div>
          </>
        ) : (
            <video ref={videoRef} autoPlay style={{ width: '100%', height: 'calc(100% - 70px)', marginBottom: '20px',borderRadius: '8px' }}></video>
        )}
        {!imageSrc ? (
          <button onClick={capture} style={captureButtonStyles}></button>
        ):(<button onClick={retryCapture} style={retryButtonStyles}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M11 6h2v5h3l-4 4-4-4h3zm10-4v18c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V2c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-2 18V6h-4v2h-4V6H5v14h14z"/>
            </svg>
          </button>)}
      </div>
    </div>
  );
};

export default CameraModal;
