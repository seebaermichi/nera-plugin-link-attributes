#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cwd = process.cwd()

// Safety check: block running from inside node_modules
const targetPkgJson = path.resolve(cwd, 'package.json')
if (cwd.includes('node_modules') || !fs.existsSync(targetPkgJson)) {
    console.error(
        '❌ Please run this command from the root of your project (not inside node_modules).'
    )
    process.exit(1)
}

const source = path.resolve(__dirname, '../config/link-attributes.yaml')
const target = path.resolve(cwd, 'config/link-attributes.yaml')

fs.mkdirSync(path.dirname(target), { recursive: true })

if (fs.existsSync(target)) {
    console.log('⚠️ config/link-attributes.yaml already exists. Skipping.')
    process.exit(0)
}

fs.copyFileSync(source, target)
console.log('✅ link-attributes.yaml published to config/')
