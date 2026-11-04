import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAgency } from '../context/AgencyContext';
import { ProjectCategory } from '../types';
import { ArrowUpRight, Search } from 'lucide-react';

export const WorkView: React.FC = () => {
  const { projects, setSelectedProject, startProjectWithContext } = useAgency();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ProjectCategory[] = [
    'All',
    'School & Education',
    'Restaurant & Hospitality',
    'AI & Automation',
    'Business Applications',
    'Web Development'
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-neutral-100">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] as const }}
        className="space-y-4 max-w-3xl"
      >
        <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Case Studies & Verified Outcomes
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Our Work
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Explore production systems we have engineered across educational institutions, hospitality operators, high-growth startups, and logistics enterprises. Every project features verified metrics and 100% intellectual property ownership transferred to the client.
        </p>
      </motion.div>

      {/* Filter & Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-neutral-800 pb-6"
      >
        
        {/* Category Segmented Controls (Interactive buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, stack, industry..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-1.5 pl-8 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400"
          />
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-xs text-neutral-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </motion.div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-neutral-900/30 border border-neutral-800 rounded-xl">
          <p className="text-neutral-400 text-sm">No projects found matching the selected filter or query.</p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="text-xs text-white underline underline-offset-4 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } }
              }}
              whileHover={{ y: -3 }}
              className="group bg-neutral-900/40 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div
                onClick={() => setSelectedProject(project)}
                className="relative aspect-video w-full overflow-hidden bg-neutral-950 cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  {/* Clean unboxed metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                    <span className="text-neutral-200 font-medium">{project.clientName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.industry}</span>
                    <span aria-hidden="true">·</span>
                    <span>Completed {project.year}</span>
                  </div>

                  <h2
                    onClick={() => setSelectedProject(project)}
                    className="text-xl sm:text-2xl font-bold text-white group-hover:text-neutral-200 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h2>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Primary Quantitative Metric Banner */}
                <div className="p-4 bg-neutral-950/60 border border-neutral-800/80 rounded-lg space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    Verified Metric
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
                    {project.outcomes[0]?.metric}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {project.outcomes[0]?.context}
                  </div>
                </div>

                {/* Tech Stack Unboxed Tags */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 tracking-wider block">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-xs text-neutral-300 font-mono">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-white hover:text-neutral-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => startProjectWithContext(project.category, project.industry)}
                    className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Request Similar Build →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      {/* Inquiry CTA */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
        className="mt-16 p-8 bg-neutral-900 border border-neutral-800 rounded-xl text-center space-y-4"
      >
        <h3 className="text-2xl font-bold text-white">Have a Specific Project in Mind?</h3>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
          Whether you need a custom school ERP, restaurant ordering suite, or early-stage MVP — our senior architects can scope and price your solution.
        </p>
        <button
          onClick={() => startProjectWithContext()}
          className="px-6 py-3 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
        >
          Request Project Consultation
        </button>
      </motion.div>

    </div>
  );
};
