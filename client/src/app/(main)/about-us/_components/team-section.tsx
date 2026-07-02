interface TeamMember {
  name: string;
  company: string;
  website?: string;
}

interface TeamTier {
  label: string;
  members: TeamMember[];
  emphasized?: boolean;
}

const ORG_URLS: Record<string, string> = {
  MIT: "https://www.mit.edu/",
  "Northeastern University": "https://www.northeastern.edu/",
  "Harvard University": "https://www.harvard.edu/",
  "Hugging Face": "https://huggingface.co/",
  AVERI: "https://www.averi.org/",
  "UL Research Institutes": "https://ul.org/",
  Stanford: "https://www.stanford.edu/",
  "Princeton University": "https://www.princeton.edu/",
  "Stanford University": "https://www.stanford.edu/",
  "Carnegie Mellon University SEI CERT": "https://www.sei.cmu.edu/about/divisions/cert/",
  Google: "https://about.google/",
  "MIT FutureTech": "https://futuretech.mit.edu/",
  ARVA: "https://avidml.org/arva/",
};

const TEAM_TIERS: TeamTier[] = [
  {
    label: "Lead Authors",
    emphasized: true,
    members: [
      { name: "Shayne Longpre", company: "MIT", website: "https://shaynelongpre.com/" },
      { name: "Elaine Zhu", company: "Northeastern University", website: "https://elaine.foo/" },
      { name: "Carson Ezell", company: "Harvard University" },
      { name: "Avijit Ghosh", company: "Hugging Face", website: "https://evijit.io/" },
    ],
  },
  {
    label: "Top Contributors",
    members: [
      { name: "Sean McGregor", company: "AVERI" },
      { name: "Kevin Paeth", company: "UL Research Institutes" },
      { name: "Kevin Klyman", company: "Stanford / Harvard University", website: "https://www.linkedin.com/in/kevin-klyman/" },
      { name: "Sayash Kapoor", company: "Princeton University" },
      { name: "Rishi Bommasani", company: "Stanford University" },
      { name: "Ruth E. Appel", company: "Stanford University" },
    ],
  },
  {
    label: "Contributors",
    members: [
      { name: "Gregory Strom", company: "Carnegie Mellon University SEI CERT" },
      { name: "Lauren McIlvenny", company: "Carnegie Mellon University SEI CERT" },
      { name: "Mark M. Jaycox", company: "Google" },
      { name: "Peter Slattery", company: "MIT FutureTech" },
      { name: "Nathan Butters", company: "ARVA" },
    ],
  },
  {
    label: "Advisors",
    members: [
      { name: "Arvind Naryanan", company: "Princeton University" },
      { name: "Percy Liang", company: "Stanford University" },
      { name: "Alex Pentland", company: "MIT" },
    ],
  },
];

function TeamMemberItem({
  member,
  emphasized,
}: {
  member: TeamMember;
  emphasized?: boolean;
}) {
  const nameClass = emphasized
    ? "text-center text-base font-bold text-gray-900 dark:text-gray-100"
    : "text-center text-sm font-semibold text-gray-900 dark:text-gray-100";

  const companyClass =
    "text-center text-xs text-gray-400 dark:text-gray-500";
  const companyParts = member.company.split(" / ");

  return (
    <div className="flex w-40 flex-col items-center gap-1">
      {member.website ? (
        <a
          href={member.website}
          target="_blank"
          rel="noopener noreferrer"
          className={`${nameClass} hover:underline`}
        >
          {member.name}
        </a>
      ) : (
        <p className={nameClass}>{member.name}</p>
      )}
      <p className={companyClass}>
        {companyParts.map((part, index) => {
          const url = ORG_URLS[part];
          return (
            <span key={index}>
              {index > 0 && " / "}
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {part}
                </a>
              ) : (
                part
              )}
            </span>
          );
        })}
      </p>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="bg-white px-6 py-12 lg:px-21 lg:py-16 dark:bg-gray-800">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10">
        <div className="space-y-1 text-center">
          <p className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase dark:text-gray-400">
            The people behind it
          </p>
          <h2 className="text-[32px] leading-[40px] font-bold text-gray-900 dark:text-gray-100">
            Team
          </h2>
        </div>
        <div className="flex w-full flex-col gap-10">
          {TEAM_TIERS.map((tier) => (
            <div key={tier.label} className="flex flex-col items-center gap-5">
              <p className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase dark:text-gray-400">
                {tier.label}
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-6">
                {tier.members.map((member, index) => (
                  <TeamMemberItem
                    key={index}
                    member={member}
                    emphasized={tier.emphasized}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
