
import { apiClient } from './client';

export interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GithubRepo {
  stargazers_count: number;
  forks_count: number;
}

export async function getGithubUser(username: string) {
  if (!username) return null;
  return fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 3600 }
  }).then((res) => {
    if (!res.ok) return null;
    return res.json() as Promise<GithubUser>;
  });
}

export async function getGithubStats(username: string) {
  // Fetch user data
  const user = await getGithubUser(username);
  if (!user) return null;
  
  // Fetch all repos to calculate total stars/forks
  // Note: This only fetches first 100 public repos. For more, pagination is needed.
  const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
    next: { revalidate: 3600 }
  });
  const repos = await reposRes.json() as GithubRepo[];

  // Fetch contributions data
  let totalContributions = 0;
  try {
    const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
      next: { revalidate: 3600 }
    });
    if (contribRes.ok) {
      const contribData = await contribRes.json();
      // Sum up contributions from all years
      totalContributions = Object.values(contribData.total || {}).reduce((acc: number, curr: any) => acc + (typeof curr === 'number' ? curr : 0), 0) as number;
    }
  } catch (e) {
    console.error('Failed to fetch contributions:', e);
  }
  
  if (!Array.isArray(repos)) {
    return {
      followers: user.followers,
      public_repos: user.public_repos,
      total_stars: 0,
      total_forks: 0,
      total_contributions: totalContributions,
      username: user.login,
      profile_url: user.html_url
    };
  }
  
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

  return {
    followers: user.followers,
    public_repos: user.public_repos,
    total_stars: totalStars,
    total_forks: totalForks,
    total_contributions: totalContributions,
    username: user.login,
    profile_url: user.html_url
  };
}
