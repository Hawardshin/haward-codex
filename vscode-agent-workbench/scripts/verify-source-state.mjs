import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const sourceRoot = resolve(projectRoot, 'source');
const patchPath = resolve(projectRoot, 'patches/0001-agent-workspace-hard-fork-foundation.patch');

function fail(message) {
	console.error(`verify-source-state failed: ${message}`);
	process.exit(1);
}

function git(args) {
	return execFileSync('git', ['-C', sourceRoot, ...args], { encoding: 'utf8' }).trim();
}

function readJson(path) {
	return JSON.parse(readFileSync(path, 'utf8'));
}

function assertEqual(actual, expected, label) {
	if (actual !== expected) {
		fail(`${label}: expected ${expected}, got ${actual}`);
	}
}

if (!existsSync(sourceRoot)) {
	fail(`missing local source clone at ${sourceRoot}`);
}

if (!existsSync(patchPath)) {
	fail(`missing tracked patch at ${patchPath}`);
}

const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
const head = git(['rev-parse', 'HEAD']);
const status = git(['status', '--short']);

assertEqual(branch, 'awp/hard-fork-workspace-foundation', 'source branch');
assertEqual(head, 'c7df3053c6da59dae9af42d5474a0d45dd3dc594', 'source commit');

if (status) {
	fail(`source clone has uncommitted changes:\n${status}`);
}

const product = readJson(resolve(sourceRoot, 'product.json'));
const expectedProduct = {
	nameShort: 'Agent Workspace Code',
	nameLong: 'Agent Workspace Code',
	applicationName: 'agent-workspace-code',
	dataFolderName: '.agent-workspace-code',
	sharedDataFolderName: '.agent-workspace-code-shared',
	serverApplicationName: 'agent-workspace-code-server',
	tunnelApplicationName: 'agent-workspace-code-tunnel',
	darwinBundleIdentifier: 'com.agentworkspace.code',
	urlProtocol: 'agent-workspace-code'
};

for (const [key, value] of Object.entries(expectedProduct)) {
	assertEqual(product[key], value, `product.${key}`);
}

const extensionFiles = [
	'extensions/agent-workspace/package.json',
	'extensions/agent-workspace/tsconfig.json',
	'extensions/agent-workspace/src/extension.ts'
];

for (const file of extensionFiles) {
	if (!existsSync(resolve(sourceRoot, file))) {
		fail(`missing source file ${file}`);
	}
}

const gulpfile = readFileSync(resolve(sourceRoot, 'build/gulpfile.extensions.ts'), 'utf8');
if (!gulpfile.includes('extensions/agent-workspace/tsconfig.json')) {
	fail('extension compilation is not registered in build/gulpfile.extensions.ts');
}

const extensionManifest = readJson(resolve(sourceRoot, 'extensions/agent-workspace/package.json'));
assertEqual(extensionManifest.name, 'agent-workspace', 'extension name');
assertEqual(extensionManifest.contributes.viewsContainers.activitybar[0].id, 'agent-workspace', 'activity bar container');
assertEqual(extensionManifest.contributes.views['agent-workspace'][0].id, 'agentWorkspace.timeline', 'timeline view');

const patch = readFileSync(patchPath, 'utf8');
if (!patch.includes('Subject: [PATCH] feat: add agent workspace hard fork foundation')) {
	fail('tracked patch does not match the expected source commit subject');
}

console.log(JSON.stringify({
	status: 'ready',
	sourceBranch: branch,
	sourceCommit: head,
	productName: product.nameLong,
	patch: patchPath
}, null, 2));
