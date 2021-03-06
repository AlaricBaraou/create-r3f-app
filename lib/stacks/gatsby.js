'use strict';

const chalk = require('chalk');
const execa = require('execa');

const messages = require('../utils/messages');
const output = require('../utils/output');

module.exports = async function gatsby(projectName, projectPath, projectStyle) {
  const isStyled = projectStyle === 'styled';
  const starter = `https://github.com/RenaudROHLINGER/r3f-gatsby-starter#${isSass ? 'styled' : 'master'}`;

  output.info(
    `🚀 Creating ${chalk.bold(chalk.green(projectName))} using ${chalk.bold(
      'gatsby-cli/lib/init-starter',
    )} and ${chalk.bold('r3f-gatsby-starter')}...`,
  );

  await require('gatsby-cli/lib/init-starter').initStarter(starter, { rootPath: projectName });

  process.chdir(projectPath);

  try {
    await execa('git', ['commit', '--amend', '-m', 'Init Create React website with Gatsby'], {
      stdio: 'ignore',
    });
  } catch (e) {
    output.error(`Cannot change the commit message: ${e}`);
  }

  messages.start(projectName, 'gatsby');
};
