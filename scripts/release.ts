import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

/**
 * Read the release notes from changelog.json for the GitHub Release
 */
function generateReleaseNotes() {
  const changelogPath = path.join(process.cwd(), 'changelog.json')
  const changelog = JSON.parse(fs.readFileSync(changelogPath, 'utf-8'))[0]

  const releaseNotes = `
### What's Changed
${changelog?.comment ?? ''}
`
  const notesFile = path.join(process.cwd(), 'release-notes.md')
  fs.writeFileSync(notesFile, releaseNotes.trim())
  console.log('Release notes generated:', notesFile)
}

generateReleaseNotes()
