import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUsers, FiCar, FiDollarSign, FiTrendingUp } = FiIcons;

const StatsSection = () => {
  const stats = [
    {
      icon: FiUsers,
      value: '50K+',
      label: 'Active Users',
      description: 'Trusted community members',
    },
    {
      icon: FiCar,
      value: '15K+',
      label: 'Vehicles Listed',
      description: 'Cars and motorcycles available',
    },
    {
      icon: FiDollarSign,
      value: '$2.5M+',
      label: 'Total Sales',
      description: 'Successful transactions',
    },
    {
      icon: FiTrendingUp,
      value: '98%',
      label: 'Success Rate',
      description: 'Satisfied customers',
    },
  ];

  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join our growing community of vehicle enthusiasts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-white/10 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center backdrop-blur-sm"
              >
                <SafeIcon icon={stat.icon} className="h-8 w-8 text-white" />
              </motion.div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg font-semibold mb-1">{stat.label}</div>
              <div className="text-blue-100 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;