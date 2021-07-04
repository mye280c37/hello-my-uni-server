module.exports = {
	apps: [{
		name: 'MyUni',
		script: 'dist/index.js',
		instances: 0,
		exec_mode: 'cluster',
		wait_ready: true,
		listen_timeout: 50000
	 }],
}
