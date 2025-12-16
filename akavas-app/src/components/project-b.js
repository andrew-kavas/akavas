import React from 'react';

// --- Utility Component for Layouts ---
const PageLayout = ({ title, children }) => (
  <div className='p-8 bg-white shadow-xl rounded-2xl w-full'>
    <h2 className='text-4xl font-extrabold text-indigo-700 mb-6 border-b pb-2'>
      {title}
    </h2>
    {children}
  </div>
);

const ProjectB = () => {
  console.log('ProjectB component loaded');

  return (
    <PageLayout title='Project B - Complex Form Handler'>
      <p className='text-lg mb-4 text-gray-700'>
        This demonstrates content specific to Project B.
      </p>
      <div className='bg-yellow-100 p-4 rounded-lg text-yellow-800 font-semibold'>
        ✅ This component was lazy-loaded!
      </div>
      <div className='mt-4 text-sm text-gray-500'>
        Check the Network tab to see this component loaded separately.
      </div>
    </PageLayout>
  );
};

export default ProjectB;
