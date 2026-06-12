const { execSync } = require('child_process');

function run(cmd) {
  try {
    console.log(`> ${cmd}`);
    const out = execSync(cmd).toString().trim();
    if (out) console.log(out);
    return true;
  } catch (err) {
    console.error(`Error:`, err.message);
    if (err.stdout) console.log('Stdout:', err.stdout.toString());
    if (err.stderr) console.log('Stderr:', err.stderr.toString());
    return false;
  }
}

console.log('--- Merging with --allow-unrelated-histories ---');
const mergeSuccess = run('git merge origin/phase2/full-ecosystem --no-edit -X theirs --allow-unrelated-histories');

if (mergeSuccess) {
  console.log('--- Verifying models folder ---');
  const fs = require('fs');
  try {
    console.log('Models files list:', fs.readdirSync('models'));
  } catch (e) {
    console.error(e.message);
  }
}
