
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
  
  if (!Array.isArray(repos)) {
    return {
      followers: user.followers,
      public_repos: user.public_repos,
      total_stars: 0,
      total_forks: 0,
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
    username: user.login,
    profile_url: user.html_url
  };
}
