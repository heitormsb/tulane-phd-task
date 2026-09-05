import type { SiteCopy } from './pt-BR';

const en = {
  "htmlLang": "en",
  "metadata": {
    "title": "Tessila | Connected healthcare data for analysis and research",
    "description": "Bring together hospital, clinic, laboratory and public data. Organize information for analysis and research with controlled sharing. Meet Tessila.",
    "category": "Healthcare technology",
    "socialDescription": "Hospitals, clinics, laboratories and public data: connected information for analysis and research. Meet Tessila.",
    "twitterDescription": "Connect, organize and share healthcare data for analysis and research.",
    "imageAlt": "Tessila — Connected data. New answers."
  },
  "switcher": {
    "label": "Language",
    "ariaLabel": "Select website language",
    "switchToPortuguese": "Switch language to Portuguese",
    "switchToEnglish": "English selected"
  },
  "nav": {
    "how": "How it works",
    "demo": "Try it",
    "governance": "Control and access",
    "schedule": "Book a demo",
    "skip": "Skip to content"
  },
  "hero": {
    "eyebrow": "For healthcare, research and data teams",
    "title": "A single view of your healthcare data,",
    "emphasis": "without moving a single piece.",
    "description": "Connect information from hospitals, clinics, laboratories and public sources. Query data at its source by default and organize a combined view for analysis and research.",
    "schedule": "Book a demonstration",
    "duration": "30 min · video call",
    "tryDemo": "Explore an example",
    "dataOrigin": "Keep the systems you already use",
    "governance": "Sharing with controlled access",
    "caption": "From clinics to public data: different sources, a broader view."
  },
  "heroNetwork": {
    "ariaLabel": "Example of sources connected through Tessila to organize information and answer questions",
    "hospitalA": "Hospital",
    "clinicalData": "Clinical data",
    "hospitalB": "Clinic",
    "visits": "Visits",
    "publicSource": "Public data",
    "regionalContext": "Regional context",
    "otherSources": "More connections",
    "oneQuery": "Connected data",
    "governedFederated": "shared concepts",
    "consolidatedAnswer": "One useful view",
    "withoutCopying": "for analysis and research",
    "policiesApplied": "defined access",
    "auditableRecord": "traceable origin"
  },
  "plain": {
    "ariaLabel": "An everyday example",
    "title": "How do you understand care across a region?",
    "description": "Hospitals and clinics record visits. Laboratories hold test results. Public data helps describe the population. Tessila lets you organize this information to see the wider picture.",
    "before": "In different places",
    "inputs": [
      "Hospital and clinic",
      "Laboratory",
      "Public data"
    ],
    "after": "In one view",
    "result": "Care and regional context"
  },
  "audience": {
    "label": "Start with a real question",
    "title": "What does your team",
    "emphasis": "need to find out?",
    "description": "Technology becomes useful when it helps with a task your team faces every day.",
    "cards": [
      {
        "tag": "Healthcare management",
        "title": "Compare information across facilities",
        "description": "Bring together hospital and clinic visits and use public information to better understand the region.",
        "outcome": "Less manual consolidation"
      },
      {
        "tag": "Research",
        "title": "Find data for a study",
        "description": "Prepare records from healthcare institutions and laboratories using common criteria and preserve the version used in your study.",
        "outcome": "Results you can reproduce"
      },
      {
        "tag": "Data teams",
        "title": "Build on work already done",
        "description": "Standardize information once and share prepared datasets with authorized people.",
        "outcome": "A foundation for new projects"
      }
    ]
  },
  "process": {
    "label": "How it works",
    "title": "Connect. Organize.",
    "emphasis": "Use together.",
    "description": "Your team chooses the sources and what it needs to analyze. Tessila helps prepare the path.",
    "cards": [
      {
        "icon": "+",
        "title": "Connect what already exists",
        "description": "Start with information relevant to your project, whether from your institution, partners or public sources.",
        "example": "Example: a clinic and public data about the region"
      },
      {
        "icon": "=",
        "title": "Use the same criteria",
        "description": "Organize information so your team can compare periods and institutions consistently.",
        "example": "Example: count visits over the same period"
      },
      {
        "icon": "↗",
        "title": "Use and share",
        "description": "Query data at its source by default. If your team requests a prepared dataset, it comes with a defined version and controlled, logged access.",
        "example": "Example: the same version for the research team"
      }
    ]
  },
  "demoSection": {
    "label": "Try it in a minute",
    "title": "One question.",
    "emphasis": "Different sources.",
    "description": "Explore sources such as hospitals, clinics and public data. Add other institutions and view the selected records in the Dashboard.",
    "ctaTitle": "Want to see this workflow in the product?",
    "ctaDescription": "In the demonstration, we walk through connections, data organization and sharing.",
    "ctaAction": "Show my team"
  },
  "sources": [
    {
      "id": "aurora",
      "name": "Aurora Hospital",
      "detail": "Visits and tests",
      "kind": "Hospital",
      "icon": "+",
      "color": "indigo"
    },
    {
      "id": "helena",
      "name": "Santa Helena Clinic",
      "detail": "Consultations and tests",
      "kind": "Clinic",
      "icon": "+",
      "color": "blue"
    },
    {
      "id": "regional",
      "name": "Public data",
      "detail": "Regional population · example",
      "kind": "Public source",
      "icon": "◎",
      "color": "teal"
    }
  ],
  "demo": {
    "additionalSources": [
      {
        "id": "atlas",
        "name": "Atlas Laboratory",
        "detail": "Visits and tests · sample data",
        "kind": "Laboratory",
        "icon": "◇",
        "color": "green"
      },
      {
        "id": "vale",
        "name": "Vale Clinic",
        "detail": "Consultations and tests · sample data",
        "kind": "Clinic",
        "icon": "+",
        "color": "violet"
      }
    ],
    "scenarios": [
      {
        "id": "visits",
        "label": "Compare visits",
        "question": "How many visits were recorded in June across the selected institutions?",
        "resultLabel": "visits in June",
        "chartTitle": "Visits by institution",
        "unit": "Visits",
        "explanation": "We add the June visits from the selected institutions. The chart shows the trend from January to June. One person can have more than one visit."
      },
      {
        "id": "cohort",
        "label": "Prepare a study",
        "question": "How many June records meet the same criteria for a study?",
        "resultLabel": "eligible records in June",
        "chartTitle": "Research records by institution",
        "unit": "Records",
        "explanation": "Example of a shared criterion: records of adults with diabetes and an available test. These are records per institution, not a count of unique people across sources."
      },
      {
        "id": "exams",
        "label": "Monitor tests",
        "question": "How many tests were performed in June across the selected institutions?",
        "resultLabel": "tests performed in June",
        "chartTitle": "Tests by institution",
        "unit": "Tests",
        "explanation": "We add the June tests from the selected institutions. One visit can involve several tests. The chart helps you follow demand over the months."
      }
    ],
    "ariaLabel": "Interactive example with fictitious data",
    "tabsAriaLabel": "Example areas",
    "tabs": [
      "Question",
      "Dashboard",
      "Sources",
      "Log"
    ],
    "safeEnvironment": "Fictitious data",
    "scenarioLabel": "1. Choose a question",
    "querySources": "2. Select the sources",
    "sourcesAriaLabel": "Participating sources",
    "activeSingular": "active",
    "activePlural": "active",
    "dataAtSource": "Different kinds of information",
    "noTransfer": "Institutions show activity. Public data helps describe the region.",
    "queryLabel": "The question in this example",
    "selectSource": "Select a source",
    "runQuery": "See the steps",
    "querying": "In progress…",
    "runAgain": "See the steps again",
    "remove": "Remove",
    "add": "Add",
    "fromQuery": "from the example",
    "toQuery": "to the example",
    "federatedOrchestrator": "Connecting information",
    "applyingPolicies": "Using common criteria",
    "combiningAnswers": "Combining results",
    "answer": "Answer",
    "activateSource": "Select a hospital, clinic or laboratory to see the steps.",
    "runToVisualize": "See how the answer comes together.",
    "dataStays": "Querying the selected sources.",
    "consolidatedInsight": "Example result",
    "sourceSingular": "source",
    "sourcePlural": "sources",
    "institutionSingular": "institution",
    "institutionPlural": "institutions",
    "progress": [
      "Query sources",
      "Apply criteria",
      "Combine results"
    ],
    "statuses": [
      "Ready to run",
      "Querying",
      "Organizing",
      "Combining",
      "Answer ready"
    ],
    "viewResult": "Explore the Dashboard",
    "periodLabel": "Period: January to June · fictitious data",
    "periods": [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun"
    ],
    "auditEvents": [
      {
        "phase": 1,
        "title": "Sources selected",
        "text": "Only the selected sources take part in the example."
      },
      {
        "phase": 2,
        "title": "Common criteria",
        "text": "The same criterion is used across the selected institutions."
      },
      {
        "phase": 3,
        "title": "Results combined",
        "text": "Records from the selected institutions form the answer."
      },
      {
        "phase": 4,
        "title": "Run complete",
        "text": "This log illustrates the steps; it is not an audit of real data."
      }
    ],
    "dashboardPanel": {
      "eyebrow": "Understand the answer",
      "title": "Your question in numbers",
      "description": "The metric and chart answer the selected question.",
      "consolidatedResult": "June result",
      "participatingSources": "Participating sources",
      "currentQuestion": "Selected question",
      "sourceCoverage": "Contribution by source",
      "included": "Included",
      "excluded": "Outside the query",
      "governedNote": "Values calculated from the selected institutions’ sample data.",
      "awaiting": "Select a hospital, clinic or laboratory to explore the Dashboard.",
      "showValues": "View values in a table",
      "month": "Month",
      "value": "Value",
      "chartCaption": "Sample data. Each line represents a selected institution.",
      "ready": "Updates with your selection",
      "chooseSources": "Choose sources",
      "awaitingActivity": "To see visits, research records or tests, also select a hospital, clinic or laboratory.",
      "source": "Institution"
    },
    "sourcesPanel": {
      "eyebrow": "Example sources",
      "title": "Choose who participates",
      "description": "Hospitals, clinics, laboratories and public sources can contribute in different ways. Select the sources that make sense for your question.",
      "selected": "Selected",
      "included": "Included",
      "add": "Add",
      "action": "Use these sources",
      "addSource": "Add a source",
      "addSourceDescription": "Include a laboratory or another clinic in this example. In the product, sources are chosen to suit your project.",
      "allAdded": "All sources in this example have been added. In the demonstration, we can discuss the sources for your project."
    },
    "auditPanel": {
      "eyebrow": "Illustrative log",
      "title": "Understand each step",
      "description": "Follow the steps of this simulation. In the product, access records support sharing traceability.",
      "clear": "Clear log",
      "waiting": "Waiting for a run.",
      "backAndRun": "Go back and run",
      "back": "Back to the question"
    },
    "fictitiousData": "Guided simulation · fictitious institutions and data",
    "authorizedOnly": "An educational example, not a query to the product. No real data is requested.",
    "selectActivitySource": "Select an institution"
  },
  "governance": {
    "label": "Control and confidence",
    "title": "Share what makes sense.",
    "emphasis": "With people who have access.",
    "description": "Prepared datasets are created only at your team’s request, with a defined version, authorized recipients and logged access.",
    "proofAria": "Example of a dataset shared for research",
    "query": "Research dataset",
    "authorized": "Example",
    "steps": [
      {
        "label": "Recipient",
        "status": "Authorized"
      },
      {
        "label": "Version",
        "status": "Defined"
      },
      {
        "label": "Access",
        "status": "Logged"
      }
    ],
    "noCopy": "A consistent version for the team",
    "auditTrail": "Traceable access",
    "cards": [
      {
        "title": "You define the dataset",
        "description": "When requesting a prepared dataset, choose the information and criteria your team needs for analysis or sharing."
      },
      {
        "title": "Authorized recipients",
        "description": "Define who can access each shared dataset and manage those permissions."
      },
      {
        "title": "The same version",
        "description": "Each prepared dataset has a defined version so your team can reproduce the analysis, even as the source evolves."
      },
      {
        "title": "Access history",
        "description": "Access to shared datasets is logged so your team can track their use."
      }
    ]
  },
  "evidence": {
    "label": "Applied research for healthcare",
    "title": "Scientific knowledge.",
    "emphasis": "Everyday use.",
    "description": "Tessila grew out of research into bringing healthcare information together and preparing it for analysis. Its purpose is to help teams turn scattered data into a shared foundation for their work.",
    "recognitionTitle": "From research to your team’s next discovery",
    "recognitionDescription": "Tessila brings research closer to the challenges of those who need to bring data together and find answers. It is grounded in scientific work reviewed by experts and accepted at one of Latin America’s most renowned software engineering conferences.",
    "aboutLabel": "About Tessila",
    "aboutTitle": "Technology that brings information together",
    "aboutDescription": "Tessila brings data connection, organization and sharing into one workflow to support healthcare, research and technology teams.",
    "aboutAction": "Meet Tessila",
    "nameNote": "The name comes from tessera, a mosaic tile: distinct pieces of information forming a useful picture."
  },
  "faqs": [
    {
      "question": "Do I need technical knowledge to use Tessila?",
      "answer": "You can start with the question your team needs to answer. Connecting and preparing sources requires technical configuration; the demonstration shows how that work can be shared between your team and the people managing the data."
    },
    {
      "question": "Can I use data from clinics, laboratories or public sources?",
      "answer": "Yes, a project can bring together information from different institutions and public sources, such as regional population data. In the first conversation, we assess which information you want to use, the access conditions and what is needed to connect it."
    },
    {
      "question": "Do we need to replace our current systems?",
      "answer": "The aim is to work with the systems your institution already uses. In the first conversation, we assess what information is available, how to access it and what is needed to connect it to Tessila."
    },
    {
      "question": "Does data stay at the source or get stored?",
      "answer": "By default, Tessila queries data in its source systems without creating a permanent copy. A prepared dataset is created and stored only when your team requests it for analysis, research or sharing. That dataset has a defined version, controlled access and access logs."
    },
    {
      "question": "Who can access shared data?",
      "answer": "The responsible team chooses which information to share and who can access it. Tessila lets you control access and keep a record of use."
    },
    {
      "question": "How does Tessila support responsible use of healthcare data?",
      "answer": "Selecting information, controlling sharing and recording access help organize data use. The institution must define legal bases, responsibilities and other protection controls; the platform does not guarantee compliance on its own."
    },
    {
      "question": "Is the example on this page the real product?",
      "answer": "No. The example uses preset questions, fictitious institutions and sample data, including the public source. You can add sources and explore the Dashboard from the start. The video demonstration shows the product and how to connect, organize and share data."
    },
    {
      "question": "What happens in the first demonstration?",
      "answer": "A 30-minute video call to understand your situation, walk through the product and explore a first use case. You do not need patient data: a description of your sources and the question you want to answer is enough."
    }
  ],
  "faqSection": {
    "label": "Frequently asked questions",
    "title": "What you need to know",
    "emphasis": "to get started.",
    "description": "From the first conversation to decisions about data."
  },
  "cta": {
    "label": "Let’s look at your use case",
    "title": "What question could your data answer?",
    "description": "In 30 minutes, we learn about your sources, show the product and discuss a first use case.",
    "action": "Book a demonstration",
    "note": "Video call · no patient data required",
    "email": "Prefer to write?"
  },
  "notFound": {
    "metaTitle": "Page not found",
    "metaDescription": "The page you tried to access could not be found.",
    "homeAria": "Tessila — English home page",
    "schedule": "Book a meeting",
    "error": "Error 404",
    "title": "This piece does not belong to this mosaic.",
    "description": "The page may have moved or the link may be incorrect. Return to the home page to discover Tessila.",
    "back": "Back to the beginning",
    "demo": "View the simulation"
  },
  "footer": {
    "tagline": "Connected data. New answers.",
    "how": "How it works",
    "governance": "Control and access",
    "about": "About Tessila",
    "faq": "Frequently asked questions",
    "product": "Data for healthcare analysis and research"
  }
} satisfies SiteCopy;

export default en;
