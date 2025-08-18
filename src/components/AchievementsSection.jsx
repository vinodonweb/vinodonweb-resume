import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Star, Award, Zap } from 'lucide-react';

const AchievementsSection = () => {
  const [counters, setCounters] = useState({
    projects: 0,
    users: 0,
    uptime: 0,
    performance: 0
  });

  const achievements = [
    {
      icon: TrendingUp,
      title: "Performance Optimization",
      value: "50%",
      description: "Improved page load times",
      target: 50
    },
    {
      icon: Users,
      title: "Users Served",
      value: "200+",
      description: "Active platform users",
      target: 200
    },
    {
      icon: Clock,
      title: "System Uptime",
      value: "99.9%",
      description: "Production reliability",
      target: 99.9
    },
    {
      icon: Star,
      title: "Code Quality",
      value: "95%",
      description: "Test coverage achieved",
      target: 95
    }
  ];

  const milestones = [
    {
      icon: Award,
      title: "First Production Deploy",
      description: "Successfully deployed my first full-stack application",
      date: "2023",
      color: "text-green-400"
    },
    {
      icon: Zap,
      title: "Performance Hero",
      description: "Reduced deployment time from 2 hours to 15 minutes",
      date: "2024",
      color: "text-[#f5c842]"
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Led development of platform serving 200+ users",
      date: "2024",
      color: "text-purple-400"
    }
  ];

  // Animated counter effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCounters(prev => ({
        projects: Math.min(prev.projects + 1, 15),
        users: Math.min(prev.users + 5, 200),
        uptime: Math.min(prev.uptime + 1, 99.9),
        performance: Math.min(prev.performance + 1, 50)
      }));
    }, 50);

    setTimeout(() => clearInterval(timer), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-12">
      {/* Impact Metrics */}
      <div>
        <h3 className="text-2xl font-bold text-[#f5c842] mb-8 code-font">// Impact Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="terminal p-4 text-center hover:neon-border transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <achievement.icon className="w-8 h-8 text-[#f5c842] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                {achievement.value}
              </div>
              <div className="text-sm text-gray-400 mb-2">{achievement.title}</div>
              <div className="text-xs text-gray-500">{achievement.description}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Career Milestones */}
      <div>
        <h3 className="text-2xl font-bold text-[#f5c842] mb-8 code-font">// Career Milestones</h3>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="terminal p-4 flex items-center space-x-4 hover:bg-[#f5c842]/5 transition-all duration-300"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ x: 10 }}
            >
              <div className={`p-3 rounded-lg bg-[#141414] ${milestone.color}`}>
                <milestone.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white">{milestone.title}</h4>
                  <span className="code-font text-sm text-[#f5c842]">{milestone.date}</span>
                </div>
                <p className="text-gray-400 text-sm">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;
