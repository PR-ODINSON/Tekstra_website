import React, { useState } from 'react';
import { FaUsers, FaSearch, FaPlus, FaEdit, FaTrash, FaFilter, FaGithub, FaLinkedin, FaEnvelope, FaUserTie, FaUserFriends, FaUserAstronaut } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Mock data for team members
const mockTeamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "President",
    image: "https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png",
    bio: "Full-stack developer with a passion for AI and machine learning.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
    category: "Executives"
  },
  {
    id: 2,
    name: "Jamie Lee",
    role: "Software Engineer",
    image: "https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png",
    bio: "Specializes in backend development and cloud computing.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
    category: "Associate Members"
  },
  {
    id: 3,
    name: "Taylor Kim",
    role: "Tech Visionary",
    image: "https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png",
    bio: "Innovator in the field of augmented reality and virtual reality.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
    category: "Tech Visionary Members"
  }
];

// Role badge component
const RoleBadge = ({ role }) => {
  const getRoleStyles = () => {
    switch(role.toLowerCase()) {
      case 'lead developer':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'frontend developer':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'backend developer':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'ui/ux designer':
        return 'bg-pink-100 text-pink-800 border-pink-300';
      case 'mobile developer':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleStyles()}`}>
      {role}
    </span>
  );
};

// Skills tag component
const SkillTag = ({ skill }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 mr-1 mb-1">
      {skill}
    </span>
  );
};

const TeamPage = () => {
  const [team, setTeam] = useState(mockTeamMembers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    role: '',
    image: '',
    bio: '',
    social: {
      github: '',
      linkedin: '',
      twitter: ''
    },
    category: 'Executives'
  });

  const openAddForm = () => {
    setFormData({
      id: null,
      name: '',
      role: '',
      image: '',
      bio: '',
      social: {
        github: '',
        linkedin: '',
        twitter: ''
      },
      category: 'Executives'
    });
    setEditMode(false);
    setIsFormOpen(true);
  };

  const openEditForm = (member) => {
    setFormData(member);
    setEditMode(true);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      social: {
        ...formData.social,
        [name]: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setTeam(team.map(member => member.id === formData.id ? formData : member));
    } else {
      const newMember = {
        ...formData,
        id: Math.max(...team.map(m => m.id), 0) + 1
      };
      setTeam([...team, newMember]);
    }
    closeForm();
  };

  const handleDelete = (id) => {
    setTeam(team.filter(member => member.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <FaUsers className="mr-3 text-purple-600" />
            Team Management
          </h1>
          <p className="text-gray-600 mt-1">Manage team members, roles, and profiles</p>
        </div>
        <button
          onClick={openAddForm}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
        >
          <FaPlus className="mr-2" />
          Add Team Member
        </button>
      </div>
      
      {/* Filters and Search */}
     


      

      
      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(member => (
          <div key={member.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4">{member.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">{member.role}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">{member.bio}</p>
            <div className="flex justify-center space-x-2 mt-2">
              <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <FaUserTie />
              </a>
              <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <FaUserFriends />
              </a>
              <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <FaUserAstronaut />
              </a>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => openEditForm(member)}
                className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-900 dark:hover:text-cyan-300"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Simple pagination indicator */}
      <div className="bg-white px-4 py-3 rounded-lg shadow sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{team.length}</span> of <span className="font-medium">{team.length}</span> team members
          </div>
          <div className="flex-1 flex justify-end">
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={true}
            >
              Previous
            </button>
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={true}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {isFormOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 p-4">
    <div className="bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">
          {editMode ? 'Edit Team Member' : 'Add New Team Member'}
        </h2>
        <button onClick={closeForm} className="text-gray-400 hover:text-gray-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter role"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500"
              placeholder="Image URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500"
            >
              <option value="Executives">Executives</option>
              <option value="Associate Members">Associate Members</option>
              <option value="Tech Visionary Members">Tech Visionary Members</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              required
              rows={2}
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter bio"
            ></textarea>
          </div>

          {/* Social Links */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">GitHub</label>
            <input
              type="text"
              name="github"
              value={formData.social.github}
              onChange={handleSocialChange}
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500"
              placeholder="GitHub URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.social.linkedin}
              onChange={handleSocialChange}
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500"
              placeholder="LinkedIn URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Twitter</label>
            <input
              type="text"
              name="twitter"
              value={formData.social.twitter}
              onChange={handleSocialChange}
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500"
              placeholder="Twitter URL"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={closeForm}
            className="mr-2 px-4 py-2 border border-gray-600 rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
          >
            {editMode ? 'Update Member' : 'Add Member'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default TeamPage; 