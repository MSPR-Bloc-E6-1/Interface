import React, { useState, useRef, useEffect } from 'react';
import '../components/Home/Home.css';
import logo from '../image/import.png';
import cameraImg from '../image/img_camera.webp';
import photoImg from '../image/photo.png';
import switchCameraImg from '../image/switch.png';

function Home() {
  // Déclaration des états
  const [cameraActive, setCameraActive] = useState(false); // Activation de la caméra
  const [devices, setDevices] = useState([]); // Appareils disponibles
  const videoRef = useRef(); // ref de la caméra
  const [selectedDeviceId, setSelectedDeviceId] = useState(null); // id de l'appareil selectionné
  const [capturedPhotoURL, setCapturedPhotoURL] = useState(null); // URL de la photo capturée

  useEffect(() => {
    // prend la liste des appareils disponibles
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      })
      .catch(error => {
        console.error('Error enumerating devices:', error);
      });
  }, []);

  const changeImage = (e) => {
    // changement d'image
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCapturedPhotoURL(reader.result);
        if (cameraActive) {
          captureImage();
          setCapturedPhotoURL(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  

  const submitImage = () => {
    // image send
    console.log("Image validated "+ capturedPhotoURL);
  };

  const captureImage = () => {
    // Capture de la photo
    const video = videoRef.current;

    if (!cameraActive) { 
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const constraints = {
          video: {
            deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined
          }
        };
        navigator.mediaDevices.getUserMedia(constraints)
          .then(stream => {
            video.srcObject = stream;
            video.play();
            setCameraActive(true); 
            setCapturedPhotoURL(null);
          })
          .catch(error => {
            console.error('Error accessing camera:', error);
          });
      }
    } else {
      video.srcObject.getTracks().forEach(track => track.stop()); 
      setCameraActive(false); 
    }
  };

  const takePhoto = () => {
    // prise de la photo
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL('image/png');
    setCapturedPhotoURL(imageUrl);
    video.srcObject.getTracks().forEach(track => track.stop()); 
    setCameraActive(false); 
  };

  const changeCamera = () => {
    //changement camera
    const currentDeviceIndex = devices.findIndex(device => device.deviceId === selectedDeviceId);
    const nextDeviceIndex = (currentDeviceIndex + 1) % devices.length;
    setSelectedDeviceId(devices[nextDeviceIndex].deviceId);
    setCameraActive(false);
  };

  return (
    <div className='container_home'>
      <div className='container_imported_image'>
        {capturedPhotoURL && <img src={capturedPhotoURL} className="img_importation" alt="Photo prise" />}
        {!cameraActive && !capturedPhotoURL && <p>Aucune image ou caméra active</p>}
        <video ref={videoRef} className='video' style={{ display: cameraActive ? 'block' : 'none' }}></video>
      </div>
      <div className='container_import_valid'>
        <div className='div_import'>
          <img src={logo} alt="Logo" className='img_importation_logo' onClick={() => document.getElementById('fileInput').click()} />
          <input id="fileInput" type="file" accept="image/*" onChange={changeImage} style={{ display: 'none' }} />
        </div>
        <button className={`button_validate ${capturedPhotoURL ? 'validated' : ''}`} onClick={submitImage} disabled={!capturedPhotoURL}>
          Analyser
        </button>

        <button className={`button_capture ${cameraActive ? 'active' : ''}`} onClick={captureImage}>
          <img src={cameraImg} alt="Capture" />
        </button>
        {cameraActive && !capturedPhotoURL && <button className="button_take_photo" onClick={takePhoto}>
          <img src={photoImg} alt="Prendre une photo" />
        </button>}
        {devices.length > 1 && <button className="button_change_camera" onClick={changeCamera}>
          <img src={switchCameraImg} alt="Changer de caméra" />
        </button>}
      </div>
    </div>
  );
}

export default Home;
