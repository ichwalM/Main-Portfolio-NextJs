"use client";

import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Users, BookMarked } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface GithubStatsProps {
  stats: {
    followers: number;
    public_repos: number;
    total_stars: number;
    total_forks: number;
    username: string;
    profile_url: string;
  } | null;
}

export default function GithubStats({ stats }: GithubStatsProps) {
  if (!stats) return null;

  const statItems = [
    {
      label: "Stars Earned",
      value: stats.total_stars,
      icon: Star,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: "Total Repos",
      value: stats.public_repos,
      icon: BookMarked,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Followers",
      value: stats.followers,
      icon: Users,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Git Forks",
      value: stats.total_forks,
      icon: GitFork,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-4">Coding Activity</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              My contributions and open source statistics on GitHub
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {statItems.map((item, index) => (
            <ScrollReveal key={item.label}>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3 group"
              >
                <div className={`p-3 rounded-full ${item.bg} mb-2 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-3xl font-black text-foreground">{item.value}</h3>
                <p className="text-foreground/60 font-medium text-sm text-center">{item.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* GitHub Calendar */}
        <ScrollReveal>
          <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col items-center">
            <div className="w-full overflow-x-auto flex justify-center pb-4">
              <div className="min-w-[800px] flex justify-center">
                 <GitHubCalendar 
                    username={stats.username}
                    colorScheme="dark"
                    fontSize={14}
                    blockSize={14}
                    blockMargin={4}
                    theme={{
                        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    }}
                 />
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <motion.a
                href={stats.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#24292e] text-white font-medium hover:bg-[#2f363d] transition-colors"
              >
                <Github className="w-5 h-5" />
                Visit GitHub Profile
              </motion.a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
