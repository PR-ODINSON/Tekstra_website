import React, { useState } from 'react';
import { FaImages, FaSearch, FaPlus, FaEye, FaEyeSlash, FaTrash, FaFilter, FaTag, FaSort, FaSortUp, FaSortDown, FaRegImage, FaEdit } from 'react-icons/fa';

// Mock data for gallery images
const mockImages = [
  {
    id: 1,
    title: "Tech Conference 2023",
    imageUrl: "/gallery/tech-conference-2023.jpg",
    thumbnail: "/gallery/thumbnails/tech-conference-2023.jpg",
    category: "Events",
    tags: ["conference", "technology", "2023"],
    dateUploaded: "2023-05-15",
    visible: true,
    featured: true,
  },
  {
    id: 2,
    title: "Hackathon Winners",
    imageUrl: "/gallery/hackathon-winners.jpg",
    thumbnail: "/gallery/thumbnails/hackathon-winners.jpg",
    category: "Achievements",
    tags: ["hackathon", "awards", "team"],
    dateUploaded: "2023-03-22",
    visible: true,
    featured: false,
  },
  {
    id: 3,
    title: "Office Tour",
    imageUrl: "/gallery/office-tour.jpg",
    thumbnail: "/gallery/thumbnails/office-tour.jpg",
    category: "Workspace",
    tags: ["office", "workspace", "environment"],
    dateUploaded: "2023-02-10",
    visible: true,
    featured: false,
  },
  {
    id: 4,
    title: "Team Building Event",
    imageUrl: "/gallery/team-building.jpg",
    thumbnail: "/gallery/thumbnails/team-building.jpg",
    category: "Events",
    tags: ["team", "building", "activities"],
    dateUploaded: "2023-01-18",
    visible: true,
    featured: true,
  },
  {
    id: 5,
    title: "Product Launch",
    imageUrl: "/gallery/product-launch.jpg",
    thumbnail: "/gallery/thumbnails/product-launch.jpg",
    category: "Events",
    tags: ["product", "launch", "presentation"],
    dateUploaded: "2022-11-30",
    visible: false,
    featured: false,
  },
  {
    id: 6,
    title: "Development Team",
    imageUrl: "/gallery/dev-team.jpg",
    thumbnail: "/gallery/thumbnails/dev-team.jpg",
    category: "Team",
    tags: ["developers", "team", "portrait"],
    dateUploaded: "2022-10-15",
    visible: true,
    featured: true,
  },
  {
    id: 7,
    title: "Design Workshop",
    imageUrl: "/gallery/design-workshop.jpg",
    thumbnail: "/gallery/thumbnails/design-workshop.jpg",
    category: "Workspace",
    tags: ["design", "workshop", "collaboration"],
    dateUploaded: "2022-09-05",
    visible: true,
    featured: false,
  },
  {
    id: 8,
    title: "Community Outreach",
    imageUrl: "/gallery/community-outreach.jpg",
    thumbnail: "/gallery/thumbnails/community-outreach.jpg",
    category: "Events",
    tags: ["community", "outreach", "volunteer"],
    dateUploaded: "2022-08-20",
    visible: false,
    featured: false,
  }
];

// Category badge component
const CategoryBadge = ({ category }) => {
  const getCategoryStyles = () => {
    switch(category.toLowerCase()) {
      case 'events':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'achievements':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'workspace':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'team':
        return 'bg-pink-100 text-pink-800 border-pink-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryStyles()}`}>
      {category}
    </span>
  );
};

// Tag component
const Tag = ({ tag }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 mr-1 mb-1">
      <FaTag className="mr-1 text-gray-500" size={10} />
      {tag}
    </span>
  );
};

