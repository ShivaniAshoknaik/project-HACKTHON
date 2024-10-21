import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Loader2, Info } from 'lucide-react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

interface Disease {
  name: string;
  description: string;
  solution: string;
}

const diseases: Disease[] = [
  {
    name: "Eczema",
    description: "A condition that causes the skin to become itchy, red, dry, and cracked.",
    solution: "Use moisturizers, avoid triggers, and consider topical corticosteroids as prescribed by a doctor."
  },
  {
    name: "Psoriasis",
    description: "A condition causing red, flaky, crusty patches of skin covered with silvery scales.",
    solution: "Topical treatments, light therapy, and in severe cases, oral or injected medications."
  },
  {
    name: "Acne",
    description: "A skin condition that occurs when hair follicles become plugged with oil and dead skin cells.",
    solution: "Keep skin clean, use over-the-counter acne products, and consider prescription medications for severe cases."
  }
];

const SkinDiseaseDetection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<Disease | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!model) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      let imageElement: HTMLImageElement | null = null;

      if (selectedImage) {
        imageElement = new Image();
        imageElement.src = selectedImage;
        await new Promise((resolve) => {
          imageElement!.onload = resolve;
        });
      } else if (webcamRef.current) {
        const screenshot = webcamRef.current.getScreenshot();
        if (screenshot) {
          imageElement = new Image();
          imageElement.src = screenshot;
          await new Promise((resolve) => {
            imageElement!.onload = resolve;
          });
        }
      }

      if (imageElement) {
        const tfImg = tf.browser.fromPixels(imageElement).toFloat();
        const resized = tf.image.resizeBilinear(tfImg, [224, 224]);
        const normalized = resized.div(255.0);
        const batched = normalized.expandDims(0);
        const predictions = await model.classify(batched);

        // For demonstration purposes, we'll map the top prediction to one of our predefined diseases
        const topPrediction = predictions[0];
        const diseaseIndex = Math.floor(topPrediction.probability * diseases.length);
        setResult(diseases[diseaseIndex]);
      }
    } catch (error) {
      console.error('Error during analysis:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
    setSelectedImage(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Skin Disease Detection</h1>
      <div className="mb-6">
        <div className="flex justify-center space-x-4 mb-4">
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Image
            <input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
          </label>
          <button
            onClick={toggleCamera}
            className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition duration-300"
          >
            <Camera className="w-5 h-5 mr-2" />
            {isCameraActive ? 'Disable Camera' : 'Use Camera'}
          </button>
        </div>
        {isCameraActive ? (
          <div className="mb-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: 'user' }}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        ) : selectedImage && (
          <div className="mb-4">
            <img src={selectedImage} alt="Selected" className="w-full h-64 object-cover rounded-lg" />
          </div>
        )}
      </div>
      <button
        onClick={handleAnalyze}
        disabled={(!selectedImage && !isCameraActive) || isAnalyzing || !model}
        className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
      >
        {isAnalyzing ? (
          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
        ) : (
          'Analyze Skin'
        )}
      </button>
      {result && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">{result.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{result.description}</p>
          <h3 className="text-lg font-semibold text-blue-700 mb-1">Suggested Solution:</h3>
          <p className="text-sm text-gray-600">{result.solution}</p>
        </div>
      )}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 flex items-center justify-center">
          <Info className="w-4 h-4 mr-2 text-blue-500" />
          This is a simulated frontend using a general-purpose image classification model. For accurate skin disease detection, please consult a healthcare professional.
        </p>
      </div>
    </div>
  );
};

export default SkinDiseaseDetection;