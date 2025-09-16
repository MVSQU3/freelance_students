// components/MotivationModal.jsx
import { X, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useApplyStore } from "../store/useApplyStore";

const MotivationModal = ({ isOpen, onClose, title, company, stageId }) => {
  const [formData, setFormData] = useState({ coverLetter: "" });
  const { setApplying, isApplying } = useApplyStore();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setApplying(stageId, { coverLetter: formData.coverLetter });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* En-tête */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Postuler à {title}
            </h2>
            <p className="text-gray-600">Chez {company}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 max-h-[70vh] overflow-y-auto"
        >
          {/* Section lettre de motivation */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">
              Lettre de motivation
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-3 flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                Personnalisez votre lettre de motivation pour augmenter vos
                chances. Expliquez pourquoi vous êtes le candidat idéal pour ce
                stage.
              </p>
            </div>
            <textarea
              className="textarea textarea-bordered w-full h-40"
              placeholder="Chère équipe de recrutement, ..."
              value={formData.coverLetter}
              onChange={(e) =>
                setFormData({ ...formData, coverLetter: e.target.value })
              }
              required
            ></textarea>
            <p className="text-xs text-gray-500 mt-2">
              {/* {formData.coverLetter.length}/2000 caractères */}
            </p>
          </div>

          {/* Conseils */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">
              Conseils pour votre lettre :
            </h4>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Présentez-vous brièvement</li>
              <li>Expliquez pourquoi ce stage vous intéresse</li>
              <li>Mettez en avant vos compétences pertinentes</li>
              <li>Soyez concis et professionnel</li>
            </ul>
          </div>
        </form>

        {/* Pied de modal */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button type="button" onClick={onClose} className="btn btn-outline">
            Annuler
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={isApplying}
          >
            {isApplying ? "Envoi en cours..." : "Soumettre ma candidature"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotivationModal;
