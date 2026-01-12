import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log('Selected file:', e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    console.log('formData:', formData);

    try {
      const response = await axios.post('/api/image/validate', formData);
      console.log(response.data)
      const { result: res, blurPercentage } = response.data;
      setResult(`${res} - ${blurPercentage === 0 ? '100% clear' : blurPercentage + '% blur'}`);
    } catch (error) {
      console.error(error);
      setResult('Error validating image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Agentic AI Doc Checker</h2><hr/>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload from device:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {/* <div>
          <label>Capture from camera:</label>
          <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} />
        </div> */}
        {image && (
          <div>
            <h3>Preview:</h3>
            <img src={URL.createObjectURL(image)} alt="preview" style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
          </div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>
      {result && <h2>Result: {result}</h2>}
    </div>
  );
};

export default App;