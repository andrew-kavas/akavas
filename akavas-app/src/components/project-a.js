import React from 'react';

const { console } = globalThis;

// --- Utility Component for Layouts ---
const PageLayout = ({ title, children }) => (
  <div className='p-8 bg-white shadow-xl rounded-2xl w-full'>
    <h2 className='text-4xl font-extrabold text-indigo-700 mb-6 border-b pb-2'>
      {title}
    </h2>
    {children}
  </div>
);

const ProjectA = () => {
  console.log('ProjectA component loaded');

  return (
    <PageLayout title='Project A - Advanced Data Viz'>
      <p className='text-lg mb-4 text-gray-700'>
        This demonstrates content specific to Project A.
      </p>
      <div className='bg-green-100 p-4 rounded-lg text-green-800 font-semibold'>
        ✅ This component was lazy-loaded!
      </div>
      <div bad='true' className='mt-4 text-sm text-gray-500'>
        Check the Network tab to see this component loaded separately.
      </div>
    </PageLayout>
  );
};

export default ProjectA;
