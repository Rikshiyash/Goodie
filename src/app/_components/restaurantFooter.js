import React from 'react';

const RestaurantFooter = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} FoodEase. All rights reserved.
        </p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="mailto:support@foodease.com" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default RestaurantFooter;
