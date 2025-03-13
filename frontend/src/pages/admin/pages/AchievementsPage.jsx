import React, { useState, useEffect } from 'react';
import { FaTrophy, FaUsers, FaProjectDiagram, FaChalkboardTeacher, FaFilter, FaTrash, FaEdit, FaPlus, FaCertificate, FaAward, FaStar, FaMedal, FaSearch, FaPencilAlt, FaCog } from 'react-icons/fa';

// Mock data for statistics
const initialStats = {
  awardsWon: 42,
  totalMembers: 150,
  projectsCompleted: 85,
  workshopsConducted: 36
};

// Mock data for achievements - based on the user's provided data structure
const initialAchievements = [
  {
    id: 1,
    title: "National Innovation Award",
    year: "2023",
    icon: "FaTrophy",
    description: "Recognized for outstanding contributions to technological innovation in cybersecurity.",
    category: "Award"
  },
  {
    id: 2,
    title: "Tech Excellence Award",
    year: "2022",
    icon: "FaAward",
    description: "Awarded for excellence in developing cutting-edge solutions for the industry.",
    category: "Award"
  },
  {
    id: 3,
    title: "Community Impact Program",
    year: "2023",
    icon: "FaUsers",
    description: "Successfully implemented a tech education program reaching over 500 underprivileged students.",
    category: "Community"
  },
  {
    id: 4,
    title: "Research Publication",
    year: "2021",
    icon: "FaProjectDiagram",
    description: "Published research on emerging technologies in a renowned international journal.",
    category: "Research"
  },
  {
    id: 5,
    title: "Partnership Milestone",
    year: "2023",
    icon: "FaHandshake",
    description: "Established strategic partnerships with 10 Fortune 500 companies.",
    category: "Business"
  },
  {
    id: 6,
    title: "Innovation Summit",
    year: "2022",
    icon: "FaLightbulb",
    description: "Hosted the largest tech innovation summit in the region with over 2,000 attendees.",
    category: "Event"
  },
  {
    id: 7,
    title: "Global Expansion",
    year: "2022",
    icon: "FaGlobeAmericas",
    description: "Expanded operations to 5 new countries, establishing a truly global presence.",
    category: "Business"
  },
  {
    id: 8,
    title: "Industry Certification Program",
    year: "2023",
    icon: "FaCertificate",
    description: "Established a certification program in partnership with leading tech companies, with 100+ certified graduates.",
    category: "Education"
  }
];

// Categories for the filter
const categories = ["All", "Award", "Community", "Research", "Business", "Event", "Education"];

// Available icons for selection
const iconOptions = [
  { value: "FaTrophy", label: "Trophy", component: <FaTrophy /> },
  { value: "FaAward", label: "Award", component: <FaAward /> },
  { value: "FaCertificate", label: "Certificate", component: <FaCertificate /> },
  { value: "FaMedal", label: "Medal", component: <FaMedal /> },
  { value: "FaStar", label: "Star", component: <FaStar /> },
  { value: "FaUsers", label: "Users", component: <FaUsers /> },
  { value: "FaProjectDiagram", label: "Project", component: <FaProjectDiagram /> },
  { value: "FaChalkboardTeacher", label: "Workshop", component: <FaChalkboardTeacher /> }
];

