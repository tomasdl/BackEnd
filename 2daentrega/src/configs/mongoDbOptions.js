const localUrl = process.env.MONGO_LOCAL_URL;
const atlasUrl = process.env.MONGO_ATLAS_URL;
const config = {
	localUrl,
	atlasUrl,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
};

export default config;
