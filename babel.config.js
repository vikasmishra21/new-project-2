module.exports = (api) => {
	api.cache(true);
	return {
		plugins: [
			["@babel/plugin-proposal-decorators", {"legacy": true}],
			"@babel/plugin-proposal-class-properties",
			"@babel/plugin-proposal-object-rest-spread",
			"@babel/plugin-proposal-optional-chaining"

		],
		presets: [['@babel/preset-env', {"targets": {}}]]
	}
}

