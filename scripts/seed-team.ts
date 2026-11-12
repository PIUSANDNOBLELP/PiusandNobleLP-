// Seeds the firm's team into the database. Idempotent: skips any member whose
// name already exists (so photos/edits made later in the admin are preserved).
// Run with: npx tsx scripts/seed-team.ts
import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

type TeamSeed = {
  name: string;
  role: string;
  level: "PARTNER" | "ASSOCIATE";
  focus: string;
  qualifications: string | null;
  expertise: string | null;
  displayOrder: number;
  status: "DRAFT" | "PUBLISHED";
};

const members: TeamSeed[] = [
  {
    name: "Harrison Eno Uket",
    role: "Associate",
    level: "ASSOCIATE",
    focus:
      "Harrison Eno Uket is an Associate at Pius and Noble LP, with experience in handling complex disputes and providing strategic legal solutions across various areas of litigation. His practice encompasses a broad range of contentious matters, including real estate disputes and other civil and commercial disputes. He is committed to delivering effective legal representation through thorough legal research, sound advocacy, and a keen understanding of the intricacies of dispute resolution. His approach to legal practice is driven by professionalism, attention to detail, and a dedication to achieving favourable outcomes for clients.\n\nBeyond his litigation practice, Harrison has a keen interest in emerging and evolving areas of law, particularly data privacy and protection, intellectual property law, ethical hacking, and AI automation. He is interested in the legal and regulatory frameworks governing these sectors, including issues surrounding data governance and privacy rights. He is committed to deepening his knowledge and developing expertise in these areas, with a view to contributing meaningfully to the evolving legal landscape.",
    qualifications: null,
    expertise: "Litigation, Real Estate Disputes, Data Privacy, Intellectual Property, AI & Automation",
    displayOrder: 1,
    status: "PUBLISHED",
  },
  {
    name: "Esther David Ajinya",
    role: "Associate",
    level: "ASSOCIATE",
    focus:
      "Esther David Ajinya is an Associate at Pius & Noble LP, with a practice and professional focus at the intersection of technology, business and law. Her areas of practice and professional interest span Technology Law, Data Protection and Privacy, Corporate and Commercial Law, Intellectual Property, Entertainment Law and Dispute Resolution.\n\nShe is particularly interested in the legal and regulatory implications of emerging technologies, artificial intelligence, digital innovation and the evolving data protection landscape. Her work includes advising on commercial transactions, contractual relationships, regulatory compliance, data protection obligations, intellectual property rights and the resolution of commercial disputes.\n\nEsther brings a commercially conscious and analytical approach to legal practice, with an appreciation of the legal, operational and regulatory considerations that shape modern businesses. Beyond legal practice, Esther is an active legal writer and commentator, with several commentaries addressing contemporary legal, regulatory, socio-economic and public policy issues. She holds an LL.B, and is an Associate Member of the Institute of Chartered Mediators and Conciliators (ICMC).",
    qualifications: "LL.B, Associate Member ICMC",
    expertise: "Technology Law, Data Protection & Privacy, Corporate & Commercial, Intellectual Property, Entertainment Law, Dispute Resolution",
    displayOrder: 2,
    status: "PUBLISHED",
  },
  {
    name: "Edith Oghenekovwe Onayifeke",
    role: "Associate",
    level: "ASSOCIATE",
    focus:
      "Edith Oghenekovwe Onayifeke is a goal-oriented lawyer with experience in corporate law, data privacy, and intellectual property law. She combines a sharp legal mind with a practical, client-focused approach to navigating complex legal and regulatory environments. Grounded in a strong understanding of both the letter and spirit of the law, she approaches every matter with thoroughness, strategic thinking, and a genuine commitment to achieving the best outcomes for her clients.\n\nWith a keen eye for detail and an unwavering commitment to the highest professional standards, Edith has developed a reputation for delivering clear, logical, and commercially sound legal work. She is equally comfortable advising on corporate structuring and governance, data protection compliance, and the protection of intellectual assets, bringing consistency, diligence, and depth to each area of her legal practice.\n\nEdith continues to build a practice rooted in integrity, precision, and a deep understanding of the legal needs of businesses and individuals in today's fast-evolving landscape.",
    qualifications: null,
    expertise: "Corporate Law, Data Privacy, Intellectual Property",
    displayOrder: 3,
    status: "PUBLISHED",
  },
  {
    name: "Khadijah Ahmed Sa'ad",
    role: "Associate",
    level: "ASSOCIATE",
    focus:
      "Khadijah Ahmed Sa'ad is a Nigerian legal practitioner and Associate at Pius & Noble LP, with a focus on corporate and commercial law, regulatory compliance, and emerging areas of technology law.\n\nShe obtained her Bachelor of Laws (LL.B.) degree from Nile University and was called to the Nigerian Bar in 2025. She is also an Associate of the Institute of Chartered Mediation and Conciliation (ICMC).\n\nHer professional experience encompasses corporate and commercial law, legal research, contract drafting and review, due diligence, and regulatory analysis. She has a particular interest in data protection, artificial intelligence, and technology regulation, reflecting her commitment to understanding the evolving intersection of law, business, and innovation. Khadijah approaches legal practice with diligence, analytical precision, and a commercially oriented perspective.",
    qualifications: "LL.B (Nile University), BL, Associate ICMC",
    expertise: "Corporate & Commercial, Regulatory Compliance, Technology Law, Data Protection, Artificial Intelligence",
    displayOrder: 4,
    status: "PUBLISHED",
  },
  {
    name: "Kosisochukwu Yvonne Okonkwo",
    role: "Associate",
    level: "ASSOCIATE",
    focus:
      "Kosisochukwu Yvonne Okonkwo is an Associate at Pius & Noble LP, where she plays an integral role in driving the firm's growth across its key commercial, regulatory, data protection, intellectual property, and dispute resolution practices.\n\nA Chartered Arbitrator (ACArb) with sharp analytical capabilities, her expertise spans a diverse array of practice areas, including real estate, intellectual property, litigation, data privacy, and energy and natural resources regulation.\n\nKosisochukwu has been a pivotal driver in expanding Pius & Noble LP's footprint in emerging sectors. As an active member of the Intellectual Property Lawyers Association Nigeria (IPLAN), Data Protection Professionals Network (DPLAN) and the Nigerian Bar Association (NBA) Section on Business Law, she leverages her deep sector insight and professional networks to enhance the firm's market positioning and client acquisition strategies.\n\nAn accomplished legal writer, Kosisochukwu further elevates the firm's thought leadership profile through her contributions to legal scholarship, co-authoring notable publications on the Nigerian justice system and exploring niche sectors including fashion law, tax law and business law.",
    qualifications: "ACArb (Chartered Arbitrator)",
    expertise: "Real Estate, Intellectual Property, Litigation, Data Privacy, Energy & Natural Resources",
    displayOrder: 5,
    status: "PUBLISHED",
  },
  {
    name: "Adedoyin Adegboyega",
    role: "Associate",
    level: "ASSOCIATE",
    focus:
      "Adedoyin Adegboyega is an Associate at Pius and Noble LP, with expertise in litigation, legal research, and providing legal solutions in various areas of law. His practice covers a wide spectrum of legal matters, particularly in civil and commercial law practice.\n\nHis commitment to precision, professionalism, and excellence allows him to deliver practical legal solutions. He is dedicated to continuous professional development and the pursuit of justice through diligent legal practice.\n\nIn addition, Adedoyin is passionate about exploring diverse and evolving fields of legal practice, with particular focus on intellectual property, data privacy and protection, and technology-related legal issues. His interests extend to the regulatory principles guiding business operations, the legal implications of technological advancement, and the safeguarding of intellectual property.",
    qualifications: null,
    expertise: "Litigation, Civil & Commercial Law, Intellectual Property, Data Privacy, Technology Law",
    displayOrder: 6,
    status: "PUBLISHED",
  },
  {
    name: "Motunrayo Benedicta Dipo-Ojo",
    role: "Associate",
    level: "ASSOCIATE",
    focus:
      "Motunrayo Benedicta Dipo-Ojo is a Nigerian legal practitioner and an Associate at Pius & Noble LP with a strong interest in delivering practical, commercially informed and solution-oriented legal services.\n\nHer professional experience includes legal research, litigation support, legal drafting and advisory work, developed through engagements with the legal environment. She has been involved in matters requiring detailed legal analysis, preparation of legal processes, regulatory research and the development of strategies to address clients' legal and commercial concerns.\n\nHer practice interests span corporate and commercial law, data protection and privacy, tax, technology law, and emerging areas of digital regulation. Motunrayo approaches legal practice with diligence, intellectual curiosity and a commitment to precision, focused on providing clear, well-researched and commercially responsive legal solutions.",
    qualifications: null,
    expertise: "Corporate & Commercial, Data Protection, Tax, Technology Law, Digital Regulation",
    displayOrder: 7,
    status: "PUBLISHED",
  },
  {
    name: "Ramadan Abisodun Hammed",
    role: "Associate",
    level: "ASSOCIATE",
    focus:
      "Ramadan Abisodun Hammed is an Associate at Pius and Noble LP, with experience in handling complex disputes and providing strategic legal solutions across various areas of litigation. His practice encompasses a broad range of contentious matters, including real estate disputes, matrimonial disputes, and other civil and commercial disputes.\n\nHe is committed to delivering effective legal representation through thorough legal research, sound advocacy, and a keen understanding of the intricacies of dispute resolution. His approach to legal practice is driven by professionalism, attention to detail, and a dedication to achieving favourable outcomes for clients.\n\nBeyond his litigation practice, Ramadan has a keen interest in emerging and evolving areas of law, particularly data privacy and protection, mining law, and intellectual property law. He is committed to deepening his knowledge and developing expertise in these areas, with a view to contributing meaningfully to the evolving legal landscape.",
    qualifications: null,
    expertise: "Litigation, Real Estate & Matrimonial Disputes, Data Privacy, Mining Law, Intellectual Property",
    displayOrder: 8,
    status: "PUBLISHED",
  },
];

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Missing DATABASE_URL");

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  let created = 0;
  let skipped = 0;
  for (const m of members) {
    const existing = await prisma.teamMember.findFirst({ where: { name: m.name } });
    if (existing) {
      skipped++;
      continue;
    }
    await prisma.teamMember.create({ data: m });
    created++;
  }

  console.log(`Team seed complete: created ${created}, skipped ${skipped} (already present).`);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
