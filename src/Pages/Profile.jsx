import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Profile = () => {
  // Profile information
  const [profileInfo, setProfileInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: "Free",
    avatar: '',
    caseCount: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);






  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/profile", {
          withCredentials: true
        });

        console.log("API Response:", response.data);

        // Transform API data to match your state structure
        const apiData = response.data;
        const user = apiData.user || apiData;

        setProfileInfo({
          name: user.name || "",
          email: user.email || "",
          registrationDate: "2024-01-15", // You might need to get this from API
          plan: "Free", // You might need to get this from API
          avatar: user.profileImage || "",
          caseCount: user.cases ? user.cases.length : 0,
        });


      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data. Please check your connection.");

      }
    };

    fetchUserData();
  }, []);

  // Cases state
  const [cases, setCases] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCase, setNewCase] = useState({
    title: '',
    description: '',
    file: null
  });

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewCase({ ...newCase, file });
  };

  // Create new case
  /* const handleCreateCase = (e) => {
    e.preventDefault();
    if (newCase.title && newCase.description) {
      const caseData = {
        id: Date.now(),
        title: newCase.title,
        description: newCase.description,
        file: newCase.file,
        createdAt: new Date().toLocaleDateString()
      };

      setCases([...cases, caseData]);
      setProfileInfo({ ...profileInfo, caseCount: profileInfo.caseCount + 1 });
      setNewCase({ title: '', description: '', file: null });
      setShowCreateForm(false);
    }
  }; */
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/profile", {
        withCredentials: true
      });
      setUserData(response.data);
      console.log("User data fetched:", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleCreateCase = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:3000/api/NewCase', newCase, {
      withCredentials: true
    });

    console.log('Case created:', response.data);

    if (response.data.success) {
      // Reset form
      setNewCase({ title: '', description: '' });
      setShowCreateForm(false);

      // Option 1: Add the new case directly to local state (faster UI update)
      if (response.data.case) {
        const newCaseData = response.data.case;
        setCases(prevCases => [...prevCases, newCaseData]);
        setProfileInfo(prev => ({ ...prev, caseCount: prev.caseCount + 1 }));
      }

      // Option 2: Or refresh from server (more reliable)
      // await fetchUserData();

      alert('Case created successfully!');
    } else {
      alert('Failed to create case: ' + response.data.error);
    }

  } catch (error) {
    console.error('Error creating case:', error);
    
    if (error.response?.data?.error) {
      alert('Error: ' + error.response.data.error);
    } else if (error.code === 'ERR_NETWORK') {
      alert('Network error. Please check if the server is running.');
    } else {
      alert('Failed to create case. Please try again.');
    }
  }
};


  // Delete case
  const handleDeleteCase = (caseId) => {
    setCases(cases.filter(case_ => case_.id !== caseId));
    setProfileInfo({ ...profileInfo, caseCount: profileInfo.caseCount - 1 });
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-32 pb-6 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold animate-bounce-slow">
              {profileInfo.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 animate-slide-down">
                {profileInfo.name}
              </h1>
              <p className="text-gray-600 text-lg animate-slide-down" style={{ animationDelay: '0.2s' }}>
                {profileInfo.email}
              </p>
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 animate-count-up">
                  📁 {profileInfo.caseCount} Cases
                </span>
              </div>

              <div className="mt-4">
                <a href="http://localhost:5173/sub"> <button className="inline-flex cursor-pointer items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 animate-count-up">
                  Upgrade To Pro
                </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cases Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Cases</h2>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 animate-pulse-slow"
            >
              + Create New Case
            </button>
          </div>

          {/* Create Case Form */}
          {showCreateForm && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6 animate-slide-down">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Create New Case</h3>
              <form onSubmit={handleCreateCase} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Case Title
                  </label>
                  <input
                    type="text"
                    value={newCase.title}
                    name='title'
                    onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter case title..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newCase.description}
                    name='description'
                    onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    rows="4"
                    placeholder="Enter case description..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File (Optional)
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Create Case
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Cases List */}
          <div className="space-y-4">
            {cases.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No cases yet</h3>
                <p className="text-gray-500">Create your first case to get started!</p>
              </div>
            ) : (
              cases.map((case_, index) => (
                <div
                  key={case_.id}
                  className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {case_.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {case_.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📅 {case_.createdAt}</span>
                        {case_.file && (
                          <div className="flex items-center space-x-2">
                            <span>📎</span>
                            <span className="text-blue-600 font-medium">
                              {case_.file.name}
                            </span>
                            <a
                              href={URL.createObjectURL(case_.file)}
                              download={case_.file.name}
                              className="text-blue-500 hover:text-blue-700 underline"
                            >
                              Download
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteCase(case_.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all duration-300"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
