#!/usr/bin/env node

const optimist = require('optimist');

const FileLoader = require('./file-loader');
const Simulation = require('./simulation');

const SIMULATION_TIME = 2500; // ms

const log = console.log;
const noop = () => void 0;

async function main() {
  const fileLoader = new FileLoader();
  const filePaths = Array.from(optimist.argv._);

  console.log('Gerando testes para:', filePaths);
  console.log('');
  console.log('Executando...');

  const files = await fileLoader.load(filePaths);
  const sim = new Simulation(filePaths, files, fileLoader);
  await sim.readyPromise;

  console.log = noop;
  const results = await sim.run(SIMULATION_TIME);
  await fileLoader.save(results);

  console.log = log;
  console.log('');
  console.log('Geração de teste concluida.');
  console.log('Teste gerados:');
  console.log(results.map(a => a.path));
  console.log('');
}

main();
