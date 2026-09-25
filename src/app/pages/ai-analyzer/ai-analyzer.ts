
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface AnalysisResult {

  skills: string[];

  keywords: string[];

  experience: string;

  responsibilities: string[];

  matchedSkills: string[];

  missingSkills: string[];

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
   * Your current skill set.
   *
   * We will improve this later by
   * loading skills from the user's profile.
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


  analyzeJob() {

    if (!this.jobDescription.trim()) {

      return;

    }


    this.analyzing = true;


    setTimeout(() => {

      const text =
        this.jobDescription.toLowerCase();


      /*
       * Detect skills mentioned
       * in the job description.
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
       * Detect important job keywords.
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
       * Detect required experience.
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
       * Find skills that match
       * your current skills.
       */

      const matchedSkills =
        foundSkills.filter(
          skill =>
            this.mySkills.includes(skill)
        );


      /*
       * Find skills required by the job
       * that you currently do not have.
       */

      const missingSkills =
        foundSkills.filter(
          skill =>
            !this.mySkills.includes(skill)
        );


      /*
       * Calculate match percentage.
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
       * Store the complete analysis.
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


        experience,


        responsibilities:
          responsibilities.length > 0
            ? responsibilities
            : ['No responsibilities detected'],


        matchedSkills,


        missingSkills,


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

