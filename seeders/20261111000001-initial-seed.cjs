"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const DEFAULT_PASSWORD = process.env.DEFAULT_SEED_PASSWORD || "Anrf@2026";

const seedTeams = [
  {
    projectId: "biotech",
    projectTitle:
      "Next Generation approach to develop tetravalent vaccine against Dengue Virus using Engineered Dendritic cells derived nanodexosomes",
    pi: {
      name: "Prof. Anup Kumar Kesavan",
      role: "Principal Investigator",
      affiliation: "ANRF PAIR, Kannur University",
    },
    coInvestigators: [],
    members: [
      {
        name: "Yadhu Krishna Menon",
        role: "Project Associate",
        email: "yadhukrishna469@gmail.com",
      },
    ],
  },
  {
    projectId: "sports-science",
    projectTitle:
      "Interactive Citizen Driven Health Information System and Social wellbeing Frame work for Early Disease Surveillance, Healthcare and Health Promotion- Pilot study in Kerala",
    pi: {
      name: "Prof. Anil Ramachandran",
      role: "Project Investigator",
      affiliation: "ANRF PAIR, Kannur University",
    },
    coInvestigators: [
      { name: "Dr. Shijila P S" },
      { name: "Dr. Johnson Alex" },
      { name: "Dr. Seetha Kakkoth" },
      { name: "Prof. N S Sreekanth" },
    ],
    members: [
      {
        name: "Sravan Sasikumar",
        role: "Project Associate",
        email: "sravanunni5@gmail.com",
      },
      {
        name: "Jyothi N",
        role: "Technical Assistant",
        email: "nssjyothi@gmail.com",
      },
    ],
  },
  {
    projectId: "it",
    projectTitle: "Non-Invasive Blood Parameter Profiling",
    pi: {
      name: "Prof. N S Sreekanth",
      role: "Project Investigator",
      affiliation: "ANRF PAIR, Kannur University",
    },
    coInvestigators: [
      { name: "Prof. Anup Kumar Kesavan" },
      { name: "Dr. Baiju K V" },
      { name: "Dr. Soorej M Basheer" },
    ],
    members: [
      {
        name: "Ms. Sreya C",
        role: "Project Associate",
        email: "sreyamorazha@gmail.com",
      },
      {
        name: "Mr. Vivek Ram M J",
        role: "Project Associate",
        email: "vrammj00@gmail.com",
      },
      {
        name: "Mr. Sanal V",
        role: "Project Associate",
        email: "sanalv.phy@gmail.com",
      },
      {
        name: "Mr. Aswin K",
        role: "Technical Assistant",
        email: "aswinkorothpc@gmail.com",
      },
    ],
  },
  {
    projectId: "chemistry",
    projectTitle:
      "Development of solar light driven g-C3N4 based photocatalytic system and fabrication of CPC photoreactor for Hospital waste water treatment",
    pi: {
      name: "Dr. Baiju K V",
      role: "Project Investigator",
      affiliation: "ANRF PAIR, Kannur University",
    },
    coInvestigators: [{ name: "Dr. Soorej M Basheer" }],
    members: [
      {
        name: "Mr. Akshay P K",
        role: "Project Associate",
        email: "akshaykannuruniv@gmail.com",
      },
      {
        name: "Mr. Karthikeyan E",
        role: "Project Associate",
        email: "karthikeyan03042002@gmail.com",
      },
      {
        name: "Dr. Anjali Paravannoor",
        role: "Research Associate",
        email: "anjali.nano@gmail.com",
      },
    ],
  },
  {
    projectId: "mol-bio",
    projectTitle:
      "Exploring novel bioactive compounds from marine microbes and their Antimicrobial, Antiviral, and Anticancer Properties",
    pi: {
      name: "Dr. Soorej M Basheer",
      role: "Project Investigator",
      affiliation: "ANRF PAIR, Kannur University",
    },
    coInvestigators: [
      { name: "Dr. Arun Kumar" },
      { name: "Dr. Anupama K P" },
      { name: "Dr. Sreeja Chellappan" },
      { name: "Prof. Sabu A" },
    ],
    members: [
      {
        name: "Ms. Tiya Mathai",
        role: "Project Associate",
        email: "tiyamathai11@gmail.com",
      },
      {
        name: "Mr. Ajay L Manoj",
        role: "Project Associate",
        email: "ajaylekhamanoj@gmail.com",
      },
      {
        name: "Mr. Gokuljith S",
        role: "Project Associate",
        email: "i.amgjs045@gmail.com",
      },
    ],
  },
  {
    projectId: "zoology",
    projectTitle: "Vector Dynamics and Hotspot Mapping for Dengue/Malaria",
    pi: {
      name: "Dr. Joseph Erinjery",
      role: "Project Investigator",
      affiliation: "ANRF PAIR, Kannur University",
    },
    coInvestigators: [],
    members: [
      {
        name: "Abhina P",
        role: "Project Associate",
        email: "pabhina3824@gmail.com",
      },
      {
        name: "Anusree C R",
        role: "Project Associate",
        email: "anusreecr02@gmail.com",
      },
    ],
  },
];

const seedBulletins = [
  {
    projectId: "general",
    volume: "02",
    issue: "04",
    title: "Antimicrobial Resistance & Multi-Omics Profiling in Coastal Kerala",
    summary:
      "Quarterly highlights on microbial resistance surveillance, genomic sequencing of nosocomial isolates, and clinical cohort outcomes.",
    downloadUrl: "#",
    publishDate: "November 2026",
    themeColor: "teal",
  },
  {
    projectId: "general",
    volume: "02",
    issue: "03",
    title: "Metabolic Syndrome & Endocrine Disruptors: Regional Biomarkers",
    summary:
      "Investigating micro-pollutant exposure pathways and hepatic insulin sensitivity markers in rural agricultural zones.",
    downloadUrl: "#",
    publishDate: "August 2026",
    themeColor: "navy",
  },
  {
    projectId: "general",
    volume: "02",
    issue: "02",
    title: "Nanostructured Delivery Vehicles for Triple-Negative Breast Cancer",
    summary:
      "Pre-clinical assessments of folate-conjugated chitosan nanoparticles synthesized jointly with the University of Hyderabad hub.",
    downloadUrl: "#",
    publishDate: "May 2026",
    themeColor: "teal",
  },
];

