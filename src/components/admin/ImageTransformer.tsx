'use client';

import { useState, useEffect, useCallback } from 'react';
import { getOptimizedImageUrl, extractPublicId, isCloudinaryUrl } from '@/lib/cloudinary';
import { OptimizedImage } from '@/components/OptimizedImage';

interface ImageTransformerProps {
  imageUrl: string;
  onTransform: (transformedUrl: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface TransformationSettings {
  width: number;
  height: number;
  crop: 'fill' | 'fit' | 'limit' | 'scale' | 'crop' | 'pad';
  quality: 'auto' | 'auto:low' | 'auto:good' | 'auto:best' | number;
  format: 'auto' | 'webp' | 'jpg' | 'png';
  gravity: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
  effects: {
    brightness: number;
    contrast: number;
    saturation: number;
    blur: number;
    sharpen: number;
  };
  border: {
    enabled: boolean;
    width: number;
    color: string;
  };
  overlay: {
    enabled: boolean;
    text: string;
    fontSize: number;
    color: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  };
}

export default function ImageTransformer({
  imageUrl,
  onTransform,
  isOpen,
  onClose
}: ImageTransformerProps) {
  const [settings, setSettings] = useState<TransformationSettings>({
    width: 800,
    height: 600,
    crop: 'fit',
    quality: 'auto:good',
    format: 'auto',
    gravity: 'auto',
    effects: {
      brightness: 0,
      contrast: 0,
      saturation: 0,
      blur: 0,
      sharpen: 0,
    },
    border: {
      enabled: false,
      width: 5,
      color: '#000000',
    },
    overlay: {
      enabled: false,
      text: 'Sample Text',
      fontSize: 36,
      color: '#ffffff',
      position: 'bottom-right',
    },
  });

  const [transformedUrl, setTransformedUrl] = useState(imageUrl);
  const [activeTab, setActiveTab] = useState<'resize' | 'effects' | 'overlay' | 'border'>('resize');
  const [isTransforming, setIsTransforming] = useState(false);

  const publicId = isCloudinaryUrl(imageUrl) ? extractPublicId(imageUrl) : null;

  const generateTransformedUrl = useCallback(() => {
    if (!publicId) return;

    setIsTransforming(true);

    try {
      // Build transformation parameters
      const transformParams: any = {
        width: settings.width,
        height: settings.height,
        crop: settings.crop,
        quality: settings.quality,
        format: settings.format,
        gravity: settings.gravity,
      };

      // Add effects if they're not default values
      if (settings.effects.brightness !== 0) {
        transformParams.brightness = settings.effects.brightness;
      }
      if (settings.effects.contrast !== 0) {
        transformParams.contrast = settings.effects.contrast;
      }
      if (settings.effects.saturation !== 0) {
        transformParams.saturation = settings.effects.saturation;
      }
      if (settings.effects.blur > 0) {
        transformParams.blur = settings.effects.blur;
      }
      if (settings.effects.sharpen > 0) {
        transformParams.sharpen = settings.effects.sharpen;
      }

      // Add border if enabled
      if (settings.border.enabled) {
        transformParams.border = `${settings.border.width}px_solid_${settings.border.color.replace('#', '')}`;
      }

      // Note: Overlay text would require more complex URL building
      // For now, we'll focus on the basic transformations

      const newUrl = getOptimizedImageUrl(publicId, transformParams);
      setTransformedUrl(newUrl);
    } catch (error) {
      console.error('Error generating transformed URL:', error);
    } finally {
      setIsTransforming(false);
    }
  }, [publicId, settings]);

  useEffect(() => {
    if (publicId) {
      generateTransformedUrl();
    }
  }, [settings, publicId, generateTransformedUrl]);

  const resetSettings = () => {
    setSettings({
      width: 800,
      height: 600,
      crop: 'fit',
      quality: 'auto:good',
      format: 'auto',
      gravity: 'auto',
      effects: {
        brightness: 0,
        contrast: 0,
        saturation: 0,
        blur: 0,
        sharpen: 0,
      },
      border: {
        enabled: false,
        width: 5,
        color: '#000000',
      },
      overlay: {
        enabled: false,
        text: 'Sample Text',
        fontSize: 36,
        color: '#ffffff',
        position: 'bottom-right',
      },
    });
  };

  const handleApply = () => {
    onTransform(transformedUrl);
    onClose();
  };

  const updateSettings = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateEffects = (effect: string, value: number) => {
    setSettings(prev => ({
      ...prev,
      effects: {
        ...prev.effects,
        [effect]: value
      }
    }));
  };

  const updateBorder = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      border: {
        ...prev.border,
        [key]: value
      }
    }));
  };

  const updateOverlay = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      overlay: {
        ...prev.overlay,
        [key]: value
      }
    }));
  };

  if (!isOpen || !publicId) return null;

  return (
    <div className="image-transformer-overlay">
      <div className="image-transformer-modal">
        <div className="modal-header">
          <h5 className="modal-title">Transform Image</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <div className="modal-body">
          <div className="row">
            {/* Preview */}
            <div className="col-lg-8">
              <div className="preview-section">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">Preview</h6>
                  <div>
                    {isTransforming && (
                      <span className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </span>
                    )}
                    <span className="text-muted small">
                      {settings.width} × {settings.height}
                    </span>
                  </div>
                </div>
                <div className="preview-container">
                  <OptimizedImage
                    src={transformedUrl}
                    alt="Transformed preview"
                    width={settings.width}
                    height={settings.height}
                    className="preview-image"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="col-lg-4">
              <div className="controls-section">
                {/* Tabs */}
                <ul className="nav nav-tabs mb-3">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'resize' ? 'active' : ''}`}
                      onClick={() => setActiveTab('resize')}
                    >
                      Resize
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'effects' ? 'active' : ''}`}
                      onClick={() => setActiveTab('effects')}
                    >
                      Effects
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'border' ? 'active' : ''}`}
                      onClick={() => setActiveTab('border')}
                    >
                      Border
                    </button>
                  </li>
                </ul>

                {/* Resize Tab */}
                {activeTab === 'resize' && (
                  <div className="tab-content">
                    <div className="mb-3">
                      <label className="form-label">Width</label>
                      <input
                        type="number"
                        className="form-control"
                        value={settings.width}
                        onChange={(e) => updateSettings('width', parseInt(e.target.value))}
                        min="1"
                        max="3000"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Height</label>
                      <input
                        type="number"
                        className="form-control"
                        value={settings.height}
                        onChange={(e) => updateSettings('height', parseInt(e.target.value))}
                        min="1"
                        max="3000"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Crop Mode</label>
                      <select
                        className="form-select"
                        value={settings.crop}
                        onChange={(e) => updateSettings('crop', e.target.value)}
                      >
                        <option value="fit">Fit</option>
                        <option value="fill">Fill</option>
                        <option value="limit">Limit</option>
                        <option value="scale">Scale</option>
                        <option value="crop">Crop</option>
                        <option value="pad">Pad</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Gravity</label>
                      <select
                        className="form-select"
                        value={settings.gravity}
                        onChange={(e) => updateSettings('gravity', e.target.value)}
                      >
                        <option value="auto">Auto</option>
                        <option value="face">Face</option>
                        <option value="center">Center</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Quality</label>
                      <select
                        className="form-select"
                        value={settings.quality}
                        onChange={(e) => updateSettings('quality', e.target.value)}
                      >
                        <option value="auto:low">Auto Low</option>
                        <option value="auto:good">Auto Good</option>
                        <option value="auto:best">Auto Best</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Format</label>
                      <select
                        className="form-select"
                        value={settings.format}
                        onChange={(e) => updateSettings('format', e.target.value)}
                      >
                        <option value="auto">Auto</option>
                        <option value="webp">WebP</option>
                        <option value="jpg">JPEG</option>
                        <option value="png">PNG</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Effects Tab */}
                {activeTab === 'effects' && (
                  <div className="tab-content">
                    <div className="mb-3">
                      <label className="form-label">
                        Brightness ({settings.effects.brightness})
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        min="-100"
                        max="100"
                        value={settings.effects.brightness}
                        onChange={(e) => updateEffects('brightness', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Contrast ({settings.effects.contrast})
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        min="-100"
                        max="100"
                        value={settings.effects.contrast}
                        onChange={(e) => updateEffects('contrast', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Saturation ({settings.effects.saturation})
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        min="-100"
                        max="100"
                        value={settings.effects.saturation}
                        onChange={(e) => updateEffects('saturation', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Blur ({settings.effects.blur})
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="50"
                        value={settings.effects.blur}
                        onChange={(e) => updateEffects('blur', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Sharpen ({settings.effects.sharpen})
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="100"
                        value={settings.effects.sharpen}
                        onChange={(e) => updateEffects('sharpen', parseInt(e.target.value))}
                      />
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => updateSettings('effects', {
                        brightness: 0,
                        contrast: 0,
                        saturation: 0,
                        blur: 0,
                        sharpen: 0,
                      })}
                    >
                      Reset Effects
                    </button>
                  </div>
                )}

                {/* Border Tab */}
                {activeTab === 'border' && (
                  <div className="tab-content">
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={settings.border.enabled}
                          onChange={(e) => updateBorder('enabled', e.target.checked)}
                        />
                        <label className="form-check-label">
                          Enable Border
                        </label>
                      </div>
                    </div>

                    {settings.border.enabled && (
                      <>
                        <div className="mb-3">
                          <label className="form-label">Border Width (px)</label>
                          <input
                            type="number"
                            className="form-control"
                            value={settings.border.width}
                            onChange={(e) => updateBorder('width', parseInt(e.target.value))}
                            min="1"
                            max="50"
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Border Color</label>
                          <input
                            type="color"
                            className="form-control form-control-color"
                            value={settings.border.color}
                            onChange={(e) => updateBorder('color', e.target.value)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" onClick={resetSettings}>
            Reset All
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleApply}>
            Apply Transformation
          </button>
        </div>
      </div>

      <style jsx>{`
        .image-transformer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
          padding: 1rem;
        }

        .image-transformer-modal {
          background: white;
          border-radius: 8px;
          width: 100%;
          max-width: 1400px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid #dee2e6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .modal-body {
          padding: 1.5rem;
          flex: 1;
          overflow-y: auto;
        }

        .modal-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid #dee2e6;
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .preview-container {
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 1rem;
          background: #f8f9fa;
          text-align: center;
          max-height: 60vh;
          overflow: auto;
        }

        .preview-image {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .nav-tabs .nav-link {
          border: none;
          color: #6c757d;
          font-size: 0.875rem;
          padding: 0.5rem 0.75rem;
        }

        .nav-tabs .nav-link.active {
          background-color: transparent;
          border-bottom: 2px solid #0d6efd;
          color: #0d6efd;
        }

        .tab-content {
          max-height: 400px;
          overflow-y: auto;
        }

        @media (max-width: 991.98px) {
          .image-transformer-modal {
            margin: 0.5rem;
            max-height: 95vh;
          }

          .modal-header,
          .modal-body,
          .modal-footer {
            padding: 1rem;
          }

          .preview-container {
            max-height: 40vh;
          }
        }
      `}</style>
    </div>
  );
}