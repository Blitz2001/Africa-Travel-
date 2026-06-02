const fs = require('fs');
const pdf = require('pdf-parse');

async function parse() {
  try {
    console.log('Reading Proposal.pdf');
    const f1 = await pdf(fs.readFileSync('Proposal.pdf'));
    fs.writeFileSync('proposal_text.txt', f1.text);
    
    console.log('Reading Media kit Draft 01.pdf');
    const f2 = await pdf(fs.readFileSync('Media kit Draft 01.pdf'));
    fs.writeFileSync('media_kit_text.txt', f2.text);
    
    console.log('Extraction complete');
  } catch (err) {
    console.error(err);
  }
}

parse();
