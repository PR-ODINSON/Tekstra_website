import React, { useState } from 'react';

const AdminEventsPage = () => {
  // Initial data
  const initialEvents = [
    {
      id: 1,
      title: "Hackathon 2023",
      date: "Dec 15-17, 2023",
      time: "48 Hours",
      location: "Main Campus",
      description:
        "Join us for a 48-hour coding marathon. Build innovative solutions and compete for amazing prizes.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Hackathon", "Competition"],
    }
  ];

  const initialPastEvents = [
    {
      id: 1,
      title: "Hackathon 2023",
      date: "October 15-16, 2023",
      image: "/events/hackathon.jpg",
      description: "48-hour coding marathon where teams built innovative solutions for real-world problems.",
      stats: {
        participants: 150,
        projects: 32,
        prizes: "$5000"
      }
    }
  ];

  // State management
  const [events, setEvents] = useState(initialEvents);
  const [pastEvents, setPastEvents] = useState(initialPastEvents);
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Form states
  const [showEventForm, setShowEventForm] = useState(false);
  const [showPastEventForm, setShowPastEventForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tempTags, setTempTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  // Event form
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: "",
    tags: []
  });

  // Past event form
  const [pastEventForm, setPastEventForm] = useState({
    title: "",
    date: "",
    image: "",
    description: "",
    stats: {
      participants: 0,
      projects: 0,
      prizes: ""
    }
  });

  // Helper functions
  const resetEventForm = () => {
    setEventForm({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      image: "",
      tags: []
    });
    setTempTags([]);
    setEditingId(null);
  };

  const resetPastEventForm = () => {
    setPastEventForm({
      title: "",
      date: "",
      image: "",
      description: "",
      stats: {
        participants: 0,
        projects: 0,
        prizes: ""
      }
    });
    setEditingId(null);
  };

  // Event handlers
  const handleAddTag = () => {
    if (currentTag.trim() !== "") {
      setTempTags([...tempTags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTempTags(tempTags.filter(tag => tag !== tagToRemove));
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventForm({
      ...eventForm,
      [name]: value
    });
  };

  const handlePastEventChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("stats.")) {
      const statName = name.split(".")[1];
      setPastEventForm({
        ...pastEventForm,
        stats: {
          ...pastEventForm.stats,
          [statName]: value
        }
      });
    } else {
      setPastEventForm({
        ...pastEventForm,
        [name]: value
      });
    }
  };

  const handleImageChange = (e, formType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (formType === 'event') {
          setEventForm({
            ...eventForm,
            image: reader.result
          });
        } else {
          setPastEventForm({
            ...pastEventForm,
            image: reader.result
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    
    const updatedEvent = {
      ...eventForm,
      tags: tempTags,
      id: editingId || Date.now()
    };

    if (editingId) {
      setEvents(events.map(event => event.id === editingId ? updatedEvent : event));
    } else {
      setEvents([...events, updatedEvent]);
    }
    
    resetEventForm();
    setShowEventForm(false);
  };

  const handleSubmitPastEvent = (e) => {
    e.preventDefault();
    
    const updatedEvent = {
      ...pastEventForm,
      id: editingId || Date.now()
    };

    if (editingId) {
      setPastEvents(pastEvents.map(event => event.id === editingId ? updatedEvent : event));
    } else {
      setPastEvents([...pastEvents, updatedEvent]);
    }
    
    resetPastEventForm();
    setShowPastEventForm(false);
  };

  const handleEditEvent = (event) => {
    setEventForm(event);
    setTempTags(event.tags || []);
    setEditingId(event.id);
    setShowEventForm(true);
  };

  const handleEditPastEvent = (event) => {
    setPastEventForm(event);
    setEditingId(event.id);
    setShowPastEventForm(true);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleDeletePastEvent = (id) => {
    setPastEvents(pastEvents.filter(event => event.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Events Admin</h1>
      
      {/* Tabs */}
      <div className="mb-6 border-b">
        <div className="flex gap-4">
          <button 
            className={`py-2 px-4 ${activeTab === 'upcoming' ? 'font-bold border-b-2 border-blue-500' : ''}`} 
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Events
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'past' ? 'font-bold border-b-2 border-blue-500' : ''}`} 
            onClick={() => setActiveTab('past')}
          >
            Past Events
          </button>
        </div>
      </div>
      
      {/* Upcoming Events */}
      <div className={activeTab === 'upcoming' ? 'block' : 'hidden'}>
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center gap-2"
            onClick={() => {
              resetEventForm();
              setShowEventForm(true);
            }}
          >
            <span>Add Event</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Events List */}
        <div className="overflow-x-auto bg-black p-4 rounded-md">
  <table className="min-w-full shadow-md rounded-md">
    <thead className="bg-gray-800 text-white">
      <tr>
        <th className="py-3 px-4 text-left">Title</th>
        <th className="py-3 px-4 text-left">Date</th>
        <th className="py-3 px-4 text-left">Time</th>
        <th className="py-3 px-4 text-left">Location</th>
        <th className="py-3 px-4 text-left">Tags</th>
        <th className="py-3 px-4 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {events.map((event, index) => (
        <tr key={event.id} className={`border-t ${index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"} text-white hover:bg-gray-700 transition`}>
          <td className="py-3 px-4">{event.title}</td>
          <td className="py-3 px-4">{event.date}</td>
          <td className="py-3 px-4">{event.time}</td>
          <td className="py-3 px-4">{event.location}</td>
          <td className="py-3 px-4">
            <div className="flex flex-wrap gap-1">
              {event.tags && event.tags.map((tag, index) => (
                <span key={index} className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </td>
          <td className="py-3 px-4">
            <div className="flex gap-2">
              {/* Edit Button */}
              <button 
                className="text-green-400 hover:text-green-300 transition"
                onClick={() => handleEditEvent(event)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              {/* Delete Button */}
              <button 
                className="text-red-400 hover:text-red-300 transition"
                onClick={() => handleDeleteEvent(event.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        {/* Event Form Modal */}
        {showEventForm && (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
    <div className="bg-gray-900 text-white rounded-md p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{editingId ? 'Edit Event' : 'Add New Event'}</h3>
        <button 
          className="text-gray-400 hover:text-white"
          onClick={() => setShowEventForm(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmitEvent}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="col-span-2">
            <label className="block text-gray-300 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={eventForm.title}
              onChange={handleEventChange}
              className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-1">Date</label>
            <input
              type="text"
              name="date"
              value={eventForm.date}
              onChange={handleEventChange}
              className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-1">Time</label>
            <input
              type="text"
              name="time"
              value={eventForm.time}
              onChange={handleEventChange}
              className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-gray-300 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={eventForm.location}
              onChange={handleEventChange}
              className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              value={eventForm.description}
              onChange={handleEventChange}
              className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              required
            ></textarea>
          </div>
          
          <div className="col-span-2">
            <label className="block text-gray-300 mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'event')}
              className="p-2 border border-gray-600 bg-gray-800 text-white rounded-md w-full"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <button 
            type="button" 
            className="px-4 py-2 border border-gray-500 text-gray-300 rounded-md hover:bg-gray-700"
            onClick={() => setShowEventForm(false)}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {editingId ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      </div>
      
      {/* Past Events */}
      <div className={activeTab === 'past' ? 'block' : 'hidden'}>
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Past Events</h2>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center gap-2"
            onClick={() => {
              resetPastEventForm();
              setShowPastEventForm(true);
            }}
          >
            <span>Add Past Event</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Past Events List */}
        <div className="overflow-x-auto">
  <table className="min-w-full bg-black text-white shadow-md rounded-md">
    <thead className="bg-gray-800">
      <tr>
        <th className="py-3 px-4 text-left">Title</th>
        <th className="py-3 px-4 text-left">Date</th>
        <th className="py-3 px-4 text-left">Participants</th>
        <th className="py-3 px-4 text-left">Projects</th>
        <th className="py-3 px-4 text-left">Prizes</th>
        <th className="py-3 px-4 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {pastEvents.map((event, index) => (
        <tr
          key={event.id}
          className={`border-t ${
            index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
          } hover:bg-gray-700 transition-all`}
        >
          <td className="py-3 px-4">{event.title}</td>
          <td className="py-3 px-4">{event.date}</td>
          <td className="py-3 px-4">{event.stats.participants}</td>
          <td className="py-3 px-4">{event.stats.projects}</td>
          <td className="py-3 px-4">{event.stats.prizes}</td>
          <td className="py-3 px-4">
            <div className="flex gap-2">
              <button
                className="text-blue-400 hover:text-blue-600 transition-all"
                onClick={() => handleEditPastEvent(event)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                className="text-red-400 hover:text-red-600 transition-all"
                onClick={() => handleDeletePastEvent(event.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        
        {/* Past Event Form Modal */}
        {showPastEventForm && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
    <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">
          {editingId ? 'Edit Past Event' : 'Add Past Event'}
        </h3>
        <button 
          className="text-gray-400 hover:text-red-500 transition"
          onClick={() => setShowPastEventForm(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmitPastEvent}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="col-span-2">
            <label className="block text-white mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={pastEventForm.title}
              onChange={handlePastEventChange}
              className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-white mb-1">Date</label>
            <input
              type="text"
              name="date"
              value={pastEventForm.date}
              onChange={handlePastEventChange}
              className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="October 15-16, 2023"
              required
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-white mb-1">Description</label>
            <textarea
              name="description"
              value={pastEventForm.description}
              onChange={handlePastEventChange}
              className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              required
            ></textarea>
          </div>
          
          <div className="col-span-2">
            <label className="block text-white mb-1">Image</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'pastEvent')}
                className="p-2 border border-gray-600 bg-gray-800 text-white rounded-md w-full"
              />
              {pastEventForm.image && (
                <div className="relative w-16 h-16">
                  <img 
                    src={pastEventForm.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover rounded-md" 
                  />
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-white mb-1">Participants</label>
            <input
              type="number"
              name="stats.participants"
              value={pastEventForm.stats.participants}
              onChange={handlePastEventChange}
              className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-white mb-1">Projects</label>
            <input
              type="number"
              name="stats.projects"
              value={pastEventForm.stats.projects}
              onChange={handlePastEventChange}
              className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-white mb-1">Prizes</label>
            <input
              type="text"
              name="stats.prizes"
              value={pastEventForm.stats.prizes}
              onChange={handlePastEventChange}
              className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="$5000"
              required
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <button 
            type="button" 
            className="px-4 py-2 border border-gray-500 text-gray-300 rounded-md hover:bg-gray-700 transition"
            onClick={() => setShowPastEventForm(false)}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {editingId ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default AdminEventsPage;