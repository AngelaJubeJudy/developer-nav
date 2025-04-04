import React from 'react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Senior Frontend Developer',
    company: 'Tech Corp',
    content: 'This platform has revolutionized how I discover and share development tools. The search functionality is incredibly powerful!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Full Stack Developer',
    company: 'StartupX',
    content: 'As a developer, finding the right tools is crucial. This platform makes it so much easier to discover and evaluate new tools.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
  },
  {
    name: 'Emily Johnson',
    role: 'DevOps Engineer',
    company: 'Cloud Solutions',
    content: 'The community aspect is fantastic. I\'ve discovered so many useful tools through other developers\' recommendations.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-12">
          What Developers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-[#6B4F4F] dark:text-gray-200">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-[#8B7E7E] dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-[#8B7E7E] dark:text-gray-400 italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 