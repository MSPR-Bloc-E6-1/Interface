import React, { useState, useRef, useEffect } from 'react';
import '../components/Home/Home.css';
import logo from '../image/import.png';
import cameraImg from '../image/img_camera.webp';
import photoImg from '../image/photo.png';
import switchCameraImg from '../image/switch.png';
import axios from 'axios';
import animalPrint from '../image/animal_print.png'; // Importez votre image d'empreinte d'animal

function Home() {
  const [cameraActive, setCameraActive] = useState(false);
  const [devices, setDevices] = useState([]);
  const videoRef = useRef();
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [capturedPhotoURL, setCapturedPhotoURL] = useState(null);

  useEffect(() => {
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
    if (capturedPhotoURL) {
      fetch(capturedPhotoURL)
        .then(res => res.blob())
        .then(blob => {
          const formData = new FormData();
          formData.append('file', blob);
  
          axios.post('http://localhost:5000/predict', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            if(response.data['predicted_class'] === "background"){
              window.location.href = '/';
            }else{
              // Stocker la réponse dans le stockage local
              localStorage.setItem('prediction', response.data['predicted_class']);
  
              // Rediriger vers la page Chargement
              window.location.href = '/analyse';
            }
          })
          .catch(error => {
            console.error('Error predicting:', error);
          });
        })
        .catch(error => {
          console.error('Error converting image to blob:', error);
        });
    } else {
      console.error('No image captured.');
    }
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
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // mettre l'image en jpeg
    const imageUrl = canvas.toDataURL('image/jpeg');
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
        {cameraActive && (
          <img src={animalPrint} alt="Empreinte d'animal" className="animal_print" />
        )}
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
        {devices.length >= 1 && <button className="button_change_camera" onClick={changeCamera}>
          <img src={switchCameraImg} alt="Changer de caméra" />
        </button>}
      </div>
    </div>
  );
}

export default Home;
