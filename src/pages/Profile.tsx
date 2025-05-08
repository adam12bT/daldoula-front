import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Star, Edit, Camera } from 'lucide-react';
import { getOneUser, updateUser } from '../service/service';
import { User } from '../entity/user';
import { jwtDecode } from 'jwt-decode';
import ProfessionalModal from '../components/proflemodel';

const Profile = () => {
  const token = localStorage.getItem("token");
  let userId = null;
  const [error, setError] = useState('');
  const [profile, setProfile] = useState<User>({});
  const [isEditing, setisEditing] = useState(false);





  if (token) {
    try {
      const decodedToken = jwtDecode<{ _id: string }>(token);
      console.log(decodedToken)
      userId = decodedToken.id; // Extract user ID
      console.log(userId)
    } catch (error) {
      console.error("Invalid token:", error);
      setError("Invalid token. Please log in again.");
    }
  } else {
    console.error("No token found");
    setError("Authentication required. Please log in.");
  }

  const fetchUserById = async () => {
    if (!userId || !token) {
      console.error("User ID or token missing");
      return;
    }

    try {
      const response = await getOneUser(userId, token);
      console.log(response)
      if (response) {
        setProfile(response.user);
      } else {
        setError("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("API error:", error);
      setError("Error fetching user data. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserById();

  }, []);
  const handleSave = async () => {
    if (!userId || !token) {
      setError("User ID or token missing.");
      return;
    }

    try {
      const updatedUser = await updateUser(userId, profile);
      setProfile(updatedUser);
      setisEditing(false);
      alert("Profile updated successfully!");
      fetchUserById();

    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile.");
    }
  };
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }


  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "daldoula"); // replace this
    formData.append("cloud_name", "dzo9rz7km"); // replace this
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dzo9rz7km/image/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      console.log("Uploaded Image URL:", data.secure_url);
  
      setProfile({ ...profile, image: data.secure_url }); // set image URL in profile
    } catch (err) {
      console.error("Cloudinary upload failed", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="relative h-48 rounded-t-lg bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="absolute -bottom-16 left-8">
            <div className="relative">


              <img
                src={profile.image || "https://via.placeholder.com/150"}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-white"
              />*


                      {isEditing && (
  <div className="absolute bottom-0 right-0">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="absolute inset-0 opacity-0 cursor-pointer"
    />
    <button className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
      <Camera className="h-5 w-5" />
    </button>
  </div>
    )}
            </div>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setisEditing(true)}
              className="absolute top-4 right-4 flex items-center px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="absolute top-4 right-4 flex items-center px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700"
            >
              Save Changes
            </button>
          )}
        </div>

        {/* Profile Info */}
        <div className="mt-20 px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  profile.name
                )}
              </h1>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    profile.email
                  )}
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-2" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    profile.phone
                  )}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    profile.location
                  )}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  Member since {profile.createdAt}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-600">{profile.bio}</p>
                )}
              </div>

              {/*}   div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>*/}
            </div>

            {/* Right Column - Stats */}
            <div className="lg:border-l lg:pl-8">
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <Star className="h-6 w-6 text-yellow-400 fill-current" />
                    <span className="ml-2 text-2xl font-bold text-gray-900">{profile.rating}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed Jobs</h3>
                  <p className="text-3xl font-bold text-blue-600">{profile?.reviews?.length ?? 0}</p>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;