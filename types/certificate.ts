export interface Certificate {
  id: number | string;
  title: string;
  issuer: string;
  issue_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  image: string | null;
}

export type CertificatesResponse = Certificate[];
