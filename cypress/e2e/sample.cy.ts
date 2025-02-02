/// <reference types="cypress" />
import { sampleIt } from '../support/sample';

describe('Test Import Samples', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.spyAllApiCalls();
  });

  const projectCategories = [
    'classification',
    'detection',
    'semanticSegmentation',
    'instanceSegmentation',
  ];

  const tasks = [
    {
      name: 'Clear Projects',
      func: () => {
        cy.clearPjs();
      },
    },
    ...projectCategories.map((catg) => sampleIt.import(catg)), // create
    ...projectCategories.map((catg) => sampleIt.pjDetails(catg)), // modify detail
    ...projectCategories.map((catg) => sampleIt.splitDataset(catg)), // split modal
  ];

  for (const task of tasks) {
    it(task.name, task.func);
  }
});
