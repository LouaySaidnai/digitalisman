'use client';

import React, { useState } from 'react';

interface WebinarFormData {
  title: string;
  date: string;
  time: string;
  type: 'collectif' | 'individuel';
  duration: string;
  maxParticipants?: number;
  description?: string;
}

interface WebinarFormErrors {
  title?: string;
  date?: string;
  time?: string;
  type?: string;
  duration?: string;
  maxParticipants?: string;
  description?: string;
}

interface WebinarFormProps {
  onSubmit: (webinar: WebinarFormData) => void;
  onCancel: () => void;
}

const WebinarForm: React.FC<WebinarFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<WebinarFormData>({
    title: '',
    date: '',
    time: '',
    type: 'collectif',
    duration: '',
    maxParticipants: undefined,
    description: ''
  });

  const [errors, setErrors] = useState<WebinarFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: WebinarFormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }

    if (!formData.date) {
      newErrors.date = 'La date est requise';
    }

    if (!formData.time) {
      newErrors.time = 'L\'heure est requise';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'La durée est requise';
    }

    if (formData.type === 'collectif' && (!formData.maxParticipants || formData.maxParticipants <= 0)) {
      newErrors.maxParticipants = 'Le nombre maximum de participants est requis pour les webinaires collectifs';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof WebinarFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold text-gray-800">Ajouter un webinaire</h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre du webinaire *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ex: Introduction à l'entrepreneuriat"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          {/* Heure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heure *
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.time ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.time && (
              <p className="text-red-500 text-xs mt-1">{errors.time}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de webinaire *
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value as 'collectif' | 'individuel')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="collectif">Webinaire Collectif</option>
              <option value="individuel">Consultation Individuelle</option>
            </select>
          </div>

          {/* Durée */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Durée *
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.duration ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ex: 2 heures, 1h30"
            />
            {errors.duration && (
              <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
            )}
          </div>

          {/* Nombre maximum de participants (pour les webinaires collectifs) */}
          {formData.type === 'collectif' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre maximum de participants *
              </label>
              <input
                type="number"
                value={formData.maxParticipants || ''}
                onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.maxParticipants ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: 50"
                min="1"
              />
              {errors.maxParticipants && (
                <p className="text-red-500 text-xs mt-1">{errors.maxParticipants}</p>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optionnel)
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Description détaillée du webinaire..."
            />
          </div>

          {/* Boutons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Ajouter le webinaire
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebinarForm; 