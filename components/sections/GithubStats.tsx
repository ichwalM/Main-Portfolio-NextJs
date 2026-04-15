"use client";

import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { Github, Star, BookMarked, Users, GitCommitHorizontal } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface GithubStatsProps {
  stats: {
    followers: number;
    public_repos: number;
    total_stars: number;
    total_forks: number;
    total_contributions: number;
    username: string;
    profile_url: string;
  } | null;
}

const getPast12Months = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const past12 = [];
  for (let i = 11; i >= 0; i--) {
    past12.push(months[(currentMonth - i + 12) % 12]);
  }
  return past12;
};

export default function GithubStats({ stats }: GithubStatsProps) {
  if (!stats) return null;

  const statItems = [
    {
      label: "Stars Earned",
      value: stats.total_stars,
      icon: Star,
      accent: "text-yellow-400",
    },
    {
      label: "Total Repos",
      value: stats.public_repos,
      icon: BookMarked,
      accent: "text-primary",
    },
    {
      label: "Followers",
      value: stats.followers,
      icon: Users,
      accent: "text-green-400",
    },
    {
      label: "Commits",
      value: stats.total_contributions,
      icon: GitCommitHorizontal,
      accent: "text-primary",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative large number */}
      <div className="absolute top-8 left-4 text-[15vw] font-black text-border/10 leading-none select-none pointer-events-none tracking-tighter">
        05
      </div>

      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="mb-16">
            <p className="section-label mb-6">Open Source</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              Coding<br />
              <span className="text-primary">Activity.</span>
            </h2>
            <p className="text-muted-foreground text-base mt-4 max-w-xl">
              My contributions and open source statistics on GitHub.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid — Sharp cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-16">
          {statItems.map((item, index) => (
            <ScrollReveal key={item.label}>
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-card p-6 flex flex-col gap-4 group cursor-default transition-colors duration-200 hover:bg-surface"
              >
                <div className="flex items-center justify-between">
                  <item.icon className={`w-5 h-5 ${item.accent}`} />
                  <div className="w-1.5 h-1.5 bg-border group-hover:bg-primary transition-colors" />
                </div>
                <div>
                  <h3 className="text-4xl font-black text-foreground font-mono">{item.value}</h3>
                  <p className="text-muted-foreground text-xs font-mono uppercase tracking-wider mt-1">{item.label}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* GitHub Calendar */}
        <ScrollReveal>
          <div className="border border-border bg-card p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  @{stats.username}
                </span>
              </div>
              <span className="text-xs font-mono text-muted-foreground/50">Contribution Graph</span>
            </div>

            {/* GitHub Calendar & Snake Section */}
            {/* Snake Calendar Dashboard */}
            <div className="w-full flex justify-center pb-8 pt-4">
              <div className="w-full max-w-[900px] flex flex-col">
                {/* Custom Month Labels */}
                <div className="flex w-full justify-between text-muted-foreground text-[10px] md:text-xs font-mono px-4 md:px-6 mb-2 opacity-80">
                  {getPast12Months().map((m, i) => (
                    <span key={i} className="flex-1 text-center">{m}</span>
                  ))}
                </div>

                {/* Snake Grid Animation */}
                <div className="relative w-full opacity-90 hover:opacity-100 transition-opacity duration-500 hover:scale-[1.01] transform-gpu">
                  <picture className="w-full flex justify-center">
                    <source media="(prefers-color-scheme: dark)" srcSet="https://raw.githubusercontent.com/ichwalM/ichwalM/output/snake.svg?color_snake=#ffffff&color_dots=#1a1a1a,#0c2d6b,#1551c5,#2563EB,#4f8af8" />
                    <source media="(prefers-color-scheme: light)" srcSet="https://raw.githubusercontent.com/ichwalM/ichwalM/output/snake.svg?color_snake=#ffffff&color_dots=#1a1a1a,#0c2d6b,#1551c5,#2563EB,#4f8af8" />
                    <img
                      alt="github contribution grid snake animation"
                      src="https://raw.githubusercontent.com/ichwalM/ichwalM/output/snake.svg"
                      className="w-full max-w-full drop-shadow-[0_0_15px_rgba(37,99,235,0.08)]"
                    />
                  </picture>
                </div>

                {/* Footer Labels */}
                <div className="flex flex-col md:flex-row w-full justify-between items-center md:items-start border-t border-border mt-4 pt-3 text-muted-foreground text-[10px] md:text-xs font-mono px-2 opacity-80 gap-3">
                  <span>{stats.total_contributions} contributions in the last year</span>
                  <div className="flex items-center gap-2">
                    <span>Less</span>
                    <div className="flex gap-1 md:gap-1.5">
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#1a1a1a] rounded-[1px] md:rounded-sm" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#0c2d6b] rounded-[1px] md:rounded-sm" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#1551c5] rounded-[1px] md:rounded-sm" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#2563EB] rounded-[1px] md:rounded-sm" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#4f8af8] rounded-[1px] md:rounded-sm" />
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 pt-4 border-t w-full border-border flex justify-center">
              <motion.a
                href={stats.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 bg-[#24292e] text-white text-sm font-bold hover:bg-[#2f363d] transition-colors"
              >
                <Github className="w-4 h-4" />
                Visit GitHub Profile
              </motion.a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
