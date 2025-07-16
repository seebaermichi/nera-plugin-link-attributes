import fs from 'fs'
import path from 'path'
import { describe, it, expect, beforeEach, afterEach, afterAll } from 'vitest'
import { execSync } from 'child_process'

const TEST_DIR = path.resolve(__dirname, '../.tmp/test-project')
const CONFIG_PATH = path.join(TEST_DIR, 'config', 'link-attributes.yaml')
const SCRIPT_PATH = path.resolve(__dirname, '../bin/publish-config.js')

describe('publish-config script', () => {
    beforeEach(() => {
        fs.rmSync(TEST_DIR, { recursive: true, force: true })
        fs.mkdirSync(TEST_DIR, { recursive: true })
        fs.writeFileSync(path.join(TEST_DIR, 'package.json'), '{}')
    })

    afterEach(() => {
        fs.rmSync(TEST_DIR, { recursive: true, force: true })
    })

    it('copies config file into target project', () => {
        execSync(`node ${SCRIPT_PATH}`, {
            cwd: TEST_DIR,
            stdio: 'inherit',
        })

        expect(fs.existsSync(CONFIG_PATH)).toBe(true)

        const contents = fs.readFileSync(CONFIG_PATH, 'utf8')
        expect(contents).toContain('target="_blank"')
    })

    it('skips if config already exists', () => {
        fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true })
        fs.writeFileSync(CONFIG_PATH, 'existing config')

        execSync(`node ${SCRIPT_PATH}`, {
            cwd: TEST_DIR,
        }).toString()

        const result = fs.readFileSync(CONFIG_PATH, 'utf8')
        expect(result).toBe('existing config')
    })
})

afterAll(() => {
    const tmpRoot = path.resolve(__dirname, '../.tmp')
    fs.rmSync(tmpRoot, { recursive: true, force: true })
})
