import { Star, MapPin, Briefcase, X } from "lucide-react";
import {  useNavigate } from "react-router-dom";

interface ProfessionalModalProps {
    profile: any;
    isOpen: boolean;
    onClose: () => void;
}

const ProfessionalModal: React.FC<ProfessionalModalProps> = ({ profile, isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen || !profile) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="flex items-center">
                    <img
                        src={profile.image}
                        alt={profile.name}
                        className="h-20 w-20 rounded-full"
                    />
                    <div className="ml-4">
                        <h3 className="text-2xl font-semibold text-gray-900">{profile.name}</h3>
                        <p className="text-gray-500">{profile.title}</p>
                    </div>
                </div>

                <div className="mt-4 flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-900">{profile.rating}</span>
                    <span className="ml-1 text-gray-500">
                        ({profile.reviews.length} reviews)
                    </span>
                </div>

                <div className="mt-4 space-y-2">
                    <div className="flex items-center text-gray-500">
                        <MapPin className="h-5 w-5 mr-2" />
                        {profile.location}
                    </div>
                    <div className="flex items-center text-gray-500">
                        <Briefcase className="h-5 w-5 mr-2" />
                        {profile.experience} experience
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Specialties:</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {profile.skills?.map((specialty: string, index: number) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                            >
                                {specialty}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex justify-between">
    <button
        onClick={onClose}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
        Close
    </button>
    <button
            onClick={() => navigate('/chat', { state: { id: profile._id } })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
        Go to Chat
    </button>
</div>


            </div>
        </div>
    );
};

export default ProfessionalModal;
