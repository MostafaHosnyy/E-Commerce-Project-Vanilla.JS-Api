const { spawn } = require('child_process');
const got = require('got');
const test = require('tape');


const env = Object.assign({}, process.env, {PORT: 8080});
const child = spawn('node', ['index.js'], {env});

test('responds to requests', (t) => {
  t.plan(4);

  child.stdout.on('data', _ => {
    (async () => {
      const response = await got('http://127.0.0.1:8080');
      child.kill();
      t.false(response.error);
      t.equal(response.statusCode, 200);
      t.notEqual(response.body.indexOf("<title>Node.js Getting Started on Heroku</title>"), -1);
      t.notEqual(response.body.indexOf("Getting Started on Heroku with Node.js"), -1);
    })();
  });
});
