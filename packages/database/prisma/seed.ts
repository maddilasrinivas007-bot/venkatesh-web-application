import { PrismaClient, UserRole, LegislationCategory, CourtType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding NyayaAI database...');

  const adminPassword = await bcrypt.hash('Admin@123456', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@nyayaai.in' },
    update: {},
    create: {
      email: 'admin@nyayaai.in',
      passwordHash: adminPassword,
      role: UserRole.SUPER_ADMIN,
      status: 'ACTIVE',
      emailVerified: true,
      profile: {
        create: {
          firstName: 'System',
          lastName: 'Administrator',
          city: 'New Delhi',
          state: 'Delhi',
        },
      },
    },
  });

  const advocatePassword = await bcrypt.hash('Advocate@123', 12);

  const advocate = await prisma.user.upsert({
    where: { email: 'advocate@nyayaai.in' },
    update: {},
    create: {
      email: 'advocate@nyayaai.in',
      passwordHash: advocatePassword,
      role: UserRole.ADVOCATE,
      status: 'ACTIVE',
      emailVerified: true,
      profile: {
        create: {
          firstName: 'Rajesh',
          lastName: 'Sharma',
          city: 'Mumbai',
          state: 'Maharashtra',
          languages: ['English', 'Hindi', 'Marathi'],
        },
      },
      advocateProfile: {
        create: {
          barCouncilNumber: 'MH/1234/2010',
          barCouncilState: 'Maharashtra',
          enrollmentYear: 2010,
          practiceAreas: ['Criminal Law', 'Civil Litigation', 'Property Law'],
          experience: 14,
          consultationFee: 2500,
          biography:
            'Senior advocate with 14+ years of experience in criminal and civil litigation across Maharashtra High Court and District Courts.',
          verificationStatus: 'VERIFIED',
          rating: 4.8,
          reviewCount: 127,
        },
      },
    },
  });

  const citizenPassword = await bcrypt.hash('Citizen@123', 12);

  await prisma.user.upsert({
    where: { email: 'citizen@nyayaai.in' },
    update: {},
    create: {
      email: 'citizen@nyayaai.in',
      passwordHash: citizenPassword,
      role: UserRole.CITIZEN,
      status: 'ACTIVE',
      emailVerified: true,
      profile: {
        create: {
          firstName: 'Priya',
          lastName: 'Verma',
          city: 'Bangalore',
          state: 'Karnataka',
        },
      },
    },
  });

  const constitutionArticles = [
    {
      articleNumber: '14',
      title: 'Equality before law',
      content:
        'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
      part: 'III',
      isFundamentalRight: true,
    },
    {
      articleNumber: '19',
      title: 'Protection of certain rights regarding freedom of speech, etc.',
      content:
        'All citizens shall have the right to freedom of speech and expression; to assemble peaceably and without arms; to form associations or unions; to move freely throughout the territory of India; to reside and settle in any part of the territory of India; and to practise any profession, or to carry on any occupation, trade or business.',
      part: 'III',
      isFundamentalRight: true,
    },
    {
      articleNumber: '21',
      title: 'Protection of life and personal liberty',
      content:
        'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
      part: 'III',
      isFundamentalRight: true,
    },
    {
      articleNumber: '32',
      title: 'Remedies for enforcement of rights',
      content:
        'The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed.',
      part: 'III',
      isFundamentalRight: true,
    },
    {
      articleNumber: '51A',
      title: 'Fundamental Duties',
      content:
        'It shall be the duty of every citizen of India to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem.',
      part: 'IVA',
      isFundamentalDuty: true,
    },
  ];

  for (const article of constitutionArticles) {
    await prisma.constitutionArticle.upsert({
      where: { articleNumber: article.articleNumber },
      update: {},
      create: article,
    });
  }

  const legislations = [
    {
      title: 'Bharatiya Nyaya Sanhita, 2023',
      shortTitle: 'BNS',
      year: 2023,
      category: LegislationCategory.CRIMINAL,
      content: 'An Act to consolidate and amend the provisions relating to criminal law.',
    },
    {
      title: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
      shortTitle: 'BNSS',
      year: 2023,
      category: LegislationCategory.CRIMINAL,
      content: 'An Act to consolidate and amend the law relating to Criminal Procedure.',
    },
    {
      title: 'Consumer Protection Act, 2019',
      shortTitle: 'CPA 2019',
      year: 2019,
      category: LegislationCategory.CONSUMER,
      content: 'An Act to provide for protection of the interests of consumers.',
    },
    {
      title: 'Information Technology Act, 2000',
      shortTitle: 'IT Act',
      year: 2000,
      category: LegislationCategory.IT,
      content: 'An Act to provide legal recognition for transactions carried out by means of electronic data interchange.',
    },
  ];

  for (const leg of legislations) {
    const existing = await prisma.legislation.findFirst({
      where: { shortTitle: leg.shortTitle },
    });
    if (!existing) {
      await prisma.legislation.create({ data: leg });
    }
  }

  const judgments = [
    {
      title: 'Kesavananda Bharati v. State of Kerala',
      citation: 'AIR 1973 SC 1461',
      court: CourtType.SUPREME_COURT,
      courtName: 'Supreme Court of India',
      judges: ['S.M. Sikri', 'A.N. Ray', 'H.R. Khanna'],
      year: 1973,
      subject: 'Constitutional Law',
      summary:
        'Landmark case establishing the Basic Structure doctrine of the Indian Constitution.',
      isLandmark: true,
      isConstitutionalBench: true,
      judgmentDate: new Date('1973-04-24'),
    },
    {
      title: 'Maneka Gandhi v. Union of India',
      citation: 'AIR 1978 SC 597',
      court: CourtType.SUPREME_COURT,
      courtName: 'Supreme Court of India',
      judges: ['M.H. Beg', 'Y.V. Chandrachud', 'V.R. Krishna Iyer'],
      year: 1978,
      subject: 'Fundamental Rights',
      summary:
        'Expanded the scope of Article 21 and established that procedure must be fair, just and reasonable.',
      isLandmark: true,
      judgmentDate: new Date('1978-01-25'),
    },
    {
      title: 'Vishaka v. State of Rajasthan',
      citation: 'AIR 1997 SC 3011',
      court: CourtType.SUPREME_COURT,
      courtName: 'Supreme Court of India',
      judges: ['J.S. Verma', 'Sujata V. Manohar', 'B.N. Kirpal'],
      year: 1997,
      subject: 'Sexual Harassment at Workplace',
      summary:
        'Laid down guidelines for prevention of sexual harassment at workplace, later codified in the POSH Act.',
      isLandmark: true,
      judgmentDate: new Date('1997-08-13'),
    },
  ];

  for (const judgment of judgments) {
    await prisma.judgment.upsert({
      where: { citation: judgment.citation },
      update: {},
      create: judgment,
    });
  }

  await prisma.blogPost.upsert({
    where: { slug: 'understanding-bharatiya-nyaya-sanhita' },
    update: {},
    create: {
      title: 'Understanding the Bharatiya Nyaya Sanhita: A Complete Guide',
      slug: 'understanding-bharatiya-nyaya-sanhita',
      excerpt: 'Everything you need to know about India\'s new criminal code replacing the IPC.',
      content: 'The Bharatiya Nyaya Sanhita (BNS) 2023 replaces the Indian Penal Code...',
      author: 'NyayaAI Legal Team',
      tags: ['Criminal Law', 'BNS', 'Legal Reform'],
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  await prisma.governmentNotification.createMany({
    data: [
      {
        title: 'Bharatiya Nyaya Sanhita comes into force',
        ministry: 'Ministry of Home Affairs',
        content: 'The Bharatiya Nyaya Sanhita, 2023 has come into force replacing the Indian Penal Code.',
        publishedAt: new Date('2024-07-01'),
        category: 'Criminal Law',
      },
      {
        title: 'New Consumer Protection Rules notified',
        ministry: 'Ministry of Consumer Affairs',
        content: 'Updated rules under the Consumer Protection Act, 2019 have been notified.',
        publishedAt: new Date('2024-06-15'),
        category: 'Consumer Law',
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seed completed successfully');
  console.log(`   Admin: admin@nyayaai.in / Admin@123456`);
  console.log(`   Advocate: advocate@nyayaai.in / Advocate@123`);
  console.log(`   Citizen: citizen@nyayaai.in / Citizen@123`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