const seedPresentations = [
  {
    projectId: "general",
    date: "18 NOV 2026",
    venue: "SEMINAR COMPLEX · AUDITORIUM A & HYBRID",
    title:
      "Targeting Oncogenic Signaling Cascades in Triple-Negative Breast Cancer: A Multi-Omics Perspective",
    speaker: "Dr. K. Baiju (Dept of Chemistry)",
    department: "Department of Chemistry",
  },
  {
    projectId: "general",
    date: "27 NOV 2026",
    venue: "HYBRID VIRTUAL / UoH HUB CONNECTION",
    title:
      "Genomic Surveillance of Multi-Drug Resistant Enterobacteriaceae: 2026 Surveillance Report",
    speaker: "Prof. A. Sabu (Dept of Biotechnology)",
    department: "Department of Biotechnology & Microbiology",
  },
  {
    projectId: "general",
    date: "04 DEC 2026",
    venue: "CENTRAL AUDITORIUM · KANNUR CAMPUS",
    title:
      "Machine Learning Architectures for De Novo Peptide Design Against Viral Spike Glycoproteins",
    speaker: "Dr. C. Baburaj (Dept of Bioinformatics)",
    department: "Department of Mathematical Sciences & Bioinformatics",
  },
];

const frontendGalleryFiles = [
  "18957.jpg.jpeg",
  "18963.jpg.jpeg",
  "18967.jpg.jpeg",
  "18979.jpg.jpeg",
  "IMG_6850.JPG",
  "IMG_6853.JPG",
  "IMG_6857.JPG",
  "IMG_6978.JPG",
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);

    // 1. Seed Project Teams & Accounts (1 PI + 1 Member account per project)
    const teamRows = seedTeams.map((team) => ({
      projectId: team.projectId,
      projectTitle: team.projectTitle,
      pi: JSON.stringify(team.pi),
      coInvestigators: JSON.stringify(team.coInvestigators),
      members: JSON.stringify(team.members),
      createdAt: now,
      updatedAt: now,
    }));
    await queryInterface.bulkInsert("project_teams", teamRows);

    const accountRows = seedTeams.flatMap((team) => [
      {
        id: crypto.randomUUID(),
        projectId: team.projectId,
        role: "pi",
        username: `${team.projectId}-pi`,
        passwordHash,
        isDefaultPassword: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: crypto.randomUUID(),
        projectId: team.projectId,
        role: "member",
        username: `${team.projectId}-team`,
        passwordHash,
        isDefaultPassword: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);
    await queryInterface.bulkInsert("accounts", accountRows);

    // 2. Seed Bulletins
    const bulletinRows = seedBulletins.map((b) => ({
      id: crypto.randomUUID(),
      projectId: b.projectId,
      volume: b.volume,
      issue: b.issue,
      title: b.title,
      summary: b.summary,
      downloadUrl: b.downloadUrl,
      publishDate: b.publishDate,
      themeColor: b.themeColor,
      fileName: null,
      createdAt: now,
      updatedAt: now,
    }));
    await queryInterface.bulkInsert("bulletins", bulletinRows);

    // 3. Seed Presentations
    const presentationRows = seedPresentations.map((p) => ({
      id: crypto.randomUUID(),
      projectId: p.projectId,
      date: p.date,
      venue: p.venue,
      title: p.title,
      speaker: p.speaker,
      department: p.department,
      slidesUrl: null,
      fileName: null,
      createdAt: now,
      updatedAt: now,
    }));
    await queryInterface.bulkInsert("presentations", presentationRows);

    // 4. Copy initial gallery images from frontend/src/assets/images to backend/uploads & seed gallery_items
    const uploadDir = path.resolve(__dirname, "..", "uploads");
    const frontendImgDir = path.resolve(__dirname, "..", "..", "frontend", "src", "assets", "images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const galleryRows = frontendGalleryFiles.map((fileName, idx) => {
      const srcPath = path.join(frontendImgDir, fileName);
      const destPath = path.join(uploadDir, fileName);
      if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
      return {
        id: crypto.randomUUID(),
        projectId: "general",
        src: `/uploads/${fileName}`,
        caption: `ANRF-PAIR Gallery Image ${idx + 1}`,
        uploadedBy: null,
        createdAt: now,
        updatedAt: now,
      };
    });
    await queryInterface.bulkInsert("gallery_items", galleryRows);

    // 5. Seed initial Contact Query
    await queryInterface.bulkInsert("contact_queries", [
      {
        id: crypto.randomUUID(),
        name: "Dr. Meera Nair",
        email: "meera.nair@cusat.ac.in",
        subject: "Collaborative sampling on Antimicrobial Resistance",
        message:
          "We would like to discuss potential sample sharing and joint workshops under the ANRF-PAIR coastal surveillance initiative.",
        projectId: "general",
        read: false,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("contact_queries", null, {});
    await queryInterface.bulkDelete("gallery_items", null, {});
    await queryInterface.bulkDelete("presentations", null, {});
    await queryInterface.bulkDelete("bulletins", null, {});
    await queryInterface.bulkDelete("accounts", null, {});
    await queryInterface.bulkDelete("project_teams", null, {});
  },
};

