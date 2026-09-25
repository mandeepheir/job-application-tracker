
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface AnalysisResult {

  skills: string[];

  keywords: string[];

  resumeKeywords: string[];

  experience: string;

  responsibilities: string[];

  matchedSkills: string[];

  missingSkills: string[];

  recommendedLearning: string[];

  matchScore: number;

}

@Component({
  selector: 'app-ai-analyzer',
  imports: [FormsModule],
  templateUrl: './ai-analyzer.html',
  styleUrl: './ai-analyzer.css'
})
export class AiAnalyzer {

  jobDescription = '';

  analysisResult: AnalysisResult | null = null;

  analyzing = false;


  /*
   * Your current skills.
   */

  mySkills = [

    'javascript',
    'typescript',
    'angular',
    'html',
    'css',
    'python',
    'java',
    'sql',
    'firebase',
    'node.js',
    'node',
    'git',
    'github',
    'rest api',
    'api',
    'data structures',
    'algorithms'

  ];


  /*
   * Resume keywords that can be detected.
   */

  possibleResumeKeywords = [

    'javascript',
    'typescript',
    'angular',
    'react',
    'vue',
    'html',
    'css',
    'python',
    'java',
    'c++',
    'c#',
    'sql',
    'mongodb',
    'firebase',
    'node.js',
    'node',
    'express',
    'git',
    'github',
    'docker',
    'kubernetes',
    'aws',
    'azure',
    'gcp',
    'machine learning',
    'artificial intelligence',
    'ai',
    'data structures',
    'algorithms',
    'rest api',
    'api',
    'spring boot',
    'full stack',
    'frontend',
    'backend',
    'web development',
    'software development',
    'problem solving',
    'teamwork',
    'communication',
    'agile',
    'scrum',
    'testing',
    'debugging',
    'cloud',
    'database',
    'deployment',
    'performance',
    'scalable',
    'responsive design'

  ];


  /*
   * Learning recommendations
   * for common technologies.
   */

  learningRecommendations: {
    [key: string]: string;
  } = {

    'javascript':
      'Practice modern JavaScript, ES6+, asynchronous programming and DOM manipulation.',

    'typescript':
      'Learn TypeScript interfaces, types, generics, classes and advanced type patterns.',

    'angular':
      'Practice Angular components, routing, services, forms, RxJS and state management.',

    'react':
      'Learn React components, hooks, props, state management and API integration.',

    'vue':
      'Learn Vue components, reactive state, routing and API integration.',

    'html':
      'Practice semantic HTML, accessibility and modern form structures.',

    'css':
      'Practice responsive layouts, Flexbox, Grid, animations and modern CSS.',

    'python':
      'Practice Python fundamentals, object-oriented programming and API development.',

    'java':
      'Practice Java OOP, collections, exception handling and backend development.',

    'c++':
      'Practice C++ fundamentals, STL, memory management and data structures.',

    'c#':
      'Learn C# fundamentals, .NET and object-oriented application development.',

    'sql':
      'Practice SQL queries, joins, indexes, normalization and database design.',

    'mongodb':
      'Learn MongoDB documents, collections, queries, indexes and aggregation.',

    'firebase':
      'Practice Firebase Authentication, Firestore, security rules and deployment.',

    'node.js':
      'Learn Node.js backend development, APIs, middleware and asynchronous programming.',

    'node':
      'Learn Node.js backend development, APIs, middleware and asynchronous programming.',

    'express':
      'Build REST APIs with Express, middleware, routing and authentication.',

    'git':
      'Practice Git branching, merging, rebasing and collaborative workflows.',

    'github':
      'Learn GitHub pull requests, issues, branching strategies and project workflows.',

    'docker':
      'Learn Docker images, containers, Dockerfiles and containerized application deployment.',

    'kubernetes':
      'Learn Kubernetes pods, deployments, services, configurations and scaling.',

    'aws':
      'Learn AWS fundamentals including EC2, S3, IAM, Lambda and cloud deployment.',

    'azure':
      'Learn Azure fundamentals, cloud services, identity and application deployment.',

    'gcp':
      'Learn Google Cloud fundamentals, compute, storage and application deployment.',

    'machine learning':
      'Learn supervised learning, model evaluation, feature engineering and Python ML libraries.',

    'artificial intelligence':
      'Study AI fundamentals, machine learning concepts and practical AI applications.',

    'ai':
      'Learn AI fundamentals, LLM concepts, prompt engineering and AI API integration.',

    'data structures':
      'Practice arrays, linked lists, stacks, queues, trees, graphs and hash tables.',

    'algorithms':
      'Practice sorting, searching, recursion, dynamic programming and graph algorithms.',

    'rest api':
      'Build REST APIs using HTTP methods, JSON, authentication and error handling.',

    'api':
      'Practice API integration, HTTP requests, authentication and error handling.',

    'spring boot':
      'Learn Spring Boot, REST APIs, dependency injection and Java backend development.',

    'full stack':
      'Build complete applications connecting a frontend, backend and database.',

    'frontend':
      'Practice responsive UI development, accessibility and frontend architecture.',

    'backend':
      'Learn server-side development, APIs, databases, authentication and deployment.',

    'web development':
      'Build responsive full-stack web applications using modern development tools.',

    'testing':
      'Learn unit testing, integration testing and test-driven development basics.',

    'debugging':
      'Practice browser debugging, logging, breakpoints and systematic troubleshooting.',

    'cloud':
      'Learn cloud computing fundamentals, deployment, networking and cloud security.',

    'database':
      'Study relational and NoSQL databases, indexing, queries and database design.',

    'deployment':
      'Learn CI/CD, hosting, environment variables and production deployment.',

    'performance':
      'Learn web performance optimization, caching, lazy loading and profiling.',

    'responsive design':
      'Practice responsive layouts using CSS Grid, Flexbox and mobile-first design.'

  };