const GalleryPage = () => {
  const [images, setImages] = useState(mockImages);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [visibilityFilter, setVisibilityFilter] = useState('All');
  const [featuredFilter, setFeaturedFilter] = useState('All');
  const [sortField, setSortField] = useState('dateUploaded');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [gallery, setGallery] = useState([
    {
      id: 1,
      name: "Pulse 2023",
      sponsor: "TechCorp Industries",
      description: "Annual flagship hackathon event bringing together innovators and developers from across the country. 36 hours of non-stop innovation, coding and building the future.",
      date: "October 15-16, 2023",
      featured: true,
      photos: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3"
      ]
    }
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    sponsor: '',
    description: '',
    date: '',
    featured: false,
    photos: []
  });
  
  // Get unique categories from images
  const categories = ['All', ...new Set(images.map(img => img.category))];
  
  // Sorting function
  const sortImages = (a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      case 'dateUploaded':
        comparison = new Date(a.dateUploaded) - new Date(b.dateUploaded);
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  };
  
  // Filter images based on search query, category, visibility, and featured status
  const filteredImages = images
    .filter(img => {
      const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          img.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          img.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = categoryFilter === 'All' || img.category === categoryFilter;
      const matchesVisibility = visibilityFilter === 'All' || 
                              (visibilityFilter === 'Visible' && img.visible) || 
                              (visibilityFilter === 'Hidden' && !img.visible);
      const matchesFeatured = featuredFilter === 'All' || 
                            (featuredFilter === 'Featured' && img.featured) || 
                            (featuredFilter === 'Not Featured' && !img.featured);
      
      return matchesSearch && matchesCategory && matchesVisibility && matchesFeatured;
    })
    .sort(sortImages);
  
  // Toggle sort direction
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ml-1" />;
    return sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />;
  };
  
  // Toggle image visibility
  const toggleVisibility = (id) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, visible: !img.visible } : img
    ));
  };
  
  // Toggle featured status
  const toggleFeatured = (id) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, featured: !img.featured } : img
    ));
  };
  
  // Delete image
  const handleDeleteImage = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImages(images.filter(img => img.id !== id));
      setSelectedImages(selectedImages.filter(selectedId => selectedId !== id));
    }
  };
  
  // Toggle image selection
  const toggleImageSelection = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter(selectedId => selectedId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };
  
  // Select all images
  const selectAllImages = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(filteredImages.map(img => img.id));
    }
  };
  
  // Bulk delete selected images
  const bulkDeleteImages = () => {
    if (selectedImages.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedImages.length} images?`)) {
      setImages(images.filter(img => !selectedImages.includes(img.id)));
      setSelectedImages([]);
    }
  };

  const openAddForm = () => {
    setFormData({
      id: null,
      name: '',
      sponsor: '',
      description: '',
      date: '',
      featured: false,
      photos: []
    });
    setEditMode(false);
    setIsFormOpen(true);
  };

  const openEditForm = (entry) => {
    setFormData(entry);
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

  const handlePhotoChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      photos: value.split(',').map(url => url.trim())
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setGallery(gallery.map(item => item.id === formData.id ? formData : item));
    } else {
      const newEntry = {
        ...formData,
        id: Math.max(...gallery.map(g => g.id), 0) + 1
      };
      setGallery([...gallery, newEntry]);
    }
    closeForm();
  };

  const handleDelete = (id) => {
    setGallery(gallery.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <FaImages className="mr-3 text-purple-600" />
            Gallery Management
          </h1>
          <p className="text-gray-600 mt-1">Manage images, categories, and display settings</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button 
            onClick={() => setIsGridView(!isGridView)}
            className="inline-flex items-center px-3 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-all"
          >
            {isGridView ? 'List View' : 'Grid View'}
          </button>
          <button 
            onClick={bulkDeleteImages}
            disabled={selectedImages.length === 0}
            className="inline-flex items-center px-3 py-2 bg-red-100 rounded-lg text-red-700 font-medium hover:bg-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaTrash className="mr-2" />
            Delete Selected
          </button>
          <button 
            onClick={openAddForm}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            <FaPlus className="mr-2" />
            Add Gallery Entry
          </button>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4">
  <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
    
    {/* Search */}
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-gray-500 dark:text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search images by title, category, or tags..."
        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    {/* Category Filter */}
    <div className="relative w-full lg:w-auto lg:min-w-[180px]">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaFilter className="text-gray-500 dark:text-gray-400" />
      </div>
      <select
        className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none w-full"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <FaFilter className="text-gray-500 dark:text-gray-400" />
      </div>
    </div>

    {/* Visibility Filter */}
    <div className="relative w-full lg:w-auto lg:min-w-[160px]">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaEye className="text-gray-500 dark:text-gray-400" />
      </div>
      <select
        className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none w-full"
        value={visibilityFilter}
        onChange={(e) => setVisibilityFilter(e.target.value)}
      >
        <option value="All">All Visibility</option>
        <option value="Visible">Visible</option>
        <option value="Hidden">Hidden</option>
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <FaFilter className="text-gray-500 dark:text-gray-400" />
      </div>
    </div>

    {/* Featured Filter */}
    <div className="relative w-full lg:w-auto lg:min-w-[170px]">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaRegImage className="text-gray-500 dark:text-gray-400" />
      </div>
      <select
        className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none w-full"
        value={featuredFilter}
        onChange={(e) => setFeaturedFilter(e.target.value)}
      >
        <option value="All">All Images</option>
        <option value="Featured">Featured</option>
        <option value="Not Featured">Not Featured</option>
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <FaFilter className="text-gray-500 dark:text-gray-400" />
      </div>
    </div>

  </div>
</div>

      
{isGridView ? (
  // Grid View with dark theme
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {filteredImages.length > 0 ? (
      filteredImages.map(image => (
        <div key={image.id} className="bg-black text-white rounded-lg shadow-md overflow-hidden group border border-gray-800">
          <div className="relative">
            {/* Featured badge */}
            {image.featured && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-md font-medium z-10">
                Featured
              </div>
            )}
            
            {/* Visibility indicator */}
            <div className="absolute top-2 right-2 z-10">
              {image.visible ? (
                <FaEye className="text-white drop-shadow-md" />
              ) : (
                <FaEyeSlash className="text-white drop-shadow-md" />
              )}
            </div>
            
            {/* Selection checkbox */}
            <div className="absolute top-2 left-2 z-10">
              <input
                type="checkbox"
                checked={selectedImages.includes(image.id)}
                onChange={() => toggleImageSelection(image.id)}
                className="h-4 w-4 rounded border-gray-700 text-purple-500 focus:ring-purple-600"
              />
            </div>
            
            {/* Image thumbnail */}
            <div className="h-48 overflow-hidden">
              <img 
                src={image.thumbnail} 
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                }}
              />
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                <button
                  onClick={() => toggleVisibility(image.id)}
                  className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                  title={image.visible ? 'Hide Image' : 'Show Image'}
                >
                  {image.visible ? <FaEyeSlash /> : <FaEye />}
                </button>
                <button
                  onClick={() => toggleFeatured(image.id)}
                  className={`p-2 rounded-full ${image.featured ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'} hover:bg-gray-700`}
                  title={image.featured ? 'Remove from Featured' : 'Add to Featured'}
                >
                  <FaRegImage />
                </button>
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700"
                  title="Delete Image"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-1">{image.title}</h3>
            <div className="mb-2">
              <CategoryBadge category={image.category} />
            </div>
            <div className="flex flex-wrap mb-2">
              {image.tags.map(tag => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
            <div className="text-sm text-gray-400">
              Uploaded: {new Date(image.dateUploaded).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-full bg-black text-white rounded-lg p-8 text-center border border-gray-800">
        No images found matching your filters. Try adjusting your search criteria.
      </div>
    )}
  </div>
) : (
  // List View with dark theme
  <div className="bg-black text-white rounded-lg shadow overflow-hidden border border-gray-800">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-900">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedImages.length === filteredImages.length && filteredImages.length > 0}
                  onChange={selectAllImages}
                  className="h-4 w-4 rounded border-gray-700 text-purple-500 focus:ring-purple-600 mr-2"
                />
                Image
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('title')}
            >
              <div className="flex items-center">
                Title
                {getSortIcon('title')}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('category')}
            >
              <div className="flex items-center">
                Category
                {getSortIcon('category')}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('dateUploaded')}
            >
              <div className="flex items-center">
                Date Uploaded
                {getSortIcon('dateUploaded')}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-black divide-y divide-gray-800">
          {filteredImages.length > 0 ? (
            filteredImages.map(image => (
              <tr key={image.id} className="hover:bg-gray-900">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => toggleImageSelection(image.id)}
                      className="h-4 w-4 rounded border-gray-700 text-purple-500 focus:ring-purple-600 mr-3"
                    />
                    <div className="h-16 w-16 flex-shrink-0">
                      <img 
                        src={image.thumbnail} 
                        alt={image.title} 
                        className="h-16 w-16 rounded object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/64?text=NA';
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{image.title}</div>
                  <div className="text-sm text-gray-400 mt-1">
                    {image.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="mr-1">#{tag}</span>
                    ))}
                    {image.tags.length > 2 && <span>+{image.tags.length - 2}</span>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CategoryBadge category={image.category} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(image.dateUploaded).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${image.visible ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                      {image.visible ? 'Visible' : 'Hidden'}
                    </span>
                    {image.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-800 text-yellow-300">
                        Featured
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => toggleVisibility(image.id)}
                      className={`p-1.5 rounded ${image.visible ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-green-900 text-green-300 hover:bg-green-800'}`}
                      title={image.visible ? 'Hide Image' : 'Show Image'}
                    >
                      {image.visible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button
                      onClick={() => toggleFeatured(image.id)}
                      className={`p-1.5 rounded ${image.featured ? 'bg-yellow-800 text-yellow-300 hover:bg-yellow-700' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                      title={image.featured ? 'Remove from Featured' : 'Add to Featured'}
                    >
                      <FaRegImage />
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="p-1.5 rounded bg-red-900 text-red-300 hover:bg-red-800"
                      title="Delete Image"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                No images found matching your filters. Try adjusting your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}
      
      {/* Pagination */}
      <div className="bg-white px-4 py-3 rounded-lg shadow sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredImages.length}</span> of <span className="font-medium">{images.length}</span> images
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
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 p-4 animate-fadeIn overflow-y-auto">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-lg w-full transform transition-all duration-300 ease-in-out animate-scaleIn my-4">
      <div className="p-5">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {editMode ? 'Edit Gallery Entry' : 'Add New Gallery Entry'}
          </h2>
          <button
            onClick={closeForm}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200"
                placeholder="Enter event name"
              />
            </div>
            
            {/* Sponsor Field */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sponsor
              </label>
              <input
                type="text"
                name="sponsor"
                value={formData.sponsor}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200"
                placeholder="Enter sponsor"
              />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 resize-none"
              placeholder="Enter event description"
            ></textarea>
          </div>

          {/* Date and Photos in one row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Date Field */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200"
              />
            </div>

            {/* Photos Field */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Photos
              </label>
              <input
                type="text"
                name="photos"
                value={formData.photos.join(', ')}
                onChange={handlePhotoChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200"
                placeholder="Comma-separated URLs"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={closeForm}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium transition-colors duration-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-colors duration-200 flex items-center"
            >
              {editMode ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Update
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

{/* CSS animations to add to your global styles */}
{/* 
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease-out forwards;
}
*/}

    </div>
  );
};

export default GalleryPage; 