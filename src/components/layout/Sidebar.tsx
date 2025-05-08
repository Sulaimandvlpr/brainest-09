import React from 'react';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const user = { name: 'John Doe' }; // Replace with actual user data

  return (
    <div className="flex h-screen">
      {/* Sidebar content */}
      <div className={`w-16 h-screen bg-gray-800 ${collapsed ? 'collapsed' : ''}`}>
        {/* Avatar */}
        <div className="flex items-center justify-center h-16">
          <div className={`flex items-center justify-center rounded-full bg-cyan-700 text-white font-bold text-xl border-4 border-cyan shadow-3d ${collapsed ? 'w-10 h-10' : 'w-16 h-16'}`}>
            {user?.name?.[0]?.toUpperCase() || '?'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 