  analyzeJob() {

    if (!this.jobDescription.trim()) {

      return;

    }

    this.analyzing = true;


    setTimeout(() => {

      const text =
        this.jobDescription.toLowerCase();


      /*
       * Detect technical skills.
       */

      const possibleSkills = [

        'javascript',
        'typescript',
        'angular',
        'react',
        'vue',
        'html',
        'css',
        'python',
        'java',
        'c++',
        'c#',
        'sql',
        'mongodb',
        'firebase',
        'node.js',
        'node',
        'express',
        'git',
        'github',
        'docker',
        'kubernetes',
        'aws',
        'azure',
        'gcp',
        'machine learning',
        'artificial intelligence',
        'ai',
        'data structures',
        'algorithms',
        'rest api',
        'api',
        'spring boot'

      ];


      const foundSkills =
        possibleSkills.filter(
          skill =>
            text.includes(skill)
        );


      /*
       * Detect important keywords.
       */

      const possibleKeywords = [

        'software development',
        'full stack',
        'frontend',
        'backend',
        'web development',
        'problem solving',
        'teamwork',
        'communication',
        'agile',
        'scrum',
        'testing',
        'debugging',
        'cloud',
        'database',
        'deployment',
        'performance',
        'scalable',
        'responsive design'

      ];


      const foundKeywords =
        possibleKeywords.filter(
          keyword =>
            text.includes(keyword)
        );


      /*
       * Detect resume keywords.
       */

      const resumeKeywords =
        this.possibleResumeKeywords.filter(
          keyword =>
            text.includes(keyword)
        );


      /*
       * Detect experience.
       */

      const experienceMatch =
        this.jobDescription.match(
          /(\d+\+?\s*(?:years?|yrs?))\s*(?:of\s*)?(?:experience|exp)/i
        );


      const experience =
        experienceMatch
          ? experienceMatch[1]
          : 'Not specified';


      /*
       * Extract responsibilities.
       */

      const responsibilities =
        this.extractResponsibilities(
          this.jobDescription
        );


      /*
       * Find matching skills.
       */

      const matchedSkills =
        foundSkills.filter(
          skill =>
            this.mySkills.includes(skill)
        );


      /*
       * Find missing skills.
       */

      const missingSkills =
        foundSkills.filter(
          skill =>
            !this.mySkills.includes(skill)
        );


      /*
       * Create learning recommendations.
       */

      const recommendedLearning =
        missingSkills

          .map(
            skill =>
              this.learningRecommendations[skill]
          )

          .filter(
            recommendation =>
              !!recommendation
          );


      /*
       * Calculate match score.
       */

      let matchScore = 0;


      if (foundSkills.length > 0) {

        matchScore =
          Math.round(
            (
              matchedSkills.length /
              foundSkills.length
            ) * 100
          );

      }


      /*
       * Store results.
       */

      this.analysisResult = {

        skills:
          foundSkills.length > 0
            ? foundSkills
            : ['No specific skills detected'],

        keywords:
          foundKeywords.length > 0
            ? foundKeywords
            : ['No specific keywords detected'],

        resumeKeywords:
          resumeKeywords.length > 0
            ? resumeKeywords
            : ['No relevant resume keywords detected'],

        experience,

        responsibilities:
          responsibilities.length > 0
            ? responsibilities
            : ['No responsibilities detected'],

        matchedSkills,

        missingSkills,

        recommendedLearning,

        matchScore

      };


      this.analyzing = false;

    }, 700);

  }


  private extractResponsibilities(
    text: string
  ): string[] {

    const lines =
      text
        .split('\n')
        .map(
          line =>
            line.trim()
        )
        .filter(
          line =>
            line.length > 0
        );


    const responsibilityLines =
      lines.filter(
        line => {

          const lower =
            line.toLowerCase();


          return (

            line.startsWith('-') ||

            line.startsWith('•') ||

            lower.startsWith(
              'responsibilities'
            ) ||

            lower.includes('develop') ||

            lower.includes('build') ||

            lower.includes('design') ||

            lower.includes('maintain') ||

            lower.includes('implement') ||

            lower.includes('collaborate')

          );

        }
      );


    return responsibilityLines

      .slice(0, 8)

      .map(
        line =>
          line
            .replace(
              /^[-•]\s*/,
              ''
            )
            .trim()
      );

  }


  clearAnalyzer() {

    this.jobDescription = '';

    this.analysisResult = null;

  }

}