// Component for statistics card
const StatCard = ({ icon, title, value, color, onEdit }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 ${color} flex items-center relative group`}>
      <div className={`text-${color.replace('border-', '')} mr-4`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold">{value}</h3>
        <p className="text-gray-500 dark:text-gray-400">{title}</p>
      </div>
      <button 
        onClick={onEdit}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400"
        title={`Edit ${title}`}
      >
        <FaPencilAlt size={14} />
      </button>
    </div>
  );
};

// Component for rendering icons based on their name
const DynamicIcon = ({ iconName, className }) => {
  const icon = iconOptions.find(option => option.value === iconName);
  if (!icon) return <FaTrophy className={className} />;
  
  // Clone the element with the new className
  return React.cloneElement(icon.component, { className });
};

const AchievementsPage = () => {
  const [stats, setStats] = useState(initialStats);
  const [achievements, setAchievements] = useState(initialAchievements);
  const [filteredAchievements, setFilteredAchievements] = useState(initialAchievements);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // For adding/editing achievements
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    year: new Date().getFullYear().toString(),
    icon: "FaTrophy",
    description: "",
    category: "Award"
  });
  
  // For editing statistics
  const [isStatsFormOpen, setIsStatsFormOpen] = useState(false);
  const [statsFormData, setStatsFormData] = useState(stats);
  const [currentStatToEdit, setCurrentStatToEdit] = useState(null);

  // Apply filters and search
  useEffect(() => {
    let result = achievements;
    
    // Apply category filter
    if (filter !== "All") {
      result = result.filter(item => item.category === filter);
    }
    
    // Apply search
    if (searchTerm) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredAchievements(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filter, searchTerm, achievements]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAchievements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAchievements.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openAddForm = () => {
    setFormData({
      id: null,
      title: "",
      year: new Date().getFullYear().toString(),
      icon: "FaTrophy",
      description: "",
      category: "Award"
    });
    setEditMode(false);
    setIsFormOpen(true);
  };

  const openEditForm = (achievement) => {
    setFormData(achievement);
    setEditMode(true);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      // Update existing achievement
      setAchievements(achievements.map(item => 
        item.id === formData.id ? formData : item
      ));
    } else {
      // Add new achievement
      const newAchievement = {
        ...formData,
        id: Math.max(...achievements.map(a => a.id), 0) + 1
      };
      setAchievements([...achievements, newAchievement]);
      
      // Update stats when adding a new achievement
      if (formData.category === "Award") {
        setStats({...stats, awardsWon: stats.awardsWon + 1});
      }
    }
    
    closeForm();
  };

  const handleDelete = (id) => {
    const achievementToDelete = achievements.find(a => a.id === id);
    
    // Update stats when deleting an achievement
    if (achievementToDelete && achievementToDelete.category === "Award") {
      setStats({...stats, awardsWon: stats.awardsWon - 1});
    }
    
    setAchievements(achievements.filter(a => a.id !== id));
  };

  // New handlers for statistics editing
  const openStatsForm = (statKey) => {
    setStatsFormData(stats);
    setCurrentStatToEdit(statKey);
    setIsStatsFormOpen(true);
  };

  const closeStatsForm = () => {
    setIsStatsFormOpen(false);
    setCurrentStatToEdit(null);
  };

  const handleStatsInputChange = (e) => {
    const { name, value } = e.target;
    // Ensure the value is a number and positive
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      setStatsFormData({
        ...statsFormData,
        [name]: numValue
      });
    }
  };

  const handleStatsSubmit = (e) => {
    e.preventDefault();
    setStats(statsFormData);
    closeStatsForm();
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Achievements Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setStatsFormData(stats);
              setCurrentStatToEdit('all');
              setIsStatsFormOpen(true);
            }}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center"
            title="Edit All Statistics"
          >
            <FaCog className="mr-2" /> Edit Stats
          </button>
          <button
            onClick={openAddForm}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" /> Add Achievement
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<FaTrophy className="text-3xl" />} 
          title="Awards Won" 
          value={stats.awardsWon} 
          color="border-yellow-500" 
          onEdit={() => openStatsForm('awardsWon')}
        />
        <StatCard 
          icon={<FaUsers className="text-3xl" />} 
          title="Total Members" 
          value={stats.totalMembers} 
          color="border-blue-500" 
          onEdit={() => openStatsForm('totalMembers')}
        />
        <StatCard 
          icon={<FaProjectDiagram className="text-3xl" />} 
          title="Projects Completed" 
          value={stats.projectsCompleted} 
          color="border-green-500" 
          onEdit={() => openStatsForm('projectsCompleted')}
        />
        <StatCard 
          icon={<FaChalkboardTeacher className="text-3xl" />} 
          title="Workshops Conducted" 
          value={stats.workshopsConducted} 
          color="border-purple-500" 
          onEdit={() => openStatsForm('workshopsConducted')}
        />
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search achievements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-10 pr-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Achievements Table */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Achievement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((achievement) => (
                <tr key={achievement.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-cyan-100 dark:bg-cyan-900 rounded-full">
                        <DynamicIcon iconName={achievement.icon} className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{achievement.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{achievement.year}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {achievement.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">{achievement.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditForm(achievement)}
                      className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-900 dark:hover:text-cyan-300 mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(achievement.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                  currentPage === 1 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {indexOfLastItem > filteredAchievements.length ? filteredAchievements.length : indexOfLastItem}
                  </span>{' '}
                  of <span className="font-medium">{filteredAchievements.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                        currentPage === index + 1
                          ? 'z-10 bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Edit Form Modal */}
      {isStatsFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentStatToEdit === 'all' ? 'Edit All Statistics' : 
                   currentStatToEdit === 'awardsWon' ? 'Edit Awards Won' :
                   currentStatToEdit === 'totalMembers' ? 'Edit Total Members' :
                   currentStatToEdit === 'projectsCompleted' ? 'Edit Projects Completed' :
                   'Edit Workshops Conducted'}
                </h2>
                <button onClick={closeStatsForm} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleStatsSubmit}>
                <div className="space-y-4">
                  {(currentStatToEdit === 'all' || currentStatToEdit === 'awardsWon') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Awards Won</label>
                      <div className="flex items-center">
                        <FaTrophy className="text-yellow-500 mr-2" />
                        <input
                          type="number"
                          name="awardsWon"
                          value={statsFormData.awardsWon}
                          onChange={handleStatsInputChange}
                          min="0"
                          required
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>
                  )}
                  
                  {(currentStatToEdit === 'all' || currentStatToEdit === 'totalMembers') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Members</label>
                      <div className="flex items-center">
                        <FaUsers className="text-blue-500 mr-2" />
                        <input
                          type="number"
                          name="totalMembers"
                          value={statsFormData.totalMembers}
                          onChange={handleStatsInputChange}
                          min="0"
                          required
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>
                  )}
                  
                  {(currentStatToEdit === 'all' || currentStatToEdit === 'projectsCompleted') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Projects Completed</label>
                      <div className="flex items-center">
                        <FaProjectDiagram className="text-green-500 mr-2" />
                        <input
                          type="number"
                          name="projectsCompleted"
                          value={statsFormData.projectsCompleted}
                          onChange={handleStatsInputChange}
                          min="0"
                          required
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>
                  )}
                  
                  {(currentStatToEdit === 'all' || currentStatToEdit === 'workshopsConducted') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Workshops Conducted</label>
                      <div className="flex items-center">
                        <FaChalkboardTeacher className="text-purple-500 mr-2" />
                        <input
                          type="number"
                          name="workshopsConducted"
                          value={statsFormData.workshopsConducted}
                          onChange={handleStatsInputChange}
                          min="0"
                          required
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Submit buttons */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeStatsForm}
                      className="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Add/Edit Achievement Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editMode ? 'Edit Achievement' : 'Add New Achievement'}
                </h2>
                <button onClick={closeForm} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Achievement Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                      placeholder="Enter achievement title"
                    />
                  </div>
                  
                  {/* Year and Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                      <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                        placeholder="2023"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                      >
                        {categories.filter(c => c !== "All").map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Icon Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label>
                    <div className="grid grid-cols-4 gap-2">
                      {iconOptions.map(icon => (
                        <div
                          key={icon.value}
                          onClick={() => setFormData({...formData, icon: icon.value})}
                          className={`p-2 border rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            formData.icon === icon.value ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {React.cloneElement(icon.component, { className: 'text-xl text-gray-700 dark:text-gray-300' })}
                          <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">{icon.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                      placeholder="Enter achievement description"
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeForm}
                      className="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
                    >
                      {editMode ? 'Update Achievement' : 'Add Achievement'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsPage; 