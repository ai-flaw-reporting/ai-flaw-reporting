interface TeamMember {
  name: string;
  role: string;
  company: string;
}

const TEAM_MEMBERS: TeamMember[] = Array.from({ length: 25 }, () => ({
  name: "John Doe",
  role: "CEO",
  company: "Hugging Face",
}));

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 lg:gap-2 lg:rounded-none lg:bg-transparent lg:p-0 lg:py-4 dark:bg-gray-700 lg:dark:bg-transparent">
      <div className="flex flex-col items-center gap-0.5">
        <p className="text-base font-semibold text-[#373D48] dark:text-gray-100">
          {member.name}
        </p>
        <p className="text-sm text-[#6C727F] dark:text-gray-400">
          {member.role}
        </p>
        <p className="text-sm text-[#6C727F] dark:text-gray-400">
          {member.company}
        </p>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="bg-white px-4 py-6 lg:px-24 lg:pt-16 lg:pb-24 dark:bg-gray-800">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 lg:gap-12">
        <h2 className="text-center text-[36px] leading-[44px] font-bold text-[#373D48] dark:text-gray-100">
          Team
        </h2>
        <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
