import {classes} from './index.js';
import {configs} from '../../configs/index.js';
const {Memory, Sql, MongoDb, Firebase} = classes;
const {mySqlOptions, sqliteOptions, mongoDbConfigs} = configs;

export default function DbConnection(id) {
	this.instance =
		id == 1
			? new Sql(mySqlOptions)
			: id == 2
			? new Sql(sqliteOptions)
			: id == 3
			? new MongoDb(mongoDbConfigs.localUrl, mongoDbConfigs.options)
			: id == 4
			? new Firebase()
			: new Memory()
}
