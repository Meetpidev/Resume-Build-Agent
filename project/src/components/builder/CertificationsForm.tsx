import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2 } from 'lucide-react';

const CertificationsForm: React.FC = () => {
  const { state, updateSection, prevStep } = useResume();
  const navigate = useNavigate();

  const [certs, setCerts] = useState(
    state.data.certifications?.length ? state.data.certifications : [createEmptyCert()]
  );

  function createEmptyCert() {
    return { id: uuidv4(), name: '', issuer: '', date: '' };
  }

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...certs];
    updated[index] = { ...updated[index], [field]: value };
    setCerts(updated);
  };

  const addCert = () => setCerts([...certs, createEmptyCert()]);

  const removeCert = (index: number) => {
    const updated = certs.filter((_, i) => i !== index);
    setCerts(updated.length ? updated : [createEmptyCert()]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = certs.filter(c => c.name && c.issuer);
    updateSection('certifications', cleaned);
    navigate('/builder/summary');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Certifications</h2>

      {certs.map((cert, index) => (
        <div key={cert.id} className="space-y-2 border p-4 rounded-lg shadow-sm relative">
          <button
            type="button"
            onClick={() => removeCert(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            title="Remove"
          >
            <Trash2 size={18} />
          </button>

          <input
            type="text"
            placeholder="Certification Name"
            value={cert.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            placeholder="Issuer"
            value={cert.issuer}
            onChange={(e) => handleChange(index, 'issuer', e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <input
            type="month"
            value={cert.date}
            onChange={(e) => handleChange(index, 'date', e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addCert}
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <Plus size={18} /> Add Certification
      </button>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => {
            prevStep();
            navigate('/builder/skills');
          }}
          className="btn"
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary">
          Finish
        </button>
      </div>
    </form>
  );
};

export default CertificationsForm;
