import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

// Mock data for contacts
const initialContacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Partnership Inquiry",
    organization: "TechCorp",
    message: "We are interested in a strategic partnership."
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    subject: "Product Feedback",
    organization: "Innovate Inc.",
    message: "I have some feedback on your latest product release."
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    subject: "Support Request",
    organization: "HelpDesk",
    message: "I need assistance with my account."
  }
];

// Add consistent theming and responsive design
const theme = {
  colors: {
    primary: 'bg-gradient-to-r from-cyan-600 to-purple-600',
    primaryHover: 'hover:from-cyan-700 hover:to-purple-700',
    textPrimary: 'text-gray-800 dark:text-white',
    textSecondary: 'text-gray-500 dark:text-gray-400',
    bgLight: 'bg-white dark:bg-gray-800',
    border: 'border-gray-200 dark:border-gray-700',
  },
  spacing: {
    container: 'space-y-6',
    button: 'px-4 py-2',
    card: 'p-4',
  },
};

const ContactPage = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');

  // Filter contacts based on search query and subject
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          contact.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'All' || contact.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  // Get unique subjects from contacts
  const subjects = ['All', ...new Set(contacts.map(contact => contact.subject))];

  return (
    <div className={theme.spacing.container}>
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${theme.colors.textPrimary}`}>Contact Management</h1>
      </div>

      {/* Filters and Search */}
      <div className={`${theme.colors.bgLight} ${theme.spacing.card} rounded-lg shadow space-y-4`}>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Subject Filter */}
          <div className="relative w-full md:w-auto md:min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none bg-white w-full"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className={`${theme.colors.bgLight} overflow-hidden rounded-lg shadow`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium ${theme.colors.textSecondary} uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium ${theme.colors.textSecondary} uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium ${theme.colors.textSecondary} uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium ${theme.colors.textSecondary} uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium ${theme.colors.textSecondary} uppercase tracking-wider">Message</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredContacts.map(contact => (
                <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium ${theme.colors.textPrimary}">{contact.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm ${theme.colors.textPrimary}">{contact.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm ${theme.colors.textPrimary}">{contact.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm ${theme.colors.textPrimary}">{contact.organization}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm ${theme.colors.textSecondary} line-clamp-2">{contact.message}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 